<template>
    <div class="card">
        <h5
            class="card-header text-light"
            style="background-color: slateblue"
        >
            Tu Resumen Astral
        </h5>
        <div class="card-body" v-if="cartaAstral">
            <div class="row">
                <PerfilAspectos :aspectos="aspectos" />
            </div>
            <div class="row mt-3">
                <PerfilDesignacionAstral
                    :planetas="cartaAstral.planets"
                    :casas="cartaAstral.housecusps"
                    :imagenRuedaCarta="cartaAstral.wheel"
                />
            </div>
        </div>
        <div class="card-body" v-else>
            <div class="row">
                <h5 class="text-center">
                    Tu carta astral aun no ha sido calculada, si quieres
                    calcularla presiona
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="calcularCartaAstral"
                    >
                        Aquí
                    </button>
                </h5>
            </div>
        </div>
    </div>
</template>

<script>
import { supabase } from "../includes/supabase";
import { mapState } from "vuex";
import PerfilDesignacionAstral from "./PerfilDesignacionAstral.vue";
import PerfilAspectos from "./PerfilAspectos.vue";

export default {
    computed: {
        ...mapState(["usuario"]),
    },
    components: {
        PerfilDesignacionAstral,
        PerfilAspectos,
    },
    data() {
        return {
            cartaAstral: null,
            aspectos: null,
        };
    },
    async mounted() {
        try {
            const { data: perfil_astral, error } = await supabase
                .from("perfil_astral")
                .select("carta_astral, aspectos")
                .eq("id_usuario", supabase.auth.user().id)
                .single();
            if (perfil_astral) {
                this.cartaAstral = perfil_astral.carta_astral;
                this.aspectos = perfil_astral.aspectos;
            }

            if (error) throw error;
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        test() {
            console.log(this.aspectos);
        },
        async calcularCartaAstral() {
            const opcionesRequest = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: process.env.VUE_APP_ASTROAPI_KEY,
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    name: this.usuario.nombre,
                    date: this.usuario.fecha_nac,
                    time: this.usuario.hora_nac.slice(0, -3),
                    place_id: this.usuario.id_lugar_nac,
                    lang: "en",
                    system: "p",
                }),
            };

            try {
                const datos = await fetch(
                    process.env.VUE_APP_ASTROAPI_URL,
                    opcionesRequest
                ).then((response) => response.json());

                let aspectos = [];

                for (const a of datos.aspects) {
                    if (a.aspect != 7) {
                        let { data: guia_aspecto, error } = await supabase
                            .from("guia_aspecto")
                            .select("descripcion")
                            .eq("id_planeta1", a.planet1)
                            .eq("id_aspecto", a.aspect)
                            .eq("id_planeta2", a.planet2);

                        if (guia_aspecto[0]) {
                            aspectos.push({
                                titulo: `${a.planet1Name} ${a.aspectName} ${a.planet2Name}`,
                                descripcion: guia_aspecto[0].descripcion,
                            });
                        }

                        if (error) {
                            console.log(error);
                        }
                    }
                }

                const { data, error } = await supabase
                    .from("perfil_astral")
                    .insert([
                        {
                            carta_astral: datos,
                            id_usuario: this.usuario.id,
                            aspectos: aspectos,
                        },
                    ]);

                if (error) throw error;

                this.cartaAstral = data;

                this.$router.go();
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style>
</style>
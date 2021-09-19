<template>
    <div class="card">
        <h5 class="card-header text-light" style="background-color: slateblue">
            Tu Resumen Astral
        </h5>
        <div class="card-body" v-if="cartaAstral">
            <div class="row">
                <PerfilAspectos :aspectos="cartaAstral.aspects" />
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
        };
    },
    async mounted() {
        const carta = await supabase
            .from("perfil_astral")
            .select("carta_astral")
            .eq("id_usuario", supabase.auth.user().id)
            .single();
        if (carta.data) {
            this.cartaAstral = carta.data.carta_astral;
        }
    },
    methods: {
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

                const { data, error } = await supabase
                    .from("perfil_astral")
                    .insert([
                        {
                            carta_astral: datos,
                            id_usuario: this.usuario.id,
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
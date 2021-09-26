<template>
    <div class="card">
        <h5 class="card-header text-light" style="background-color: slateblue">
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
                        @click="calcularCarta"
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
import { mapState, mapActions } from "vuex";
import PerfilDesignacionAstral from "./PerfilDesignacionAstral.vue";
import PerfilAspectos from "./PerfilAspectos.vue";

export default {
    computed: {
        ...mapState("usuarioStore", ["usuario"]),
        ...mapState("cartaAstralStore", ["cartaAstral", "aspectos"]),
    },
    components: {
        PerfilDesignacionAstral,
        PerfilAspectos,
    },
    async mounted() {
        this.obtenerCartaAspectos(supabase.auth.user().id);
    },
    methods: {
        ...mapActions("cartaAstralStore", [
            "obtenerCartaAspectos",
            "calcularCartaAstral",
        ]),
        async calcularCarta() {
            this.calcularCartaAstral(this.usuario);
        },
    },
};
</script>

<style>
</style>
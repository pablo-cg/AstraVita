<template>
    <div class="card">
        <h5 class="card-header text-light" style="background-color: slateblue">
            Tu Resumen Astral
        </h5>
        <div class="card-body" v-if="cartaAstral">
            <div class="row">
                <PerfilDesignacionAstral
                    :planetas="cartaAstral.planets"
                    :casas="cartaAstral.housecusps"
                    :imagenRuedaCarta="cartaAstral.wheel"
                />
            </div>
            <div class="row mt-3">
                <PerfilAspectos :aspectos="aspectos" />
            </div>
        </div>
        <div class="card-body" v-else>
            <div class="row">
                <h5 class="text-center">
                    Tu carta astral aun no ha sido calculada, si quieres
                    calcularla presiona
                    <button
                        type="button"
                        class="btn astra-btn-primario"
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
    },
    methods: {
        ...mapActions("cartaAstralStore", [
            "obtenerCartaAspectos",
            "calcularCartaAstral",
            "obtenerGruposUsuario"
        ]),
        async calcularCarta() {
            this.calcularCartaAstral(this.usuario);
        },
    },
};
</script>

<style scoped>
.astra-btn-primario {
    background-color: slateblue;
    border-color: slateblue;
    color: whitesmoke;
}

.astra-btn-primario:hover {
    background-color: whitesmoke;
    border-color: slateblue;
    color: black;
}
</style>
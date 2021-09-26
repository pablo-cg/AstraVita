<template>
    <!-- CONTENEDOR PRINCIPAL CON LA IMAGEN DE FONDO -->
    <section :style="imagenFondo">
        <!-- BARRA DE NAVEGACION -->
        <barra-de-navegacion />

        <!-- CONTENIDO DE LA PAGINA -->
        <section class="container mt-3 mb-3">
            <router-view />
        </section>

        <!-- FOOTER -->
        <pie-de-pagina />
    </section>
</template>

<script>
import BarraDeNavegacion from "./components/BarraDeNavegacion.vue";
import PieDePagina from "./components/PieDePagina.vue";
import { mapActions } from "vuex";

export default {
    components: { PieDePagina, BarraDeNavegacion },
    computed: {
        imagenFondo() {
            return {
                backgroundImage: `url(${require("@/assets/img/universo.jpg")})`,
            };
        },
    },
    methods: {
        ...mapActions("usuarioStore", ["usuarioEstaConectado"]),
    },
    async created() {
        await this.usuarioEstaConectado;
    },
};
</script>

<style scoped>
</style>
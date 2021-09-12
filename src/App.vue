<template>
    <!-- CONTENEDOR PRINCIPAL CON LA IMAGEN DE FONDO -->
    <section :style="imagenFondo">
        <!-- BARRA DE NAVEGACION -->
        <barra-de-navegacion :tiene-sesion-iniciada="tieneSesionIniciada"/>

        <!-- CONTENIDO DE LA PAGINA -->
        <section class="container mt-3">
            <router-view />
        </section>

        <!-- FOOTER -->
        <pie-de-pagina />
    </section>
</template>

<script>
import BarraDeNavegacion from "./components/BarraDeNavegacion.vue";
import PieDePagina from "./components/PieDePagina.vue";
// import { mapState } from "vuex";


export default {
    components: { PieDePagina, BarraDeNavegacion },
    data() {
        return {
            // tieneSesionIniciada: false,
        };
    },
    computed: {
        imagenFondo() {
            return {
                backgroundImage: `url(${require("@/assets/img/universo.jpg")})`,
            };
        },
        // ...mapState(["tieneSesionIniciada"]),
    },
};
</script>

<style scoped>
</style>
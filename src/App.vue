<template>
    <!-- CONTENEDOR PRINCIPAL CON LA IMAGEN DE FONDO -->
    <section :style="imagenFondo">
        <!-- BARRA DE NAVEGACION -->
        <BarraDeNavegacion v-if="!esAdmin"/>
        <BarraDeNavegacionAdmin v-else/>

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
import BarraDeNavegacionAdmin from "./components/BarraDeNavegacionAdmin.vue";
import PieDePagina from "./components/PieDePagina.vue";
import { mapActions, mapState } from "vuex";

export default {
    components: { PieDePagina, BarraDeNavegacion,BarraDeNavegacionAdmin },
    computed: {
        imagenFondo() {
            return {
                backgroundImage: `url(${require("@/assets/img/universo.jpg")})`,
            };
        },
        ...mapState("usuarioStore", ["esAdmin"])
    },
    methods: {
        ...mapActions("usuarioStore", ["usuarioEstaConectado"]),
    },
    async created() {
        await this.usuarioEstaConectado();
    },
};
</script>

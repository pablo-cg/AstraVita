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
import { supabase } from "@/includes/supabase";

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

        mostrarToast() {
            this.$toast.open({
                message: "Tienes solicitudes de amistad pendientes",
                type: "info",
            });
        },

        async subListaAmigos() {
            try {
                const suscripcion = await supabase
                    .from(
                        `lista_amigo:id_usuario2=eq.${supabase.auth.user().id}`
                    )
                    .on("INSERT", () => {
                        this.mostrarToast();
                    })
                    .subscribe();
                console.log("suscrito");
            } catch (error) {
                console.log(error);
            }
        },
    },
    async created() {
        await this.usuarioEstaConectado();

        await this.subListaAmigos();
    },
};
</script>

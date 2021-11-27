<template>
    <nav class="navbar navbar-expand-lg navbar-dark astracolor">
        <div class="container-fluid" v-if="usuario">
            <router-link class="navbar-brand" :to="{ name: 'Inicio' }">
                <img
                    src="@/assets/img/astraLogoSlate.png"
                    alt="astravitaLogo"
                    height="32"
                    width="150"
            /></router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            aria-current="page"
                            :to="{ name: 'PerfilUsuario' }"
                            >{{ usuario.nombre }}</router-link
                        >
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'Grupos' }"
                            >Grupos</router-link
                        >
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :to="{ name: 'MisAmigos' }"
                            >Amigos</router-link
                        >
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :to="{ name: 'Mensajes' }"
                            >Mensajes</router-link
                        >
                    </li>
                </ul>
                <div class="d-flex mb-2 mb-lg-0">
                    <div class="input-group me-2">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Buscar"
                            aria-label="Buscar Usuario"
                            aria-describedby="button-addon"
                        />
                        <button
                            class="btn btn-outline-light"
                            type="button"
                            id="button-addon"
                        >
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <button
                    class="btn btn-outline-light"
                    type="button"
                    @click="logout"
                >
                    <i class="fas fa-power-off"></i>
                </button>
            </div>
        </div>
        <div class="container-fluid" v-else>
            <router-link class="navbar-brand" :to="{ name: 'Home' }">
                <img
                    src="@/assets/img/astraLogoSlate.png"
                    alt="astravitaLogo"
                    height="32"
                    width="150"
            /></router-link>
            <router-link
                :to="{ name: 'InicioSesion' }"
                class="btn btn-outline-light"
                v-if="$route.name != 'Admin'"
                >Iniciar Sesión</router-link
            >
        </div>
    </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";
import suscripciones from "@/includes/suscripciones.js";
import { supabase } from "../includes/supabase";

export default {
    computed: {
        ...mapState("usuarioStore", ["usuario"]),
    },
    methods: {
        ...mapActions("usuarioStore", ["cerrarSesion"]),
        async logout() {
            try {
                const suscripcion = suscripciones.getSuscripcion();
                supabase.removeSubscription(suscripcion);
                await this.cerrarSesion();
                this.$router.push({ name: "InicioSesion" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped>
.astracolor {
    background-color: slateblue;
}
</style>
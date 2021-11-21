<template>
    <nav class="navbar navbar-expand-lg navbar-dark astracolor">
        <div class="container-fluid" v-if="usuario">
            <router-link class="navbar-brand" :to="{ name: 'Soporte' }">
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
                        <span class="nav-link">{{ usuario.nombre }}</span>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'Soporte' }"
                            >Soporte</router-link
                        >
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Usuarios
                        </a>
                        <ul
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                        >
                            <li>
                                <router-link
                                    class="dropdown-item"
                                    :to="{ name: 'ListaUsuarios' }"
                                    ><i class="fas fa-list-ol"></i> Lista de
                                    usuarios</router-link
                                >
                            </li>
                            <li>
                                <router-link
                                    class="dropdown-item"
                                    :to="{ name: 'NuevoUsuario' }"
                                    ><i class="fas fa-user-plus"></i> Crear
                                    Nuevo usuario</router-link
                                >
                            </li>
                        </ul>
                    </li>
                </ul>
                <button
                    class="btn btn-outline-light"
                    type="button"
                    @click="logout"
                >
                    <i class="fas fa-power-off"></i>
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState("usuarioStore", ["usuario"]),
    },
    methods: {
        ...mapActions("usuarioStore", ["cerrarSesionAdmin"]),
        async logout() {
            try {
                await this.cerrarSesionAdmin();
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
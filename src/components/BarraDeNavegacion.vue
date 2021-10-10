<template>
    <header>
        <nav
            class="navbar navbar-expand-lg navbar-dark sticky-top"
            style="background-color: slateblue"
        >
            <div class="container-fluid">
                <router-link
                    class="navbar-brand"
                    :to="{ name: 'Inicio' }"
                    v-if="usuario"
                >
                    <img
                        src="@/assets/img/astraLogoSlate.png"
                        alt=""
                        width="150"
                    />
                </router-link>
                <router-link class="navbar-brand" :to="{ name: 'Home' }" v-else>
                    <img
                        src="@/assets/img/astraLogoSlate.png"
                        alt=""
                        width="150"
                    />
                </router-link>
                <section v-if="usuario">
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <router-link
                                    class="nav-link"
                                    aria-current="page"
                                    :to="{ name: 'PerfilUsuario'}"
                                    >{{ usuario.nombre }}</router-link
                                >
                            </li>
                            <li class="nav-item">
                                <router-link
                                    class="nav-link"
                                    :to="{ name: 'Grupos' }"
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
                                    :to="{ name: 'Novedades' }"
                                    >Novedades</router-link
                                >
                            </li>
                            <li class="nav-item">
                                <router-link
                                    class="nav-link"
                                    :to="{ name: 'Contacto' }"
                                    >Contacto</router-link
                                >
                            </li>
                        </ul>
                        <form class="d-flex">
                            <input
                                class="form-control me-2"
                                type="search"
                                placeholder=""
                                aria-label="Search"
                                id="texto"
                                name="texto"
                            />
                            <button
                                class="btn btn-outline-light text-nowrap"
                                type="submit"
                            >
                                <i class="fas fa-search"></i> Buscar
                            </button>
                            |
                            <a
                                class="btn btn-outline-light text-light"
                                type="button"
                                @click="logout"
                                ><i class="fas fa-power-off"></i
                            ></a>
                        </form>
                    </div>
                </section>
                <div class="d-flex" v-else>
                    <router-link
                        :to="{ name: 'InicioSesion' }"
                        class="btn btn-outline-light"
                        >Iniciar Sesión</router-link
                    >
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState("usuarioStore", ["usuario"]),
    },
    methods: {
        ...mapActions("usuarioStore", ["cerrarSesion"]),
        async logout() {
            try {
                await this.cerrarSesion();
            } catch (error) {
                console.log(error);
            }
            this.$router.push("login");
        },
    },
};
</script>

<style>
</style>
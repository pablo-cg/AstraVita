<template>
    <header>
        <nav
            class="navbar navbar-expand-lg navbar-dark sticky-top"
            style="background-color: slateblue"
        >
            <div class="container-fluid">
                <router-link
                    class="navbar-brand"
                    to="/inicio"
                    v-if="tieneSesionIniciada"
                >
                    <img
                        src="@/assets/img/astraLogoSlate.png"
                        alt=""
                        width="150"
                    />
                </router-link>
                <router-link class="navbar-brand" to="/" v-else>
                    <img
                        src="@/assets/img/astraLogoSlate.png"
                        alt=""
                        width="150"
                    />
                </router-link>
                <section v-if="tieneSesionIniciada">
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
                                <a
                                    class="nav-link"
                                    aria-current="page"
                                    href="inicio.html"
                                    >Inicio</a
                                >
                            </li>
                            <li class="nav-item">
                                <a
                                    class="nav-link active"
                                    aria-current="page"
                                    href="miCuenta.html"
                                    >Mi Cuenta</a
                                >
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="grupos.html"
                                    >Grupos</a
                                >
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="amigos.html"
                                    >Amigos</a
                                >
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="novedades.html"
                                    >Novedades</a
                                >
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="contacto.html"
                                    >Contacto</a
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
                                type="submit"
                                ><i class="fas fa-power-off"></i
                            ></a>
                        </form>
                    </div>
                </section>
                <div class="d-flex" v-else>
                    <router-link to="/login" class="btn btn-outline-light"
                        >Iniciar Sesión</router-link
                    >
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {};
</script>

<style>
</style>
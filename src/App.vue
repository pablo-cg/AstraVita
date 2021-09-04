<template>
    <!-- BARRA DE NAVEGACION -->
    <div id="nav">
        <nav
            class="navbar navbar-expand-lg navbar-dark sticky-top"
            style="background-color: slateblue"
        >
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img
                        src="@/assets/img/astraLogoSlate.png"
                        alt=""
                        width="150"
                    />
                </a>
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
                        <!-- <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="inicio.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="miCuenta.html">Mi Cuenta</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="grupos.html">Grupos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="amigos.html">Amigos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="novedades.html">Novedades</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="contacto.html">Contacto</a>
                </li> -->
                    </ul>
                    <div class="d-flex">
                        <!-- <input class="form-control me-2" type="search" placeholder="" aria-label="Search" id="texto" name="texto">
                    <button class="btn btn-outline-light text-nowrap" type="submit"><i class="fas fa-search"></i> Buscar</button> |
                <a class="btn btn-outline-light text-light" type="submit"><i class="fas fa-power-off"></i></a> -->
                    </div>
                </div>
            </div>
        </nav>
    </div>

    <!-- CONTENIDO DE LA PAGINA -->
    <div :style="imagenFondo">
        <router-view class="container" />
    </div>

    <!-- FOOTER -->
    <footer class="footer mt-auto py-3 text-light" style="background-color: rgb(53, 45, 102);">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h5>AstraVita</h5>
                    <span class="text-light">
                        <ul class="list-group list-group-flush">
                            <li>
                                <i class="fas fa-map-marked-alt"></i> <a class="text-light" href="https://goo.gl/maps/1exkBhNeogh4EjnW7">Calle Falsa #123</a>
                            </li>
                            <li>
                                <i class="fas fa-phone"></i> <a class="text-light" href="tel:+56978940490">+569 7894 0490</a>
                            </li>
                            <li>
                                <i class="fas fa-at"></i> <a href="mailto:soporte@astravita.cl"
                                    class="text-light">soporte@astravita.cl</a>
                            </li>
                            <li>
                                <i class="fas fa-heart"></i> <a class="text-light"
                                    href="suscripcion.html">Suscríbete</a>
                            </li>
                        </ul>
                    </span>
                </div>
                <div class="col">
                    <h5>Nosotros</h5>
                    <span class="text-light">
                        <ul class="list-group list-group-flush">
                            <li>
                                <i class="fab fa-instagram"></i> <a class="text-light"
                                    href="https://www.instagram.com/sebastian.vergara.nunez/?hl=es-la">Sebastián
                                    Vergara</a>
                            </li>
                            <li>
                                <i class="fab fa-instagram"></i> <a class="text-light"
                                    href="https://www.instagram.com/rusioflores/?hl=es-la">Matías Flores</a>

                            </li>
                            <li>
                                <i class="fab fa-instagram"></i> <a class="text-light"
                                    href="https://www.instagram.com/pablocg.uwu/?hl=es-la">Pablo Cuevas</a>
                            </li>
                        </ul>
                    </span>
                </div>
                <div class="col text-center">
                    <span class="text-muted text-center">Proyecto AstraVita&copy;</span>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { computed } from "vue";

export default {
    setup() {
        const imagenFondo = computed(() => {
            return {
                backgroundImage: `url(${require("@/assets/img/universo.jpg")})`,
            };
        });

        return { imagenFondo };
    },
};
</script>

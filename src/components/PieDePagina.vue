<template>
    <footer
        class="footer mt-auto py-3 text-light"
        style="background-color: rgb(53, 45, 102)"
    >
        <div class="container">
            <div class="row">
                <div class="col">
                    <h5>AstraVita</h5>
                    <span class="text-light">
                        <ul class="list-group list-group-flush">
                            <li>
                                <i class="fas fa-map-marked-alt"></i>&nbsp;
                                <a
                                    class="text-light"
                                    href="https://goo.gl/maps/1exkBhNeogh4EjnW7"
                                    >Calle Falsa #123</a
                                >
                            </li>
                            <li>
                                <i class="fas fa-phone"></i>&nbsp;
                                <a class="text-light" href="tel:+56978940490"
                                    >+569 7894 0490</a
                                >
                            </li>
                            <li>
                                <i class="fas fa-at"></i>&nbsp;
                                <a
                                    href="mailto:soporte@astravita.cl"
                                    class="text-light"
                                    >soporte@astravita.cl</a
                                >
                            </li>
                            <li v-if="usuario">
                                <i class="fas fa-heart"></i>&nbsp;
                                <router-link
                                    :to="{ name: 'Suscripcion' }"
                                    class="text-light"
                                    >Suscribete</router-link
                                >
                            </li>
                        </ul>
                    </span>
                </div>
                <div class="col">
                    <h5>Nosotros</h5>
                    <span class="text-light">
                        <ul class="list-group list-group-flush">
                            <li>
                                <i class="fab fa-instagram"></i>&nbsp;
                                <a
                                    class="text-light"
                                    href="https://www.instagram.com/sebastian.vergara.nunez/?hl=es-la"
                                    >Sebastián Vergara</a
                                >
                            </li>
                            <li>
                                <i class="fab fa-instagram"></i>&nbsp;
                                <a
                                    class="text-light"
                                    href="https://www.instagram.com/rusioflores/?hl=es-la"
                                    >Matías Flores</a
                                >
                            </li>
                            <li>
                                <i class="fab fa-instagram"></i>&nbsp;
                                <a
                                    class="text-light"
                                    href="https://www.instagram.com/pablocg.uwu/?hl=es-la"
                                    >Pablo Cuevas</a
                                >
                            </li>
                        </ul>
                    </span>
                </div>
                <div class="col text-center">
                    <span class="text-muted text-center" v-if="usuario">
                        Proyecto AstraVita &copy;
                    </span>
                    <span class="text-center" v-else>
                        <router-link
                            :to="{ name: 'AdminIniciarSesion' }"
                            class="text-decoration-none text-light text-muted "
                            >Proyecto AstraVita &copy;
                        </router-link>
                    </span>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState("usuarioStore", ["usuario"]),
    },
};
</script>
<template>
    <div>
        <header class="text-light">
            <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 class="display-4 fw-normal">Suscripción</h1>
                <p class="fs-5">Suscribete a AstraVita y obtén beneficios</p>
            </div>
        </header>

        <main>
            <div class="row row-cols-1 row-cols-md-2 mb-3 text-center">
                <div class="col">
                    <div
                        class="card mb-4 rounded-3 shadow-sm"
                        style="border-color: slateblue"
                    >
                        <div class="card-header py-3">
                            <h4 class="my-0 fw-normal">Gratis</h4>
                        </div>
                        <div class="card-body">
                            <h1 class="card-title pricing-card-title">
                                $0<small class="text-muted fw-light"
                                    >/mes</small
                                >
                            </h1>
                            <ul class="list-unstyled mt-3 mb-4">
                                <li>
                                    Acceso a 4 grupos de usuarios asignados a
                                    los planetas más relevantes de tu carta
                                    astral
                                </li>
                                <li>
                                    Posibilidad de crear publicaciones y
                                    comentar
                                </li>
                                <li>Cálculo de la carta astral</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div
                        class="card mb-4 rounded-3 shadow-sm"
                        style="border-color: slateblue"
                    >
                        <div
                            class="card-header py-3 text-white"
                            style="
                                background-color: slateblue;
                                border-color: slateblue;
                            "
                        >
                            <h4 class="my-0 fw-normal">Mejorado</h4>
                        </div>
                        <div class="card-body">
                            <h1 class="card-title pricing-card-title">
                                $2.990<small class="text-muted fw-light"
                                    >/mes</small
                                >
                            </h1>
                            <ul class="list-unstyled mt-3 mb-4">
                                <li>
                                    Acceso a la totalidad de los grupos de
                                    usuarios (10 grupos)
                                </li>
                                <li>
                                    Posibilidad de crear publicaciones y
                                    comentar
                                </li>
                                <li>Cálculo de la carta astral</li>
                                <li>
                                    Acceso a grupos de orientación vocacional
                                    (publicar y comentar)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <h2 class="display-6 text-center mb-4 text-light">
                Compara los planes disponibles
            </h2>

            <div class="table-responsive">
                <table class="table text-center text-light">
                    <thead>
                        <tr>
                            <th style="width: 34%"></th>
                            <th style="width: 22%">Gratis</th>
                            <th style="width: 22%">Mejorado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" class="text-start">
                                Publicar y Comentar
                            </th>
                            <td>Si</td>
                            <td>Si</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-start">
                                Acceso a grupos
                            </th>
                            <td>4 de 10 grupos</td>
                            <td>Todos los grupos</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-start">
                                Calcular carta astral
                            </th>
                            <td>Si</td>
                            <td>Si</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-start">
                                Acceso a grupos de orientación vocacional
                            </th>
                            <td>No</td>
                            <td>Publicar y comentar</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-grid">
                <button
                    type="button"
                    class="btn btn-block astra-btn-primario disabled"
                    v-if="redirigiendo"
                >
                    <h2>
                        <span
                            class="spinner-border"
                            role="status"
                            aria-hidden="true"
                        ></span>
                        ...Redirigiendo
                    </h2>
                </button>
                <button
                    type="button"
                    class="btn btn-block astra-btn-primario"
                    @click="suscribirse"
                    v-else
                >
                    <h2>Suscríbete Ahora</h2>
                </button>
            </div>
        </main>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

const APIURL = `${process.env.VUE_APP_REVENIU_URL}subscriptions/`;
const APIKEY = process.env.VUE_APP_REVENIU_KEY;
const BEURL = process.env.VUE_APP_BACKENDAPI_URL;

export default {
    data() {
        return {
            redirigiendo: false,
        };
    },
    computed: {
        ...mapState("usuarioStore", ["usuario"]),
    },
    methods: {
        async suscribirse() {
            this.redirigiendo = true;
            let respuestaReveniu = null;

            await axios
                .post(BEURL, {
                    nombre: this.normalizar(this.usuario.nombre),
                    correo: this.usuario.correo,
                    url: APIURL,
                    key: APIKEY,
                })
                .then((response) => {
                    respuestaReveniu = response.data;
                });

            var form = document.createElement("form");
            form.method = "POST";
            form.action = respuestaReveniu.completion_url;
            form.target = "_self";
            var input = document.createElement("input");
            input.id = "TBK_TOKEN";
            input.name = "TBK_TOKEN";
            input.type = "hidden";
            input.value = respuestaReveniu.security_token;
            form.appendChild(input);
            document.body.appendChild(form);
            form.submit();
        },

        normalizar(texto) {
            return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        },
    },

    //TODO: FORMULARIO PARA REDIRIGIR AL PAGO
};
</script>

<style scoped>
.astra-btn-primario {
    background-color: slateblue;
    border-color: slateblue;
    color: whitesmoke;
}

.astra-btn-primario:hover {
    background-color: whitesmoke;
    border-color: slateblue;
    color: black;
}

.astra-btn-secundario {
    background-color: whitesmoke;
    border-color: slateblue;
    color: black;
}
.astra-btn-secundario:hover {
    background-color: slateblue;
    border-color: slateblue;
    color: whitesmoke;
}
</style>
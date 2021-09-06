<template>
    <div class="text-light">
        <form class="" @submit.prevent="RegistrarUsuario">
            <h1 class="display-6 fw-bold text-light text-center">Registro</h1>
            <div class="mb-3">
                <label for="nombre">Nombre</label>
                <input
                    type="text"
                    class="form-control rounded-pill"
                    id="nombre"
                    v-model="nombre"
                />
                <p
                    v-if="mensajeErrorNombre"
                    class="form-text text-center text-danger"
                >
                    {{ mensajeErrorNombre }}
                </p>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label"
                    >Dirección de Correo Electrónico</label
                >
                <input
                    type="email"
                    class="form-control rounded-pill"
                    id="email"
                    v-model="correoElectronico"
                />
                <p
                    v-if="mensajeErrorCorreo"
                    class="form-text text-center text-danger"
                >
                    {{ mensajeErrorCorreo }}
                </p>
            </div>
            <div class="mb-3">
                <label for="region" class="form-label">¿En qué región naciste?</label>
                <select
                    class="form-select rounded-pill"
                    aria-label="region"
                    id="region"
                    v-model="regionSeleccionada"
                >
                    <option
                        v-for="region in localidades"
                        :key="region.nombre"
                        :value="region"
                    >
                        {{ region.nombre }}
                    </option>
                </select>
                <p
                    v-if="mensajeErrorRegion"
                    class="form-text text-danger text-center"
                >
                    {{ mensajeErrorRegion }}
                </p>
            </div>
            <div class="mb-3" v-if="regionSeleccionada">
                <label for="comuna" class="form-label"
                    >¿En qué comuna?</label
                >
                <select
                    class="form-select rounded-pill"
                    aria-label="comuna"
                    id="comuna"
                    v-model="comunaSeleccionada"
                >
                    <option
                        v-for="comuna in regionSeleccionada.comunas"
                        :key="comuna.nombre"
                        :value="comuna"
                    >
                        {{ comuna.nombre }}
                    </option>
                </select>
                <p
                    v-if="mensajeErrorComuna"
                    class="form-text text-danger text-center"
                >
                    {{ mensajeErrorComuna }}
                </p>
            </div>
            <div class="mb-3">
                <label for="fHNacimiento" class="form-label"
                    >Fecha y hora de Nacimiento</label
                >
                <input
                    type="datetime-local"
                    id="fHNacimiento"
                    class="form-control rounded-pill"
                    v-model="fechaHoraNac"
                />
                <p
                    v-if="mensajeErrorFechaHoraNac"
                    class="form-text text-danger text-center"
                >
                    {{ mensajeErrorFechaHoraNac }}
                </p>
            </div>
            <div class="mb-3">
                <label for="contrasena" class="form-label">Contraseña</label>
                <input
                    type="password"
                    class="form-control rounded-pill"
                    id="contrasena"
                    v-model="contrasena"
                />
                <p
                    v-if="mensajeErrorContrasena"
                    class="form-text text-danger text-center"
                >
                    {{ mensajeErrorContrasena }}
                </p>
            </div>
            <div class="mb-3">
                <label for="repetirContrasena" class="form-label"
                    >Repite tu Contraseña</label
                >
                <input
                    type="password"
                    class="form-control rounded-pill"
                    id="repetirContrasena"
                    v-model="repetirContrasena"
                />
                <p
                    v-if="!coincideContrasena"
                    class="form-text text-danger text-center"
                >
                    Las contraseñas no coinciden
                </p>
            </div>
            <div class="row mb-3">
                <button
                    type="submit"
                    class="btn d-block text-light rounded-pill"
                    style="background-color: slateblue"
                >
                    Registrarse
                </button>
                <p class="form-text text-center text-light">
                    Todos tus datos están seguros con nosotros.
                </p>
            </div>
        </form>
    </div>
</template>

<script>
import Localidades from '../assets/localidades/regionesComunas.min.json'
export default {
    data() {
        return {
            nombre: null,
            correoElectronico: null,
            contrasena: null,
            repetirContrasena: null,
            regionSeleccionada: "",
            comunaSeleccionada: "",
            fechaHoraNac: null,
            mensajeErrorCorreo: "",
            mensajeErrorNombre: "",
            mensajeErrorContrasena: "",
            mensajeErrorRegion: "",
            mensajeErrorComuna: "",
            mensajeErrorFechaHoraNac: "",
            localidades: Localidades
        };
    },
    computed: {
        correoValido() {
            const regEx =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regEx.test(this.correoElectronico) ? true : false;
        },
        coincideContrasena() {
            if (this.contrasena !== this.repetirContrasena) {
                return false;
            } else {
                return true;
            }
        },
    },
    methods: {
        ValidarDatos() {
            if (
                this.nombre &&
                this.correoElectronico &&
                this.contrasena &&
                this.coincideContrasena &&
                this.regionSeleccionada &&
                this.comunaSeleccionada &&
                this.fechaHoraNac
            ) {
                this.mensajeErrorCorreo = "";
                this.mensajeErrorNombre = "";
                this.mensajeErrorContrasena = "";
                this.mensajeErrorRegion = "";
                this.mensajeErrorComuna = "";
                this.mensajeErrorFechaHoraNac = "";
                return true;
            }

            if (!this.nombre || this.nombre.trim() === "") {
                this.mensajeErrorNombre = "Debes ingresar un nombre";
            }

            if (!this.correoValido) {
                this.mensajeErrorCorreo = "Debes ingresar un correo válido";
            }

            if (!this.contrasena || this.contrasena.trim() === "") {
                this.mensajeErrorContrasena = "Debes ingresar una contraseña";
            }

            if (!this.regionSeleccionada) {
                this.mensajeErrorRegion = "Debes ingresar tu región de nacimiento";
            }

            if (!this.comunaSeleccionada) {
                this.mensajeErrorComuna =
                    "Debes ingresar tu comuna de nacimiento";
            }

            if (!this.fechaHoraNac) {
                this.mensajeErrorFechaHoraNac =
                    "Debes ingresar tu fecha y hora de nacimiento";
            }
        },
        RegistrarUsuario() {
            if (this.ValidarDatos()) {
                console.log("completo");
            } else {
                console.log("incompleto");
                console.log(this.comunaSeleccionada.longitud);
            }
        },
    },
};
</script>

<style>
</style>
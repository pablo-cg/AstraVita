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
                <label for="pais" class="form-label">País de Nacimiento</label>
                <select
                    class="form-select rounded-pill"
                    aria-label="pais"
                    id="pais"
                    v-model="paisSeleccionado"
                >
                    <option
                        v-for="pais in paises"
                        :key="pais.nombre"
                        :value="pais"
                    >
                        {{ pais.nombre }}
                    </option>
                </select>
                <p
                    v-if="mensajeErrorPais"
                    class="form-text text-danger text-center"
                >
                    {{ mensajeErrorPais }}
                </p>
            </div>
            <div class="mb-3" v-if="paisSeleccionado">
                <label for="ciudad" class="form-label"
                    >Ciudad de Nacimiento</label
                >
                <select
                    class="form-select rounded-pill"
                    aria-label="ciudad"
                    id="ciudad"
                    v-model="ciudadSeleccionada"
                >
                    <option
                        v-for="ciudad in paisSeleccionado.ciudades"
                        :key="ciudad"
                        :value="ciudad"
                    >
                        {{ ciudad }}
                    </option>
                </select>
                <p
                    v-if="mensajeErrorCiudad"
                    class="form-text text-danger text-center"
                >
                    {{ mensajeErrorCiudad }}
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
export default {
    data() {
        return {
            nombre: null,
            correoElectronico: null,
            contrasena: null,
            repetirContrasena: null,
            paisSeleccionado: "",
            ciudadSeleccionada: "",
            fechaHoraNac: null,
            mensajeErrorCorreo: "",
            mensajeErrorNombre: "",
            mensajeErrorContrasena: "",
            mensajeErrorPais: "",
            mensajeErrorCiudad: "",
            mensajeErrorFechaHoraNac: "",
            paises: [
                {
                    nombre: "Chile",
                    ciudades: ["Stgo", "Valpo", "Conce"],
                },
                {
                    nombre: "Argentina",
                    ciudades: ["Mendoza", "BSAS", "Cordoba"],
                },
            ],
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
                this.paisSeleccionado &&
                this.ciudadSeleccionada &&
                this.fechaHoraNac
            ) {
                this.mensajeErrorCorreo = "";
                this.mensajeErrorNombre = "";
                this.mensajeErrorContrasena = "";
                this.mensajeErrorPais = "";
                this.mensajeErrorCiudad = "";
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

            if (!this.paisSeleccionado) {
                this.mensajeErrorPais = "Debes ingresar tu país de nacimiento";
            }

            if (!this.ciudadSeleccionada) {
                this.mensajeErrorCiudad =
                    "Debes ingresar tu ciudad de nacimiento";
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
            }
        },
    },
};
</script>

<style>
</style>
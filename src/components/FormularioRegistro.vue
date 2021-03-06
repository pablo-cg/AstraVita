<template>
    <div class="text-light">
        <h1 class="display-6 fw-bold text-light text-center">Registro</h1>
        <div v-if="registroMostrarAlerta">
            <div
                class="
                    alert
                    d-flex
                    justify-content-center
                    mt-4
                    fw-bold
                    rounded-pill
                "
                :class="registroVarianteAlerta"
                role="alert"
            >
                {{ registroMensajeAlerta }}
            </div>
            <div class="d-flex justify-content-center" v-if="registroEnCurso">
                <div class="spinner-grow text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <vee-form
            class=""
            :validation-schema="schema"
            @submit="registrarNuevoUsuario"
            v-if="!registroEnCurso"
        >
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <vee-field
                    type="text"
                    class="form-control rounded-pill"
                    name="nombre"
                    v-model="nombre"
                />
                <ErrorMessage class="text-danger" name="nombre" />
            </div>
            <div class="mb-3">
                <label for="correo" class="form-label"
                    >Dirección de Correo Electrónico</label
                >
                <vee-field
                    type="email"
                    class="form-control rounded-pill"
                    name="correo"
                    v-model="correoElectronico"
                />
                <ErrorMessage class="text-danger" name="correo" />
            </div>
            <div class="mb-3">
                <vee-field
                    type="text"
                    hidden
                    v-model="regionSeleccionada"
                    name="region"
                />
                <label for="region" class="form-label"
                    >¿En qué región naciste?</label
                >
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
                <ErrorMessage class="text-danger" name="region" />
            </div>
            <div class="mb-3">
                <vee-field
                    type="text"
                    hidden
                    v-model="ciudadSeleccionada"
                    name="ciudad"
                />
                <label for="ciudad" class="form-label">¿En qué ciudad?</label>
                <select
                    as="select"
                    class="form-select rounded-pill"
                    aria-label="ciudad"
                    id="ciudad"
                    v-model="ciudadSeleccionada"
                >
                    <option
                        v-for="ciudad in regionSeleccionada.ciudades"
                        :key="ciudad.id"
                        :value="ciudad"
                    >
                        {{ ciudad.nombre }}
                    </option>
                </select>
                <ErrorMessage class="text-danger" name="ciudad" />
            </div>
            <div class="mb-3 row">
                <div class="col">
                    <label for="fechaNac" class="form-label"
                        >Fecha de Nacimiento</label
                    >
                    <vee-field
                        type="date"
                        name="fechaNac"
                        class="form-control rounded-pill"
                        v-model="fechaNac"
                    />
                    <ErrorMessage class="text-danger" name="fechaNac" />
                </div>
                <div class="col">
                    <label for="horaNac" class="form-label"
                        >Hora de Nacimiento</label
                    >
                    <vee-field
                        type="time"
                        name="horaNac"
                        class="form-control rounded-pill"
                        v-model="horaNac"
                    />
                    <ErrorMessage class="text-danger" name="horaNac" />
                </div>
            </div>
            <div class="mb-3">
                <label for="contrasena" class="form-label">Contraseña</label>
                <vee-field
                    type="password"
                    class="form-control rounded-pill"
                    name="contrasena"
                    v-model="contrasena"
                />
                <ErrorMessage class="text-danger" name="contrasena" />
            </div>
            <div class="mb-3">
                <label for="repetirContrasena" class="form-label"
                    >Repite tu Contraseña</label
                >
                <vee-field
                    type="password"
                    class="form-control rounded-pill"
                    name="repetirContrasena"
                    v-model="repetirContrasena"
                />
                <ErrorMessage class="text-danger" name="repetirContrasena" />
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
        </vee-form>
    </div>
</template>

<script>
import Localidades from "../assets/localidades/ciudades.json";
import validationSchemas from "../includes/validationSchemas.js";
import { mapActions } from "vuex";

export default {
    data() {
        return {
            nombre: "",
            correoElectronico: null,
            contrasena: null,
            repetirContrasena: null,
            regionSeleccionada: [],
            ciudadSeleccionada: [],
            fechaNac: null,
            horaNac: null,
            localidades: Localidades,
            schema: validationSchemas.registro,
            registroMostrarAlerta: false,
            registroEnCurso: false,
            registroVarianteAlerta: "alert-primary",
            registroMensajeAlerta:
                "Espera unos segundos, estamos creado tu cuenta...",
        };
    },
    methods: {
        ...mapActions("usuarioStore", ["registrarUsuario"]),
        async registrarNuevoUsuario() {
            this.registroMostrarAlerta = true;
            this.registroEnCurso = true;
            this.registroVarianteAlerta = "alert-primary";
            this.registroMensajeAlerta =
                "Espera unos segundos, estamos creado tu cuenta...";

            try {
                await this.registrarUsuario({
                    nombre: this.nombre,
                    correoElectronico: this.correoElectronico,
                    regionSeleccionada: this.regionSeleccionada,
                    ciudadSeleccionada: this.ciudadSeleccionada,
                    fechaNac: this.fechaNac,
                    horaNac: this.horaNac,
                    contrasena: this.contrasena,
                });
            } catch (error) {
                this.registroEnCurso = false;
                this.registroVarianteAlerta = "alert-danger";
                if (error.message.includes("user with this email")) {
                    this.registroMensajeAlerta =
                        "Ya existe un usuario con ese correo";
                } else {
                    this.registroMensajeAlerta = "" + error.message;
                    console.log(error);
                }
                return;
            }

            this.registroVarianteAlerta = "alert-success";
            this.registroMensajeAlerta =
                "Felicidades, tu cuenta ha sido creada! Ahora puedes iniciar sesión";
            this.registroEnCurso = false;
            this.$router.push({ name: "InicioSesion" });
        },
    },
};
</script>
<style>
</style>
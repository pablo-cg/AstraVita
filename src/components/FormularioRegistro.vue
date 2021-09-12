<template>
    <div class="text-light">
        <h1 class="display-6 fw-bold text-light text-center">Registro</h1>
        <div v-if="registroEnCurso">
            <div
                class="alert d-flex justify-content-center mt-4 fw-bold rounded-pill"
                :class="registroVarianteAlerta"
                role="alert"
            >
                {{ registroMensajeAlerta }}
            </div>
            <div
                class="d-flex justify-content-center"
                v-if="!registroCompletado"
            >
                <div class="spinner-grow text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <vee-form
            class=""
            :validation-schema="schema"
            @submit="RegistrarUsuario"
            v-else
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
                    v-model="comunaSeleccionada"
                    name="comuna"
                />
                <label for="comuna" class="form-label">¿En qué comuna?</label>
                <select
                    as="select"
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
                <ErrorMessage class="text-danger" name="comuna" />
            </div>
            <div class="mb-3">
                <label for="fHNacimiento" class="form-label"
                    >Fecha y hora de Nacimiento</label
                >
                <vee-field
                    type="datetime-local"
                    name="fHNacimiento"
                    class="form-control rounded-pill"
                    v-model="fechaHoraNac"
                />
                <ErrorMessage class="text-danger" name="fHNacimiento" />
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
import Localidades from "../assets/localidades/regionesComunas.min.json";
import validationSchemas from "../includes/validationSchemas.js";

export default {
    data() {
        return {
            nombre: "",
            correoElectronico: null,
            contrasena: null,
            repetirContrasena: null,
            regionSeleccionada: [],
            comunaSeleccionada: [],
            fechaHoraNac: null,
            localidades: Localidades,
            schema: validationSchemas.registro,
            registroEnCurso: false,
            registroCompletado: false,
            registroVarianteAlerta: "alert-primary",
            registroMensajeAlerta:
                "Espera unos segundos, estamos creado tu cuenta...",
        };
    },
    methods: {
        RegistrarUsuario() {
            this.registroEnCurso = true;
            
            this.registroVarianteAlerta = "alert-success";
            this.registroCompletado = true;
            this.registroMensajeAlerta = "Felicidades, tu cuenta ha sido creada!"
        },
    },
};
</script>

<style>
</style>
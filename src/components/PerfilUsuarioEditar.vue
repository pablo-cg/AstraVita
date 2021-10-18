<template>
    <div class="card">
        <h5 class="card-header text-light" style="background-color: slateblue">
            Editando Perfil
        </h5>
        <div class="card-body d-flex">
            <div class="row">
                <div class="col-md-4">
                    <img src="" alt="avatar_usuario" class="img-fluid" />
                </div>
                <div class="col-md-8">
                    <div class="card-text">
                        <p class="text-muted fst-italic">
                            Debido a que cambiar tus datos de nacimiento implica
                            un recalculo de la carta astral, por el momento solo
                            puedes editar estos datos.
                        </p>
                        <p class="text-muted fst-italic">
                            Deja vacios los campos que no deseas modificar
                        </p>
                        <div class="mb-3 mt-3">
                            <label for="nombre" class="form-label"
                                >Nombre:</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                name="nombre"
                                v-model="nombre"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="bio" class="form-label">Bio:</label>
                            <textarea
                                class="form-control"
                                id="bio"
                                rows="3"
                                v-model="bio"
                            ></textarea>
                        </div>
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                v-model="eliminaBio"
                            />
                            <label
                                class="form-check-label"
                                for="flexCheckDefault"
                            >
                                Elimina mi Bio
                            </label>
                        </div>
                        <!-- <div class="mb-3 mt-3">
                            <label for="correo" class="form-label"
                                >Correo Electrónico:</label
                            >
                            <input
                                type="email"
                                class="form-control"
                                name="correo"
                                v-model="correo"
                            />
                        </div> -->
                        <div class="mb-3 mt-3">
                            <label for="contrasena" class="form-label"
                                >Contraseña:</label
                            >
                            <input
                                type="password"
                                class="form-control"
                                name="contrasena"
                                v-model="contrasena"
                            />
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="repiteContrasena" class="form-label"
                                >Repetir Contraseña:</label
                            >
                            <input
                                type="password"
                                class="form-control"
                                name="repiteContrasena"
                                v-model="repiteContrasena"
                            />
                        </div>
                        <p
                            v-if="repiteContrasena != contrasena"
                            class="text-danger"
                        >
                            Las contraseñas no coinciden
                        </p>
                        <p
                            v-if="nombre == '' && contrasena == ''"
                            class="text-danger"
                        >
                            No hay nada que cambiar
                        </p>
                    </div>
                    <button
                        type="button"
                        class="btn astra-btn-primario m-1"
                        data-bs-toggle="modal"
                        data-bs-target="#confirmacion"
                    >
                        Guardar Cambios
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        @click="cerrar"
                    >
                        Cancelar
                    </button>
                    <div
                        class="modal"
                        id="confirmacion"
                        v-if="
                            (nombre != '' && contrasena != '') ||
                            nombre != '' ||
                            (contrasena != '' && repiteContrasena == contrasena)
                        "
                    >
                        <div class="modal-dialog modal-lg">
                            <PerfilUsuarioModalConfirma
                                :nombre="nombre"
                                :bio="bio"
                                :eliminaBio="eliminaBio"
                                :contrasena="contrasena"
                                @datosActualizados="datosActualizados"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import PerfilUsuarioModalConfirma from "./PerfilUsuarioModalConfirma.vue";

export default {
    data() {
        return {
            nombre: null,
            // correo: null,
            contrasena: "",
            repiteContrasena: "",
            bio: null,
            eliminaBio : false,
        };
    },
    components: {
        PerfilUsuarioModalConfirma,
    },
    computed: {
        ...mapState("usuarioStore", ["usuario"]),

        hayCambios(){
            return "HACER ESTA PARTE"
        }
    },
    methods: {
        cerrar() {
            this.$emit("cerrarEdicionPerfil");
        },
        datosActualizados(value) {
            this.$emit("datosActualizados", value);
        },
    },
    mounted() {
        this.nombre = this.usuario.nombre;
        this.bio = this.usuario.bio;
        // this.correo = this.usuario.correo;
    },
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
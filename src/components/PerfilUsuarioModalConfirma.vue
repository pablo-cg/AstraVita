<template>
    <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
            <h4 class="modal-title">Confirma que tus datos estén correctos</h4>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
            ></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
            <p class="text-muted">¿Son correctos estos datos?</p>
            <div class="mb-3 row">
                <label for="nombre" class="col-sm-2 col-form-label fw-bold"
                    >Nombre:</label
                >
                <div class="col-sm-10">
                    <input
                        type="text"
                        disabled
                        class="form-control-plaintext"
                        id="nombre"
                        :value="nuevoNombre"
                    />
                </div>
            </div>
            <!-- <div class="mb-3 row">
                <label for="correo" class="col-sm-2 col-form-label"
                    >Correo:</label
                >
                <div class="col-sm-10">
                    <input
                        type="text"
                        disabled
                        class="form-control-plaintext"
                        id="correo"
                        :value="nuevoCorreo"
                    />
                </div>
            </div> -->
            <div class="mb-3 row">
                <label for="bio" class="col-sm-2 col-form-label fw-bold"
                    >Bio:</label
                >
                <div class="col-sm-10">
                    <input
                        type="text"
                        disabled
                        class="form-control-plaintext"
                        id="bio"
                        :value="nuevaBio"
                    />
                </div>
            </div>
            <div class="mb-3 row">
                <label for="contrasena" class="col-sm-2 col-form-label fw-bold"
                    >Contraseña:</label
                >
                <div class="col-sm-10">
                    <input
                        type="text"
                        disabled
                        class="form-control-plaintext"
                        id="contrasena"
                        :value="nuevaContrasena"
                    />
                </div>
            </div>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
            <button
                type="button"
                class="btn astra-btn-primario"
                @click="actualizarDatosUsuario"
            >
                Sí, actualiza mis datos
            </button>
            <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                ref="cerrarModal"
            >
                No, me equivoqué
            </button>
        </div>
    </div>
</template>

<script>
import { supabase } from "../includes/supabase";
import { mapActions, mapState } from "vuex";

export default {
    props: ["nombre", "correo", "contrasena", "bio", "eliminaBio"],
    data() {
        return {
            datosActualizados: false,
        };
    },
    computed: {
        ...mapState("usuarioStore", ["usuario"]),

        nuevoNombre() {
            if (this.nombre == "" || this.nombre == this.usuario.nombre) {
                return "Sin cambios";
            } else {
                return this.nombre;
            }
        },
        // nuevoCorreo() {
        //     if (this.correo == "" || this.correo==this.usuario.correo) {
        //         return "Sin cambios";
        //     } else {
        //         return this.correo;
        //     }
        // },
        nuevaBio() {
            if (this.eliminaBio) {
                return "Tu bio se va a eliminar";
            } else if (this.bio == "" || this.bio == this.usuario.bio) {
                return "Sin cambios";
            }
            return this.bio;
        },
        nuevaContrasena() {
            if (this.contrasena == "") {
                return "Sin cambios";
            } else {
                return "por motivos de seguridad tu contraseña no es mostrada, pero debes recordarla";
            }
        },
    },
    methods: {
        ...mapActions("usuarioStore", ["modificarNombreUsuario"]),

        async modificarContrasenaUsuario(contrasena) {
            try {
                const { error } = await supabase.auth.update({
                    password: contrasena,
                });
                if (error) throw error;
            } catch (error) {
                console.log(error);
            }
        },

        async actualizarDatosUsuario() {
            if (this.nombre && this.contrasena == "") {
                try {
                    await this.modificarNombreUsuario(this.nombre);
                    this.datosActualizados = true;
                } catch (error) {
                    this.datosActualizados = false;
                }
                // } else if (this.correo) {
                //     try {
                //         const { user, error } = await supabase.auth.update({
                //             email: this.correo,
                //         });
                //         if (error) throw error;
                //         console.log(user);
                //     } catch (error) {
                //         console.log(error);
                //     }
            } else if (this.contrasena && this.nombre == "") {
                try {
                    await this.modificarContrasenaUsuario(this.contrasena);
                    this.datosActualizados = true;
                } catch (error) {
                    this.datosActualizados = false;
                }
            } else if (this.contrasena && this.nombre) {
                try {
                    await this.modificarNombreUsuario(this.nombre);
                    await this.modificarContrasenaUsuario(this.contrasena);
                    this.datosActualizados = true;
                } catch (error) {
                    this.datosActualizados = false;
                }
            }

            const btn = this.$refs.cerrarModal;
            btn.click();
            this.$emit("datosActualizados", this.datosActualizados);
        },
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
</style>
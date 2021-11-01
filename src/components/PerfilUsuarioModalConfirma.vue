<template>
    <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
            <h4 class="modal-title">{{ titulo }}</h4>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
            ></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
            <div class="card-text">
                {{ texto }}
            </div>
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
            <button
                v-if="hayCambios"
                type="button"
                class="btn astra-btn-primario"
                @click="actualizarDatosUsuario"
            >
                Sí, actualiza mis datos
            </button>
            <button
                v-if="hayCambios"
                type="button"
                class="btn astra-btn-cancel"
                data-bs-dismiss="modal"
                ref="cerrarModal"
            >
                No, me equivoqué
            </button>
            <button
                v-else
                type="button"
                class="btn astra-btn-primario"
                data-bs-dismiss="modal"
            >
                Nada que cambiar
            </button>
        </div>
    </div>
</template>

<script>
import { supabase } from "../includes/supabase";
import { mapActions, mapState } from "vuex";

export default {
    props: [
        "nombre",
        "correo",
        "contrasena",
        "bio",
        "eliminaBio",
        "elementoACambiar",
    ],
    data() {
        return {
            datosActualizados: false,
            hayCambios: true,
        };
    },
    computed: {
        ...mapState("usuarioStore", ["usuario"]),
        titulo() {
            if (this.elementoACambiar == "nombre") {
                return "Este será tu nuevo nombre";
            } else if (this.elementoACambiar == "contrasena") {
                return "Estas apunto de cambiar tu contraseña";
            } else if (this.eliminaBio) {
                return "Estas a punto de eliminar tu bio";
            } else {
                return "Esta será tu nueva bio:";
            }
        },
        texto() {
            if (this.elementoACambiar == "nombre") {
                return `${this.nombre}, ¿Quieres cambiarlo?`;
            } else if (this.elementoACambiar == "contrasena") {
                return "¿Quieres cambiarla?";
            } else if (this.eliminaBio) {
                return "¿Quieres eliminarla?";
            } else {
                return `${this.bio}, ¿quieres cambiarla?`;
            }
        },
    },
    methods: {
        ...mapActions("usuarioStore", ["modificarUsuario"]),

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
            try {
                if (this.elementoACambiar == "nombre") {
                    await this.modificarUsuario({
                        nombre: this.nombre,
                    });
                } else if (this.elementoACambiar == "contrasena") {
                    await this.modificarContrasenaUsuario(this.contrasena);
                } else if (this.eliminaBio) {
                    await this.modificarUsuario({
                        bio: "",
                    });
                } else {
                    await this.modificarUsuario({
                        bio: this.bio,
                    });
                }
                this.datosActualizados = true;
            } catch (error) {
                console.log(error);
                this.datosActualizados = false;
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

.astra-btn-cancel{
    background-color: #cd6a5a;
    border-color: #cd6a5a;
    color: whitesmoke;
}

.astra-btn-cancel:hover{
    background-color: #bdcd5a;
    border-color: #bdcd5a;
    color: dark;
}
</style>
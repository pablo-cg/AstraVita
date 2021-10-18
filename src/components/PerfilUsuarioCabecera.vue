<template>
    <div class="card" v-if="usuario && !editandoPerfil">
        <h5 class="card-header text-light" style="background-color: slateblue">
            {{ usuario.nombre }}
        </h5>
        <div class="card-body">
            <div class="row">
                <div class="col-md-4">
                    <img
                        :src="usuario.avatar_url"
                        alt="avatar_usuario"
                        class="img-fluid"
                    />
                </div>
                <div class="col-md-8">
                    <div class="mb-3">
                        <p class="card-text mb-3 text-muted">
                            {{usuario.bio}}
                        </p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                {{ usuario.lugar_nac }}
                            </li>
                            <li class="list-group-item">
                                {{ fechaNac }} a las
                                {{ horaNac }}
                            </li>
                            <li class="list-group-item">
                                {{ usuario.correo }}
                            </li>
                        </ul>
                    </div>
                    <div
                        class="alert alert-dismissible fade show"
                        :class="alertaTipo"
                        v-if="mostrarAlerta"
                    >
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="alert"
                        ></button>
                        <strong>{{ alertaTitulo }}</strong> {{ alertaTexto }}
                    </div>
                    <button
                        type="button"
                        class="btn astra-btn-primario m-1"
                        :hidden="editandoPerfil"
                        @click="mostrarEdicionPerfil"
                    >
                        Editar Perfil
                    </button>
                </div>
            </div>
        </div>
    </div>
    <perfil-usuario-editar
        @cerrarEdicionPerfil="mostrarEdicionPerfil"
        @datosActualizados="datosActualizados"
        v-if="editandoPerfil"
    ></perfil-usuario-editar>
</template>

<script>
import { mapState } from "vuex";

import PerfilUsuarioEditar from "./PerfilUsuarioEditar.vue";

export default {
    data() {
        return {
            editandoPerfil: false,
            mostrarAlerta: false,
            alertaTipo: "",
            alertaTitulo: "",
            alertaTexto: "",
        };
    },
    components: { PerfilUsuarioEditar },
    computed: {
        ...mapState("usuarioStore", ["usuario"]),

        fechaNac() {
            return new Date(this.usuario.fecha_nac).toLocaleDateString();
        },

        horaNac() {
            return this.usuario.hora_nac.slice(0, -3);
        },
    },
    methods: {
        mostrarEdicionPerfil() {
            this.editandoPerfil = !this.editandoPerfil;
        },
        datosActualizados(value) {
            this.editandoPerfil = false;
            this.mostrarAlerta = true;
            if (value) {
                this.alertaTipo = "alert-success";
                this.alertaTitulo = "Súper!";
                this.alertaTexto = "Hemos cambiado tus datos correctamente";
            } else {
                this.alertaTipo = "alert-warning";
                this.alertaTitulo = "Ups!";
                this.alertaTexto =
                    "Ocurrió un error inesperado al cambiar tus datos, intenta más tarde";
            }
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
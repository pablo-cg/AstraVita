<template>
    <div class="card text-black" v-if="usuario">
        <div class="row g-0">
            <div class="col-md-4">
                <img
                    :src="usuario.avatar_url"
                    class="img-fluid rounded-start"
                    alt="avatar_usuario"
                />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ usuario.nombre }}</h5>
                    <p class="card-text">
                        {{ usuario.bio }}
                    </p>
                    <p class="card-text" v-if="tipo == 'solicitudes'">
                        <button
                            type="button"
                            class="btn astra-btn-primario m-1"
                            @click="aceptarSolicitud"
                        >
                            Aceptar solicitud
                        </button>
                        <button
                            type="button"
                            class="btn astra-btn-primario m-1"
                            @click="rechazarSolicitud"
                        >
                            Rechazar Solicitud
                        </button>
                    </p>
                    <p class="card-text" v-if="tipo == 'listaAmigos'">
                        <button
                            type="button"
                            class="btn astra-btn-primario m-1"
                            data-bs-toggle="modal"
                            data-bs-target="#modalElimina"
                            @click="eliminarAmigo"
                        >
                            Eliminar amigo
                        </button>
                        <button
                            type="button"
                            class="btn astra-btn-primario m-1"
                            @click="verPerfil"
                        >
                            Ver Perfil
                        </button>
                        <button
                            type="button"
                            class="btn astra-btn-primario m-1"
                            data-bs-toggle="modal"
                            data-bs-target="#modalMensaje"
                            @click="enviarMensaje"
                        >
                            Enviar Mensaje
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["usuario", "tipo"],
    methods: {
        aceptarSolicitud() {
            this.$emit("aceptarSolicitud");
        },
        rechazarSolicitud() {
            this.$emit("rechazarSolicitud");
        },
        eliminarAmigo() {
            this.$emit("eliminarAmigo");
        },
        verPerfil() {
            this.$emit("verPerfil");
        },
        enviarMensaje() {
            this.$emit("enviarMensaje");
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
<template>
    <div class="row row-cols-1 row-cols-md-1 g-2">
        <div
            class="mt-4 p-5 text-white rounded"
            style="background-color: #5548a4; border-color: slateblue"
        >
            <div class="row">
                <div class="col">
                    <h1>Mensajes</h1>
                </div>
                <!-- <div class="col text-end">
                    <button type="button" class="btn astra-btn-secundario" @click="mostrarSolicitudes">
                        Ver solicitudes pendientes <i class="fas fa-bell"></i>
                    </button>
                </div> -->
            </div>
            <p>Aquí podrás ver los mensajes que has recibido y enviado</p>
        </div>
    </div>
    <div class="card mt-2">
        <nav class="nav nav-pills nav-fill border-bottom">
            <a
                class="nav-link link-dark"
                :class="{
                    active: activo == 'enviados',
                    disabled: activo == 'enviados',
                }"
                href="#"
                @click="mostrarEnviados"
                >Mensajes Enviados</a
            >
            <a
                class="nav-link link-dark"
                :class="{
                    active: activo == 'recibidos',
                    disabled: activo == 'recibidos',
                }"
                href="#"
                @click="mostrarRecibidos"
                >Mensajes recibidos</a
            >
        </nav>
        <div v-if="activo == 'enviados'">
            <mensaje-card
                v-for="mensaje in mensajesEnviados"
                :key="mensaje.id"
                :mensaje="mensaje"
                :textoTipo="'Enviado a'"
                :esEnviados="true"
            ></mensaje-card>
            <VueEternalLoading :load="getMensajesEnviados">
                <template #loading>
                    <div class="d-flex justify-content-center my-4">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden"
                                >Cargando contenido...</span
                            >
                        </div>
                    </div>
                </template>

                <template #no-more>
                    <div class="text-dark text-center fw-bold mb-4">
                        <i class="fas fa-info-circle"></i> No hay más mensajes
                        que mostrar
                        <i class="fas fa-info-circle"></i>
                    </div>
                </template>

                <template #no-results>
                    <div class="text-dark text-center fw-bold mb-4">
                        <i class="fas fa-frown"></i> Aun no has enviado ningún
                        mensaje
                        <i class="fas fa-frown"></i>
                    </div>
                </template>

                <template #error>
                    <div class="text-dark text-center fw-bold mb-4">
                        <i class="fas fa-exclamation-triangle"></i> Ocurrió un
                        error inesperado
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                </template>
            </VueEternalLoading>
        </div>
        <div v-if="activo == 'recibidos'">
            <mensaje-card
                v-for="mensaje in mensajesRecibidos"
                :key="mensaje.id"
                :mensaje="mensaje"
                :textoTipo="'Recibido de'"
                @responderMensaje="modalResponderMensaje(mensaje)"
            ></mensaje-card>
            <VueEternalLoading :load="getMensajesRecibidos">
                <template #loading>
                    <div class="d-flex justify-content-center my-4">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden"
                                >Cargando contenido...</span
                            >
                        </div>
                    </div>
                </template>

                <template #no-more>
                    <div class="text-dark text-center fw-bold mb-4">
                        <i class="fas fa-info-circle"></i> No hay más mensajes
                        que mostrar
                        <i class="fas fa-info-circle"></i>
                    </div>
                </template>

                <template #no-results>
                    <div class="text-dark text-center fw-bold mb-4">
                        <i class="fas fa-frown"></i> Aun no has recibido ningún
                        mensaje
                        <i class="fas fa-frown"></i>
                    </div>
                </template>

                <template #error>
                    <div class="text-dark text-center fw-bold mb-4">
                        <i class="fas fa-exclamation-triangle"></i> Ocurrió un
                        error inesperado
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                </template>
            </VueEternalLoading>
        </div>
    </div>
    <!-- MODAL ENVIAR MENSAJE A AMIGO -->
        <div
            class="modal fade"
            id="modalMensaje"
            tabindex="-1"
            aria-labelledby="modalMensajeLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" v-if="usuarioSeleccionado">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalMensajeLabel">
                            Enviando mensaje a {{ usuarioSeleccionado.perfil_usuario.nombre }}
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="respuesta" class="form-label"
                                >Mensaje:</label
                            >
                            <textarea
                                class="form-control"
                                id="respuesta"
                                rows="3"
                                v-model="respuesta"
                            ></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn astra-btn-primario"
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            class="btn btn-danger"
                            data-bs-dismiss="modal"
                            @click="responderMensaje(usuarioSeleccionado.usuario_envia)"
                            v-if="respuesta != ''"
                        >
                            Envía mi mensaje
                        </button>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import { supabase } from "@/includes/supabase";
import MensajeCard from "@/components/MensajeCard.vue";
import { VueEternalLoading } from "@ts-pro/vue-eternal-loading";

export default {
    components: {
        MensajeCard,
        VueEternalLoading,
    },
    data() {
        return {
            activo: "enviados",
            mensajesEnviados: [],
            mensajesRecibidos: [],
            mensajeInicio: 0,
            mensajeFin: 5,
            usuarioSeleccionado : null,
            respuesta: ""
        };
    },
    methods: {
        mostrarEnviados() {
            this.mensajeInicio = 0;
            this.mensajeFin = 5;
            this.mensajesEnviados = [];
            this.activo = "enviados";
        },

        mostrarRecibidos() {
            this.mensajeInicio = 0;
            this.mensajeFin = 5;
            this.mensajesRecibidos = [];
            this.activo = "recibidos";
        },

        async getMensajesEnviados({ loaded }) {
            try {
                const { data: mensajes, error } = await supabase
                    .from("mensaje")
                    .select("*, perfil_usuario:usuario_recibe(nombre)")
                    .eq("usuario_envia", supabase.auth.user().id)
                    .range(this.mensajeInicio, this.mensajeFin)
                    .order("created_at", { ascending: false });
                if (error) throw error;
                if (mensajes.length) {
                    this.mensajesEnviados.push(...mensajes);
                    this.mensajeInicio += 5;
                    this.mensajeFin += 5;
                    loaded(mensajes.length, 5);
                }
            } catch (error) {
                console.log(error);
            }
        },

        async getMensajesRecibidos({ loaded }) {
            try {
                const { data: mensajes, error } = await supabase
                    .from("mensaje")
                    .select("*, perfil_usuario:usuario_envia(nombre)")
                    .eq("usuario_recibe", supabase.auth.user().id)
                    .range(this.mensajeInicio, this.mensajeFin)
                    .order("created_at", { ascending: false });
                if (error) throw error;
                if (mensajes.length) {
                    this.mensajesRecibidos.push(...mensajes);
                    this.mensajeInicio += 5;
                    this.mensajeFin += 5;
                    loaded(mensajes.length, 5);
                }
            } catch (error) {
                console.log(error);
            }
        },

        modalResponderMensaje(usuario){
            this.usuarioSeleccionado = usuario
        },

        async responderMensaje(idUsuario){
            if (this.respuesta != "") {
                try {
                    const { error } = await supabase.from("mensaje").insert({
                        usuario_envia: supabase.auth.user().id,
                        usuario_recibe: idUsuario,
                        contenido: this.respuesta,
                    });
                    if (error) throw error;
                    // TODO: Agregar lógica para que muestre una alerta de mensaje enviado
                } catch (error) {
                    console.log(error);
                }
            }
            this.respuesta = "";
        }
    },
};
</script>
<style scoped>
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
    color: #fff;
    background-color: slateblue;
}
</style>
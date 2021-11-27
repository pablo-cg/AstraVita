<template>
    <div class="row row-cols-1 row-cols-md-1 g-2">
        <div
            class="mt-4 p-5 text-white rounded"
            style="background-color: #5548a4; border-color: slateblue"
        >
            <div class="row">
                <div class="col">
                    <h1>Contacto</h1>
                </div>
                <!-- <div class="col text-end">
                    <button type="button" class="btn astra-btn-secundario" @click="mostrarSolicitudes">
                        Ver solicitudes pendientes <i class="fas fa-bell"></i>
                    </button>
                </div> -->
            </div>
            <p class="fs-5">
                ¿Tienes algún inconveniente?, cuéntanos de qué se trata y te
                ayudaremos
            </p>
        </div>
    </div>
    <div class="row row-cols-1 row-cols-md-1 g-2">
        <div class="card mt-3">
            <div class="card-body">
                <form @submit.prevent="enviarSolicitud">
                    <div class="mb-4">
                        <label for="asunto" class="form-label">Asunto:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="asunto"
                            aria-describedby="ayudaAsunto"
                            v-model="asunto"
                        />
                        <div id="ayudaAsunto" class="form-text">
                            Cuéntanos en pocas palabras de que se trata
                        </div>
                    </div>
                    <div class="mb-3 form-floating">
                        <textarea
                            class="form-control"
                            id="detalles"
                            style="height: 100px"
                            v-model="detalles"
                        ></textarea>
                        <label for="detalles">Pon aquí los detalles:</label>
                    </div>
                    <button type="submit" class="btn astra-btn-primario">
                        Enviar
                    </button>
                </form>
                <div
                    class="alert alert-dismissible fade show mt-3"
                    :class="alerta.tipo"
                    role="alert"
                    v-if="alerta"
                >
                    <strong>{{ alerta.titulo }}</strong> {{ alerta.mensaje }}
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { supabase } from "@/includes/supabase";

export default {
    data() {
        return {
            asunto: null,
            detalles: null,
            alerta: null,
        };
    },
    methods: {
        enviarSolicitud() {
            if (this.asunto && this.detalles) {
                try {
                    const { error } = supabase.from("caso_soporte").insert({
                        id_usuario: supabase.auth.user().id,
                        asunto: this.asunto,
                        detalles: this.detalles,
                    });
                    if (error) throw error;
                    this.alerta = {
                        tipo: "alert-success",
                        titulo: "Ticket Enviado!",
                        mensaje:
                            "Un miembro de AstraStaff revisará tu caso y entregará una respuesta en las proximas horas, gracias por contactarte con nosotros",
                    };
                    this.limpiarFormulario()
                } catch (error) {
                    console.log(error);
                    this.alerta = {
                        tipo: "alert-warning",
                        titulo: "Ups!",
                        mensaje:
                            "Ocurrió un error inesperado, intenta más tarde",
                    };
                }
            } else {
                this.alerta = {
                    tipo: "alert-danger",
                    titulo: "Espera!",
                    mensaje: "No has completado el formulario de contacto",
                };
            }
        },

        limpiarFormulario(){
            this.asunto = null;
            this.detalles = null;
        }
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
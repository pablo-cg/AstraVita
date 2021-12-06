<template>
    <div class="card" v-if="usuario">
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
                            {{ usuario.bio }}
                        </p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                {{ usuario.lugar_nac }}
                            </li>
                            <!-- <li class="list-group-item">
                                {{ fechaNac }} a las
                                {{ horaNac }}
                            </li>
                            <li class="list-group-item">
                                {{ usuario.correo }}
                            </li> -->
                        </ul>
                    </div>
                    <button
                        type="button"
                        class="btn astra-btn-primario m-1"
                        @click="enviarSolicitudAmistad"
                        v-if="existeAmigo == false"
                    >
                        {{
                            solicitudEnviada
                                ? "Solicitud Enviada"
                                : "Enviar Solicitud"
                        }}
                    </button>
                    <section v-else>
                        <button
                            type="button"
                            class="btn astra-btn-primario m-1 disabled"
                            @click="enviarSolicitudAmistad"
                            v-if="amigo.confirmado == false"
                        >
                            Solicitud Enviada
                        </button>
                        <section v-if="amigo.confirmado">
                            <button
                                type="button"
                                class="btn astra-btn-primario m-1"
                                data-bs-toggle="modal"
                                data-bs-target="#modalMensaje"
                            >
                                Enviar Mensaje
                            </button>
                            <button
                                type="button"
                                class="btn astra-btn-primario m-1"
                                data-bs-toggle="modal"
                                data-bs-target="#modalElimina"
                            >
                                Eliminar
                            </button>
                        </section>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <!-- MODAL ENVIAR MENSAJE A AMIGO -->
        <div
            class="modal fade"
            id="modalMensaje"
            tabindex="-1"
            aria-labelledby="modalMensajeLabel"
            aria-hidden="true"
            v-if="usuario"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalMensajeLabel">
                            Enviando mensaje a {{ usuario.nombre }}
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
                            <label for="mensaje" class="form-label"
                                >Mensaje:</label
                            >
                            <textarea
                                class="form-control"
                                id="mensaje"
                                rows="3"
                                v-model="mensaje"
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
                            @click="enviarMensaje"
                            v-if="mensaje != ''"
                        >
                            Envía mi mensaje
                        </button>
                    </div>
                </div>
            </div>
        </div>
    <div
            class="modal fade"
            id="modalElimina"
            tabindex="-1"
            aria-labelledby="modalEliminaLabel"
            aria-hidden="true"
            v-if="usuario"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalEliminaLabel">
                            Eliminar Amigo
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body" v-if="existeAmigo">
                        ¿Estas seguro de eliminar a
                        {{ usuario.nombre }}?
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn astra-btn-primario"
                            data-bs-dismiss="modal"
                        >
                            No, me arrepentí
                        </button>
                        <button
                            type="button"
                            class="btn btn-danger"
                            data-bs-dismiss="modal"
                            @click="eliminarAmigo(amigo.id)"
                        >
                            Sí, ya no quiero que esté en mi lista
                        </button>
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
            usuario: null,
            amigo: null,
            existeAmigo: false,
            solicitudEnviada: false,
            mensaje : "",
        };
    },
    computed: {
        fechaNac() {
            return new Date(this.usuario.fecha_nac).toLocaleDateString();
        },

        horaNac() {
            return this.usuario.hora_nac.slice(0, -3);
        },
    },
    methods: {
        async buscarUsuario() {
            try {
                const { data: user, error } = await supabase
                    .from("perfil_usuario")
                    .select()
                    .eq("id", this.$route.params.idUsuario)
                    .single();
                if (error) throw error;
                this.usuario = user;
            } catch (error) {
                console.log(error);
            }
        },
        async enviarSolicitudAmistad() {
            try {
                const { error } = await supabase.from("lista_amigo").insert([
                    {
                        id_usuario1: supabase.auth.user().id,
                        id_usuario2: this.usuario.id,
                    },
                ]);
                if (error) throw error;
                this.solicitudEnviada = true;
            } catch (error) {
                console.log(error);
                this.solicitudEnviada = false;
            }
        },
        async obtenerAmigoEnLista() {
            try {
                const { data: user, error } = await supabase
                    .from("lista_amigo")
                    .select()
                    .or(
                        `and(id_usuario1.eq.${
                            this.usuario.id
                        }, id_usuario2.eq.${
                            supabase.auth.user().id
                        }),and(id_usuario1.eq.${
                            supabase.auth.user().id
                        }, id_usuario2.eq.${this.usuario.id})`
                    )
                    .single();
                if (error) throw error;
                this.amigo = user;
                if (this.amigo) this.existeAmigo = true;
            } catch (error) {
                console.log(error);
            }
        },

        async enviarMensaje() {
            if (this.mensaje != "") {
                try {
                    const { error } = await supabase.from("mensaje").insert({
                        usuario_envia: supabase.auth.user().id,
                        usuario_recibe: this.usuario.id,
                        contenido: this.mensaje,
                    });
                    if (error) throw error;
                    // TODO: Agregar lógica para que muestre una alerta de mensaje enviado
                } catch (error) {
                    console.log(error);
                }
            }
            this.mensaje = "";
        },

        async eliminarAmigo(idAmigoEnLista) {
            try {
                const { error } = await supabase
                    .from("lista_amigo")
                    .delete()
                    .match({ id: idAmigoEnLista });
                if (error) throw error;
                this.$router.push({
                    name: "MisAmigos",
                    params: { idUsuario: 'asd' },
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
    async created() {
        await this.buscarUsuario();
        await this.obtenerAmigoEnLista();
        const nombreUsuario = this.usuario.nombre;
        document.title = `${nombreUsuario} - AstraVita`;
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
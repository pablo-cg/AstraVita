<template>
    <div class="row row-cols-1 row-cols-md-1 g-2">
        <div
            class="mt-4 p-5 text-white rounded"
            style="background-color: #5548a4; border-color: slateblue"
        >
            <div class="row">
                <div class="col">
                    <h1>Mis amigos</h1>
                </div>
                <div class="col text-end">
                    <button
                        type="button"
                        class="btn astra-btn-secundario"
                        @click="mostrarSolicitudes"
                        v-if="numeroSolicitudesPendientes > 0"
                    >
                        Ver solicitudes pendientes ({{
                            numeroSolicitudesPendientes
                        }})
                        <i class="fas fa-bell"> </i>
                    </button>
                    <button
                        type="button"
                        class="btn astra-btn-secundario disabled"
                        v-else
                    >
                        No hay solicitudes pendientes
                    </button>
                </div>
            </div>
            <p>
                Aquí puedes ver la lista de tus amigos y tus solicitudes
                pendientes
            </p>
        </div>
        <section v-if="verSolicitudes">
            <div
                class="mt-1 p-5 text-white rounded"
                style="background-color: #5548a4; border-color: slateblue"
            >
                <div class="row">
                    <div class="col">
                        <h1>Solicitudes Pendientes</h1>
                    </div>
                    <div class="col text-end">
                        <button
                            type="button"
                            class="btn astra-btn-secundario"
                            @click="this.verSolicitudes = !this.verSolicitudes"
                        >
                            Cerrar Panel
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <p>
                        <UsuarioCard
                            class="m-1"
                            v-for="usuarioPendiente in solicitudesPendientes"
                            :key="usuarioPendiente.id"
                            :usuario="usuarioPendiente.perfil_usuario"
                            :tipo="'solicitudes'"
                            @aceptarSolicitud="
                                aceptarSolicitud(usuarioPendiente.id)
                            "
                            @rechazarSolicitud="
                                rechazarSolicitud(usuarioPendiente.id)
                            "
                        />
                    </p>
                </div>
            </div>
        </section>
        <section v-if="listaAmigos">
            <UsuarioCard
                class="mb-1"
                v-for="amigo in listaAmigos"
                :key="amigo.id_lista"
                :usuario="amigo"
                :tipo="'listaAmigos'"
                @eliminarAmigo="modalEliminarAmigo(amigo)"
                @verPerfil="verPerfil(amigo.id_usuario)"
                @enviarMensaje="enviarMensaje(amigo.id_usuario)"
            />
            <VueEternalLoading :load="listarAmigos"></VueEternalLoading>
            <div class="no-more text-light text-center fw-bold">
                <i class="fas fa-frown"></i> No hay más amigos que mostrar.
                <i class="fas fa-frown"></i>
            </div>

            <div
                class="modal fade"
                id="modalElimina"
                tabindex="-1"
                aria-labelledby="modalEliminaLabel"
                aria-hidden="true"
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
                        <div class="modal-body" v-if="amigoAEliminar">
                            ¿Estas seguro de eliminar a
                            {{ amigoAEliminar.nombre }}?
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
                                @click="eliminarAmigo(amigoAEliminar.id_lista)"
                            >
                                Sí, ya no quiero que esté en mi lista
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import { supabase } from "@/includes/supabase";
import UsuarioCard from "@/components/UsuarioCard.vue";
import { VueEternalLoading } from "@ts-pro/vue-eternal-loading";

export default {
    data() {
        return {
            numeroSolicitudesPendientes: 0,
            verSolicitudes: false,
            solicitudesPendientes: null,
            listaAmigos: [],
            indexAmigoInicio: 0,
            indexAmigoFin: 5,
            amigoAEliminar: undefined,
        };
    },
    components: {
        UsuarioCard,
        VueEternalLoading,
    },
    methods: {
        async mostrarSolicitudes() {
            this.verSolicitudes = !this.verSolicitudes;
            await this.listarSolicitudesPendientes();
        },

        async getSolicitudesPendientes() {
            try {
                const { count: pendientes, error } = await supabase
                    .from("lista_amigo")
                    .select("id_usuario2", { count: "exact" })
                    .match({
                        id_usuario2: supabase.auth.user().id,
                        confirmado: false,
                    });
                if (error) throw error;
                this.numeroSolicitudesPendientes = pendientes;
            } catch (error) {
                console.log(error);
            }
        },

        async listarSolicitudesPendientes() {
            try {
                const { data: pendientes, error } = await supabase
                    .from("lista_amigo")
                    .select("*, perfil_usuario!id_usuario1(*)")
                    .match({
                        id_usuario2: supabase.auth.user().id,
                        confirmado: false,
                    });
                this.solicitudesPendientes = pendientes;
                if (error) throw error;
            } catch (error) {
                console.log(error);
            }
        },

        async aceptarSolicitud(id) {
            try {
                const { data, error } = await supabase
                    .from("lista_amigo")
                    .update({ confirmado: true, amigos_desde: new Date().toDateString() })
                    .match({ id: id });
                if (error) throw error;
                this.solicitudesPendientes = this.solicitudesPendientes.filter(
                    (sol) => sol.id != id
                );
                this.numeroSolicitudesPendientes--;
                this.haySolicitudes(true);
            } catch (error) {
                console.log(error);
            }
        },

        async rechazarSolicitud(id) {
            try {
                const { data, error } = await supabase
                    .from("lista_amigo")
                    .delete()
                    .match({ id: id });
                if (error) throw error;
                this.solicitudesPendientes = this.solicitudesPendientes.filter(
                    (sol) => sol.id != id
                );
                this.numeroSolicitudesPendientes--;
                this.haySolicitudes();
            } catch (error) {
                console.log(error);
            }
        },

        async listarAmigos({ loaded }) {
            try {
                const { data: amigos, error } = await supabase
                    .rpc("lista_de_amigos", {
                        id_usuario: supabase.auth.user().id,
                    })
                    .range(this.indexAmigoInicio, this.indexAmigoFin);
                if (error) throw error;
                if (amigos.length) {
                    this.listaAmigos.push(...amigos);
                    this.indexAmigoInicio += 5;
                    this.indexAmigoFin += 5;
                    loaded(amigos.length, 5);
                }
            } catch (error) {
                console.log(error);
            }
        },

        modalEliminarAmigo(amigo) {
            this.amigoAEliminar = amigo;
        },

        async eliminarAmigo(idAmigoEnLista) {
            try {
                const { error } = await supabase
                    .from("lista_amigo")
                    .delete()
                    .match({ id: idAmigoEnLista });
                if (error) throw error;
                this.listaAmigos = this.listaAmigos.filter(
                    (amigo) => amigo.id_lista != idAmigoEnLista
                );
            } catch (error) {
                console.log(error);
            }
        },

        verPerfil(idUsuario) {
            this.$router.push({
                name: "Perfil",
                params: { idUsuario: idUsuario },
            });
        },

        enviarMensaje(idUsuario) {
            console.log(idUsuario);
        },

        haySolicitudes(acepta) {
            if (this.numeroSolicitudesPendientes == 0) {
                this.verSolicitudes = !this.verSolicitudes;
                if (acepta) {
                    this.$router.go();
                }
            }
        },
    },
    async created() {
        await this.getSolicitudesPendientes();
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
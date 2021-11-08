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
        <nav class="nav nav-pills nav-fill">
            <a
                class="nav-link link-dark"
                :class="{ active: activo == 'enviados' }"
                href="#"
                @click="mostrarEnviados"
                >Mensajes Enviados</a
            >
            <a
                class="nav-link link-dark"
                :class="{ active: activo == 'recibidos'}"
                href="#"
                @click="mostrarRecibidos"
                >Mensajes recibidos</a
            >
        </nav>
        <div v-if="activo == 'enviados'">
            <!-- TODO: Card o algo para mostrar los mensajes enviados -->
        </div>
        <div v-if="activo == 'recibidos'">
            <!-- TODO: Card o algo para mostrar los mensajes enviados -->
        </div>
    </div>
</template>
<script>
import { supabase } from "@/includes/supabase";

export default {
    data() {
        return {
            activo: "enviados",
            mensajesEnviados: null,
            mensajesRecibidos: null,
        };
    },
    methods: {
        async mostrarEnviados() {
            try {
                const {data: mensajes, error} = await supabase
                .from('mensaje')
                .select('*, perfil_usuario:usuario_recibe(nombre)')
                .eq('usuario_envia', supabase.auth.user().id);
                if (error) throw error;
                this.mensajesEnviados = mensajes;
            } catch (error) {
                console.log(error);
            }
            this.activo = "enviados";
        },

        async mostrarRecibidos() {
            try {
                const {data: mensajes, error} = await supabase
                .from('mensaje')
                .select('*, perfil_usuario:usuario_envia(nombre)')
                .eq('usuario_recibe', supabase.auth.user().id);
                if (error) throw error;
                this.mensajesRecibidos = mensajes;
            } catch (error) {
                console.log(error);
            }
            this.activo = "recibidos";
        },
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
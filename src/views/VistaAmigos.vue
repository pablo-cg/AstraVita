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
                        v-if="solicitudesPendientes > 0"
                    >
                        Ver solicitudes pendientes ({{ solicitudesPendientes }})
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
        <div class="toast">
            <div class="toast-header">
                <strong class="me-auto">Toast Header</strong>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="toast"
                ></button>
            </div>
            <div class="toast-body">
                <p>Some text inside the toast body</p>
            </div>
        </div>
    </div>
</template>
<script>
import { supabase } from "@/includes/supabase";

export default {
    data() {
        return {
            solicitudesPendientes: 0,
        };
    },
    computed: {},
    methods: {
        mostrarSolicitudes() {
            console.log("MOSTRAR SOLICITUDES");
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
                this.solicitudesPendientes = pendientes;
            } catch (error) {
                console.log(error);
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
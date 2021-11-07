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
        <div v-if="activo == 'enviados'">enviados</div>
        <div v-if="activo == 'recibidos'">recibidos</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activo: "enviados",
        };
    },
    methods: {
        mostrarEnviados() {
            console.log("enviados");
            this.activo = "enviados";
        },

        mostrarRecibidos() {
            console.log("recibidos");
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
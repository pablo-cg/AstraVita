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
                    <button type="button" class="btn astra-btn-secundario" @click="mostrarSolicitudes">
                        Ver solicitudes pendientes <i class="fas fa-bell"></i>
                    </button>
                </div>
            </div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente cupiditate nemo quae ipsa. Quaerat sapiente soluta
                veritatis corporis labore obcaecati, itaque sunt quos earum
                blanditiis eveniet dolorum cupiditate pariatur harum.
            </p>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        mostrarSolicitudes(){
            console.log('MOSTRAR SOLICITUDES');
        }
    }
}
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
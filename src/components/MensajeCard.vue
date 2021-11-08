<template>
    <div class="container" v-if="mensaje">
        <section class="mx-auto my-5">
            <div class="card shadow">
                <div class="card-body">
                    <blockquote
                        class="blockquote blockquote-custom bg-white px-3 pt-4"
                    >
                        <div class="blockquote-custom-icon bg-astracolor">
                            <i class="fa fa-quote-left text-white"></i>
                        </div>
                        <p class="mb-0 mt-2">
                            {{ mensaje.contenido }}
                        </p>
                        <footer class="blockquote-footer pt-4 mt-4 border-top">
                            {{textoTipo}} {{ mensaje.perfil_usuario.nombre }} el
                            <cite title="Source Title">{{
                                creadoEl(new Date(mensaje.created_at))
                            }}</cite>
                            <div class="text-end">
                                <button type="button" class="btn astra-btn-primario">
                                    Responder
                                </button>
                            </div>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </section>
    </div>
</template>
 <script>
export default {
    props: ["mensaje", "textoTipo"],
    methods: {
        creadoEl(fecha) {
            const nuevaFecha = fecha.toLocaleString();
            return nuevaFecha;
        },
    },
};
</script>
<style scoped>
.blockquote-custom {
    position: relative;
    font-size: 1.1rem;
}

.blockquote-custom-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -40px;
    left: 19px;
}

.bg-astracolor {
    background-color: slateblue;
}

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
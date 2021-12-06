<template>
    <div class="card">
        <h5 class="card-header">
            <section class="row">
                <div class="col" v-if="comentario.es_anonimo">
                    <i class="fas fa-user-secret"></i> Anónimo
                    {{ comentario.id_usuario.substring(0, 7) }} dice:
                </div>
                <div class="col" v-else>
                <i class="fas fa-user"></i>&nbsp;
                <router-link
                    :to="
                        idUsuario == comentario.id_usuario
                            ? {
                                  name: 'PerfilUsuarioInicio',
                                  params: { id: '#' },
                              }
                            : {
                                  name: 'Perfil',
                                  params: { idUsuario: comentario.id_usuario },
                              }
                    "
                    >{{ comentario.nombre_usuario }}
                </router-link>
                dice:
            </div>
                <div class="col text-end">
                    <i class="fas fa-clock"></i>
                    {{ creadoEl(new Date(comentario.created_at)) }}
                    <button type="button" class="btn astra-btn-secundario btn-sm" v-if="idUsuario != comentario.id_usuario">Reportar</button>
                    <button type="button" class="btn btn-danger btn-sm" v-if="idUsuario == comentario.id_usuario">Eliminar</button>
                </div>
            </section>
        </h5>
        <div class="card-body">
            <p>{{ comentario.contenido }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ["comentario", "idUsuario"],
    methods: {
        creadoEl(fecha) {
            const nuevaFecha = fecha.toLocaleString();
            return nuevaFecha;
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
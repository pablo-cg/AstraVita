<template>
    <div class="card" v-if="usuario">
        <h5 class="card-header text-light" style="background-color: slateblue">
            {{ usuario.nombre }}
        </h5>
        <div class="card-body d-flex">
            <div class="row">
                <div class="col-md-4">
                    <img :src="usuario.avatar_url" alt="avatar_usuario" class="img-fluid">
                </div>
                <div class="col-md-8">
                    <p>
                        ACA TENDRIA QUE IR LOS BOTONCITOS DE AMIGOS Y GRUPOS
                        QUIZAS?
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed:{
        ...mapState('usuarioStore',['usuario'])
    }
};
</script>

<style>
</style>
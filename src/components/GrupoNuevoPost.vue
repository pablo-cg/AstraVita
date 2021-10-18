<template>
    <div class="card" style="background-color: #ebe9f8">
        <h4 class="card-header row">
            <span class="text-center">¿Tienes algo que decir?</span>
        </h4>
        <div class="card-body">
            <vee-form :validation-schema="schema" @submit="publicarNuevoPost">
                <div class="mb-3">
                    <label class="form-label" for="comentario"
                        >Cuentanos:
                    </label>
                    <vee-field
                        type="textarea"
                        class="form-control"
                        name="comentario"
                        rows="5"
                        v-model="comentario"
                    />
                    <ErrorMessage
                        class="text-danger fw-bold"
                        name="comentario"
                    />
                </div>
                <div class="input-group mb-3">
                    <div class="form-check col mt-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            v-model="anonimo"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                            Publicar Anónimamente
                            <i class="fas fa-user-secret"></i>
                        </label>
                    </div>
                    <div class="col text-end">
                        <button type="submit" class="btn astra-btn-primario">
                            Publicar <i class="fas fa-comment"></i>
                        </button>
                    </div>
                </div>
            </vee-form>
        </div>
    </div>
</template>

<script>
import validationSchemas from "../includes/validationSchemas.js";
import { supabase } from "../includes/supabase";
import { mapState } from "vuex";

export default {
    data() {
        return {
            comentario: "",
            anonimo: false,
            schema: validationSchemas.comentarioEnGrupo,
        };
    },
    computed: {
        ...mapState("usuarioStore", ["usuario"]),
    },
    methods: {
        async publicarNuevoPost() {
            try {
                const { data: nuevoPost, error } = await supabase
                    .from("post")
                    .insert({
                        id_usuario: supabase.auth.user().id,
                        nombre_usuario: this.usuario.nombre,
                        es_anonimo: this.anonimo,
                        id_grupo: this.$route.params.id,
                        contenido: this.comentario,
                    });
                if (error) throw error;
                this.limpiarFormulario();
                this.$emit("nuevoPost", nuevoPost);
            } catch (error) {
                console.log(error);
            }
        },

        limpiarFormulario() {
            this.comentario = "";
            this.anonimo = false;
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
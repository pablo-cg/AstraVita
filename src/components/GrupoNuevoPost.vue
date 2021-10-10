<template>
    <div class="card">
        <h5 class="card-header row">¿Tienes algo que decir?</h5>
        <div class="card-body">
            <vee-form
                :validation-schema="schema"
                @submit="publicarNuevoComentario"
            >
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
                    <ErrorMessage class="text-danger" name="comentario" />
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
                        <button
                            type="submit"
                            class="btn text-light"
                            style="
                                background-color: slateblue;
                                border-color: slateblue;
                            "
                        >
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

export default {
    data() {
        return {
            comentario: "",
            anonimo: false,
            schema: validationSchemas.comentarioEnGrupo,
        };
    },
    methods: {
        publicarNuevoComentario() {
            console.log(this.comentario);
            console.log(`es anonimo: ${this.anonimo}`);
        },
    },
};
</script>

<style>
</style>
<template>
    <div class="text-light">
        <form class="mt-lg-5">
            <h1 class="display-5 fw-bold text-light text-center">
                ¡Bienvenido!
            </h1>
            <div class="mb-3">
                <label for="correo">Tu correo</label>
                <input
                    type="email"
                    class="form-control rounded-pill"
                    id="correo"
                    v-model="correo"
                    required
                />
            </div>
            <div class="mb-3">
                <label for="contrasena">Tu contraseña</label>
                <input
                    type="password"
                    class="form-control rounded-pill"
                    id="contrasena"
                    v-model="contrasena"
                    required
                />
            </div>
            <div class="row mb-3">
                <button
                    type="submit"
                    class="btn d-block text-light rounded-pill"
                    style="background-color: slateblue"
                >
                    Iniciar Sesión
                </button>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="gridCheck1"
                        />
                        <label class="form-check-label" for="gridCheck1">
                            Recuerdame
                        </label>
                    </div>
                </div>
                <!-- <div class="col-md-6 text-md-end">
                                <a href="http://" class="text-light">¿Olvidaste tu clave?</a>
                            </div> -->
            </div>
            <div class="row mb-3 text-light">
                <div class="col">
                    ¿No posees una cuenta?,
                    <router-link to="/registro" class="text-light"
                        >Registrate</router-link
                    >
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            correo: "",
            contrasena: "",
        };
    },
};
</script>

<style>
</style>
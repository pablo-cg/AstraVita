<template>
    <div class="d-flex justify-content-center">
        <div class="card" style="max-width: 600px">
            <h1 class="card-header text-center">
                Iniciar Sesión Administrador
            </h1>
            <div class="card-body">
                <div
                    class="alert alert-danger alert-dismissible fade show"
                    role="alert"
                    v-if="errorLogin"
                >
                    Usuario o contraseña incorrectos
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                </div>
                <form @submit.prevent="iniciarSesion" class="mb-3">
                    <div class="mb-3">
                        <label for="correo" class="form-label"
                            >Correo Electrónico</label
                        >
                        <input
                            type="email"
                            class="form-control"
                            id="correo"
                            v-model="correo"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="contrasena" class="form-label"
                            >Contraseña</label
                        >
                        <input
                            type="password"
                            class="form-control"
                            id="contrasena"
                            v-model="contrasena"
                        />
                    </div>
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="correo == '' || contrasena == ''"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            correo: "",
            contrasena: "",
            errorLogin: false,
        };
    },
    methods: {
        ...mapActions("usuarioStore", ["iniciarSesionAdmin"]),
        async iniciarSesion() {
            if (this.correo.includes("@astravita")) {
                try {
                    await this.iniciarSesionAdmin({
                        correo: this.correo,
                        contrasena: this.contrasena,
                    });
                    this.$router.push({ name: "Soporte" });
                } catch (error) {
                    this.errorLogin = true;
                }
            }
        },
    },
};
</script>
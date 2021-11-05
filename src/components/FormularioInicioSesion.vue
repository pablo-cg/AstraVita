<template>
    <div class="text-light">
        <vee-form class="mt-lg-5" :validation-schema="schema" @submit="login">
            <h1 class="display-5 fw-bold text-light text-center">
                ¡Bienvenido!
            </h1>
            <div class="mb-3">
                <label for="correo">Tu correo</label>
                <vee-field
                    type="email"
                    class="form-control rounded-pill"
                    name="correo"
                    v-model="correo"
                />
                <ErrorMessage class="text-danger" name="correo" />
            </div>
            <div class="mb-3">
                <label for="contrasena">Tu contraseña</label>
                <vee-field
                    type="password"
                    class="form-control rounded-pill"
                    name="contrasena"
                    v-model="contrasena"
                />
                <ErrorMessage class="text-danger" name="contrasena" />
            </div>
            <div class="row mb-3">
                <button
                    type="submit"
                    class="btn d-block text-light rounded-pill"
                    style="background-color: slateblue"
                    :disabled="loginEnCurso && !loginFallido"
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
            <div v-if="loginEnCurso || loginFallido">
                <div
                    class="
                        alert
                        d-flex
                        justify-content-center
                        mt-4
                        fw-bold
                        rounded-pill
                    "
                    :class="loginVarianteAlerta"
                    role="alert"
                >
                    {{ loginMensajeAlerta }}
                </div>
                <div class="d-flex justify-content-center" v-if="!loginFallido">
                    <div class="spinner-grow text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
            <div class="row mb-3 text-light" v-else>
                <div class="col">
                    ¿No posees una cuenta?,
                    <router-link :to="{ name: 'Registro' }" class="text-light"
                        >Registrate</router-link
                    >
                </div>
            </div>
        </vee-form>
    </div>
</template>

<script>
import validationSchemas from "../includes/validationSchemas.js";
import { mapActions } from "vuex";
import { supabase } from "../includes/supabase";
import suscripciones from "@/includes/suscripciones.js";

export default {
    data() {
        return {
            correo: "",
            contrasena: "",
            schema: validationSchemas.login,
            loginEnCurso: false,
            loginFallido: false,
            loginVarianteAlerta: "alert-primary",
            loginMensajeAlerta: "Iniciando Sesión",
        };
    },
    methods: {
        ...mapActions("usuarioStore", ["iniciarSesion"]),
        ...mapActions("cartaAstralStore", [
            "obtenerCartaAspectos",
            "obtenerGruposUsuario",
        ]),

        async login(values) {
            this.loginEnCurso = true;

            try {
                await this.iniciarSesion(values);
                this.obtenerCartaAspectos(supabase.auth.user().id);
                this.obtenerGruposUsuario(supabase.auth.user().id);
                await this.subListaAmigos();
            } catch (error) {
                this.loginEnCurso = false;
                this.loginFallido = true;
                this.loginVarianteAlerta = "alert-danger";
                this.loginMensajeAlerta = "Correo o contraseña incorrectos";
                return;
            }
            this.loginFallido = false;
            this.loginVarianteAlerta = "alert-success";
            this.loginMensajeAlerta = "Inicio de sesión correcto";
            this.$router.push("Inicio");
        },

        mostrarToast() {
            this.$toast.open({
                message: "Tienes solicitudes de amistad pendientes",
                type: "info",
            });
        },

        async subListaAmigos() {
            try {
                const sub = await supabase
                    .from(
                        `lista_amigo:id_usuario2=eq.${supabase.auth.user().id}`
                    )
                    .on("INSERT", () => {
                        this.mostrarToast();
                    })
                    .subscribe();
                    suscripciones.setSuscripcion(sub);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style>
</style>
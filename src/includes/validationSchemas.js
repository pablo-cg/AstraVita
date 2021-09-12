export default {
    registro: {
        nombre: "required|min:3|max:100|alpha_spaces",
        correo: "required|email|min:3|max:100",
        contrasena: "required|min:3|max:100",
        region: "required",
        comuna: "required",
        fHNacimiento: "fHNac_required",
        repetirContrasena: "contrasena_mismatch:@contrasena"
    },
    login: {
        correo: "required|email|min:3|max:100",
        contrasena: "required|min:3|max:100",
    }
}
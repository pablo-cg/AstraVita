export default {
    validadores: {
        nombre: "required|min:3|max:100|alpha_spaces",
        correo: "required|email|min:3|max:100",
        contrasena: "required|min:3|max:100",
        region: "required",
        comuna: "required",
        fHNacimiento: "required",
        repetirContrasena: "confirmed:@contrasena"
    },
}
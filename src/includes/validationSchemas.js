export default {
    registro: {
        nombre: "required|min:3|max:100|alpha_spaces",
        correo: "required|email|min:3|max:100",
        contrasena: "required|min:6|max:100",
        region: "required",
        ciudad: "required",
        fechaNac: "fNac_required",
        horaNac: "hNac_required",
        repetirContrasena: "contrasena_mismatch:@contrasena"
    },
    login: {
        correo: "required|email|min:3|max:100",
        contrasena: "required|min:6|max:100",
    },
    comentarioEnGrupo:{
        comentario: "comentarioRequerido"
    }
}
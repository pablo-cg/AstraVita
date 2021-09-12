import {
    Form as VeeForm,
    Field as VeeField,
    defineRule,
    ErrorMessage,
    configure
} from "vee-validate";
import {
    required,
    alpha_spaces as alphaSpaces,
    email,
    max,
    min,
    min_value as minValue,
    max_value as maxValue,
    confirmed
} from "@vee-validate/rules";

export default {
    install(app) {
        app.component("VeeForm", VeeForm);
        app.component("VeeField", VeeField);
        app.component("ErrorMessage", ErrorMessage);

        defineRule("alpha_spaces", alphaSpaces); //agregar pipe en el schema para poner mas de un rule
        defineRule("required", required);
        defineRule("email", email);
        defineRule("min", min);
        defineRule("max", max);
        defineRule("min_value", minValue);
        defineRule("max_value", maxValue);
        defineRule("contrasena_mismatch", confirmed);
        defineRule("fHNac_required", required);

        configure({
            generateMessage: (context) => {
                const mensajes = {
                    alpha_spaces: `El ${context.field} no puede contener números ni carácteres especiales`,
                    required: `Debes ingresar tu ${context.field}`,
                    fHNac_required: `Debes ingresar tu fecha y hora de nacimiento`,
                    email: `Debes ingresar un ${context.field} válido (ej: correo@dominio.com)`,
                    min: `El campo ${context.field} es muy corto`,
                    max: `El campo ${context.field} es muy largo`,
                    min_value: `El campo ${context.field} es muy bajo`,
                    max_value: `El campo ${context.field} es muy alto`,
                    contrasena_mismatch: `Tus contraseñas no coinciden`,
                };

                const mensaje = mensajes[context.rule.name] ? mensajes[context.rule.name] : `El campo ${context.field} es inválido`

                return mensaje;
            },
            validateOnBlur: true,
            validateOnChange: true,
            validateOnInput: false,
            validateOnModelUpdate: true,
        });
    },
};

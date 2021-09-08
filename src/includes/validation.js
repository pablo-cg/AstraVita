import {
    Form as VeeForm,
    Field as VeeField,
    defineRule,
    ErrorMessage,
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
        defineRule("confirmed", confirmed);
    },
};

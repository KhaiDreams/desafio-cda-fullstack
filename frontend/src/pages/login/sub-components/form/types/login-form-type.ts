import * as yup from "yup"
import { regexPassword } from "../../../../../utils/regex/regex";
export type InputsLogin = {
  credential: string;
  password: string;
};

export const SchemaLogin = yup.object().shape({
  credential: yup
    .string()
    .required("Este campo é obrigatório.")
    .lowercase("Sem CAPS LOCK.")
    .min(8, "Mínimo de 8 caracteres."),
  password: yup
    .string()
    .matches(regexPassword, "Formato incorreto.")
    .required("Este campo é obrigatório."),
});

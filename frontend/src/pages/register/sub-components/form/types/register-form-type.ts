import * as yup from "yup";
import { regexEmail, regexPassword } from "../../../../../utils/regex/regex";
export type InputsRegister = {
  username: string;
  email: string;
  password: string;
  repeat_password: string;
};

export const SchemaRegister = yup.object().shape({
  username: yup
    .string()
    .required("Este campo é obrigatório.")
    .lowercase("Sem CAPS LOCK.")
    .min(8, "Mínimo de 8 caracteres."),
  email: yup
    .string()
    .matches(regexEmail, "Formato incorreto.")
    .required("Este campo é obrigatório."),
  password: yup
    .string()
    .matches(regexPassword, "Formato incorreto.")
    .required("Este campo é obrigatório."),
  repeat_password: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas precisam ser iguais.")
    .required("Este campo é obrigatório."),
});

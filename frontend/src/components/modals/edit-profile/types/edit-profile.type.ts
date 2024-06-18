import * as yup from "yup";
import { regexEmail, regexPassword } from "../../../../utils/regex/regex";

export interface InputsEdit {
  fullname: string;
  username: string;
  email: string;
  password?: string;
  file?: FileList;
}

export const SchemaEdit = yup.object().shape({
  fullname: yup
    .string()
    .required("This field is required!")
    .min(8, "Minimum 8 characters required."),
  username: yup
    .string()
    .required("Este campo é obrigatório.")
    .lowercase("Sem CAPS LOCK.")
    .min(8, "Mínimo de 8 caracteres."),
  email: yup
    .string()
    .required("Este campo é obrigatório.")
    .matches(regexEmail, "Formato incorreto."),
  password: yup
    .string()
    .matches(regexPassword, "Formato incorreto.")
});


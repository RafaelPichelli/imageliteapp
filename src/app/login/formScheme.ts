import * as Yup from "yup"

export interface LoginForm {
    name?: string;
    email: string;
    password: string;
    passwordMatch: string;
}

export const formScheme: LoginForm = {email:"",name:"",password:"",passwordMatch:""}

export const validationScheme = Yup.object().shape({
    email: Yup.string().trim().required("Email é obrigatorio.").email("Email invalido."),
    password: Yup.string().required("Senha é obrigatoria.").min(8,"Deve ter no minimo 8 caracteres."),
    passwordMatch: Yup.string().oneOf([Yup.ref('password')], "Deve ser igual a senha.")
})
import * as Yup from 'yup'

export interface FormProps{
    name:string;
    tags:string;
    file:string | Blob;
}

export const formScheme: FormProps = {name: '', tags: '', file: ''}

export const formValidationScheme = Yup.object().shape({
    name: Yup.string().trim()
                .required('Nome é obrigatorio')
                .max(50, "Deve ter no maximo 50 caracteres"),
    tags: Yup.string().trim()
                .required('Tags é obrigatorio')
                .max(50, "Deve ter no maximo 50 caracteres"),
    file: Yup.mixed<Blob>().required("Escolha uma Imagem")
                .test('size', "Tamanho da Imagem não pode exceder 4 MB", (file) => {
                    return file.size < 20971520;
                })
                .test('type', "Formatos permitidos: PNG, JPEG, GIF ", (file) => {
                    return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
                })
            })
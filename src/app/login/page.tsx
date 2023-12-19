'use client'

import { Button, FieldError, InputText, RenderIf, Template, useNotification } from "@/components"
import { useState } from "react"
import { LoginForm, formScheme, validationScheme } from "./formScheme";
import { useFormik } from "formik";
import { useAuth } from "@/resources";
import { useRouter } from "next/navigation";
import { AccessToken, Credentials, User } from "@/resources/user/user.resource";


export default function Login() {

    const auth = useAuth();
    const notification = useNotification();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<boolean>(false);

    const {values, handleChange, handleSubmit, errors, resetForm} = useFormik<LoginForm>({
        initialValues: formScheme,
        validationSchema: validationScheme,
        onSubmit: onSubmit
    })

    async function onSubmit(values:LoginForm) {
        if (!newUser) {
            const credentials: Credentials = {email: values.email, password: values.password}
            try {
                const accessToken: AccessToken = await auth.authenticate(credentials);
                auth.initSession(accessToken);
                router.push("/galeria");
            } catch (error: any) {
                const message = error?.message;
                notification.notify(message,"error");
            }
        }else{

            const user: User = {email: values.email, name: values.name, password: values.password}
            
            try {
                await auth.save(user);
                notification.notify("Usuario criado com sucesso", "success")
                resetForm();
                setNewUser(false);
            } catch (error: any) {
                const message = error?.message;
                notification.notify(message,"error");
            }
        
        }   
    }


    return (
        <Template authenticated={false} loading={loading}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900">
                        { newUser ? "Crie Sua Conta" : "Faça o seu Login"}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <RenderIf condition={newUser}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Nome: </label>
                            </div>
                            <div className="mt-2">
                                <InputText style="w-full"
                                    id="name"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                <FieldError error={errors.name}/>
                            </div>
                        </RenderIf>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email: </label>
                        </div>
                        <div className="mt-2">
                            <InputText style="w-full"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <FieldError error={errors.email}/>
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Senha: </label>
                        </div>
                        <div className="mt-2">
                            <InputText type="password"
                                style="w-full"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            <FieldError error={errors.password}/>
                        </div>

                        <RenderIf condition={newUser}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Repita a Senha: </label>
                            </div>
                            <div className="mt-2">
                                <InputText type="password"
                                    style="w-full"
                                    id="passwordMatch"
                                    value={values.passwordMatch}
                                    onChange={handleChange}
                                />
                                <FieldError error={errors.passwordMatch}/>
                            </div>
                        </RenderIf>

                        <div>
                            <RenderIf condition={newUser}>
                                <Button type="submit" style="bg-indigo-700 hover:bg-indigo-500" label="Salvar"/>
                                <Button type="button" style="bg-red-700 hover:bg-red-500 mx-2" label="Cancelar" onClick={event => setNewUser(false)}/>
                            </RenderIf>
                                
                            <RenderIf condition={!newUser}>
                                <Button type="submit" style="bg-indigo-700 hover:bg-indigo-500" label="Entrar"/>
                                <Button type="button" style="bg-red-700 hover:bg-red-500 mx-2" label="Cadastrar" onClick={event => setNewUser(true)}/>
                            </RenderIf>
                        </div>

                    </form>
                </div>
            </div>

        </Template>
    )
}
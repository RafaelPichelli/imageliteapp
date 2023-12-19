'use client'

import { Template } from "@/components";

export default function NotFoundPage(){
    return(
        <Template authenticated={false}>
            <section>
                <h1 className="text-gray-900 text-xl text-center">Pagina Não Encontrada</h1>
            </section>
        </Template>
    )
}
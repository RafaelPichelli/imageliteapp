'use client'

import { Template, ImageCard, Button, InputText, useNotification, AuthenticatedPage } from "@/components"
import { useImageService } from "@/resources"
import { Image } from "@/resources/image/image.resource"
import { useState } from "react"
import Link from "next/link"

export default function GaleriaPage() {

    const useService = useImageService();
    const notification = useNotification();

    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('');
    const [extension, setExtension] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)

    async function searchImages() {
        setLoading(true);
        const result = await useService.buscar(query, extension);
        setImages(result);
        setLoading(false);

        if (!result.length) {
            notification.notify("Sem Resultados", "warning");
        }
    }

    function renderImageCard(image: Image) {
        return (
            <ImageCard key={image.url} nome={image.name}
                src={image.url}
                tamanho={image.size}
                extension={image.extension}
                dataUpload={image.uploadDate} />
        )
    }

    function renderImageCards() {
        return images.map(renderImageCard)
    }

    return (
        <AuthenticatedPage>
            <Template authenticated={true} loading={loading}>
                <section className="flex flex-col items-center justify-center my-5">
                    <div className="flex space-x-4">
                        <InputText placeholder="Digite Nome ou Tags" onChange={event => setQuery(event.target.value)} />
                        <select onChange={e => setExtension(e.target.value)} className="border px-4 py-2 rounded-lg text-gray-900">
                            <option value="">Todos os formatos</option>
                            <option value="PNG">PNG</option>
                            <option value="JPEG">JPEG</option>
                            <option value="GIF">GIF</option>
                        </select>
                        <Button onClick={searchImages} style="bg-blue-500 hover:bg-blue-200" label="Buscar" />
                        <Link href="/formulario">
                            <Button style="bg-yellow-500 hover:bg-yellow-200" label="Nova Imagem" />
                        </Link>
                    </div>
                </section>

                <section className="grid grid-cols-3  gap-8">
                    {
                        renderImageCards()
                    }
                </section>
            </Template>
        </AuthenticatedPage>

    )
}
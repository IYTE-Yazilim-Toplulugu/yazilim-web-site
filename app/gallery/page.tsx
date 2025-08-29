'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '@/components/loading';
import { getGalleryImages, getImagePath } from "@/utils/gallery_client_util";
import { GalleryImage } from "@/types/types_gallery";
import useHandleErrorCode from '@/components/handle-error-code';
import { useTranslations } from 'next-intl';

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const [page, setPage] = useState(1);

    const t = useTranslations('gallery')

    const handleErrorCode = useHandleErrorCode();

    async function loadImages(page: number) {
        const a = await getGalleryImages(page);
        const data = a.data ?? [];
        const success = data.length > 0;
        if (success) {
            setImages([...images, ...data]);
        }

        if (a.error) {
            console.error("Error while getting gallery images.", a.error);
            handleErrorCode(a.error.code)
        }
        setLoading(false);
        return success;
    }

    useEffect(() => {
        loadImages(page).then();
    }, [page]);

    const handleImageClick = (image: GalleryImage) => {
        setSelectedImage(image);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedImage(null);
    };

    const handleScroll = async () => {
        const scrolled = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;

        if (scrolled) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll);
        }
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <div className="flex flex-col items-center mb-8">
                <h1 className="text-4xl text-start self-start font-bold">{t('title')}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {images.map((image) => (
                    <div key={image.id} className="bg-[var(--color-gray-900)] rounded-lg shadow-lg overflow-hidden">
                        <div className="relative h-64 cursor-pointer" onClick={() => handleImageClick(image)}>
                            <Image
                                src={`${getImagePath(image)}`}
                                alt={image.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{image.title}</h2>
                            <p className="text-gray-600">{image.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                {t('uploaded')}: {new Date(image.uploaded_at!).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modalOpen && selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
                    onClick={handleCloseModal}>
                    <div className="relative max-w-3xl w-full mx-4" onClick={e => e.stopPropagation()}>
                        <button
                            className="absolute top-2 right-2 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-80"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <Image
                            src={`${getImagePath(selectedImage)}`}
                            alt={selectedImage.title}
                            width={900}
                            height={600}
                            className="w-full h-auto rounded-lg object-contain bg-white"
                        />
                        <div className="mt-4 text-center text-white">
                            <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                            <p>{selectedImage.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 

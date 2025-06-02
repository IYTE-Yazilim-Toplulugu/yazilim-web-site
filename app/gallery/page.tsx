'use client';

import { useEffect, useState } from 'react';
import { supabase, GalleryImage } from '@/lib/supabase';
import Image from 'next/image';
import GalleryUpload from '@/components/GalleryUpload';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    async function fetchGalleryImages() {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('uploaded_at', { ascending: false });

        if (error) throw error;
        setImages(data || []);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryImages();
  }, []);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {showUpload ? 'Hide Upload Form' : 'Upload New Image'}
        </button>
      </div>

      {showUpload && <GalleryUpload />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {images.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64 cursor-pointer" onClick={() => handleImageClick(image)}>
              <Image
                src={`${supabase.storage.from('gallery-images').getPublicUrl(image.file_path).data.publicUrl}`}
                alt={image.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{image.title}</h2>
              <p className="text-gray-600">{image.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Uploaded on: {new Date(image.uploaded_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={handleCloseModal}>
          <div className="relative max-w-3xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-80"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <Image
              src={`${supabase.storage.from('gallery-images').getPublicUrl(selectedImage.file_path).data.publicUrl}`}
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
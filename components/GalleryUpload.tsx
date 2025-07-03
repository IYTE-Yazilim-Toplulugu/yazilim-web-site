'use client';

import React, { useState } from 'react';
import { SectionHeader } from './ui/section-container';
import { GalleryImage } from "@/types/types_gallery";
import { getUser } from "@/utils/user_client_util";
import { toast } from "@/hooks/use-toast";
import GalleryUploadServer from "@/app/admin/(dashboard)/(admin)/gallery/(server)/gallery_upload";

interface GalleryUploadProps {
    className?: string;
    onUpload: (image: GalleryImage) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const GalleryUpload: React.FC<GalleryUploadProps> = ({
    onUpload,
    className,
    onClick
}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError('Please select an image to upload');
            return;
        }

        setUploading(true);
        setError(null);

        const user = await getUser();
        const result = await GalleryUploadServer({
            title: title,
            description: description,
            uploaderId: user?.id ?? "",
            file: file
        });

        if (result.error) {
            console.error(`Error uploading image(on: ${result.errorType}):`, result.error);
            setError('Error uploading image. Please try again.');
        }
        else {

            // Reset form
            setTitle('');
            setDescription('');
            setFile(null);
            onUpload(result.data);

            toast({
                title: 'Successful',
                variant: 'success',
                description: 'Image uploaded successfully.'
            });
        }
        setUploading(false);
    };

    return (
        <div onClick={onClick} className={className + " max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg"}>
            <SectionHeader titleClassName="p-1 text-2xl font-bold" title='Upload Image' />
            <form onSubmit={handleSubmit} className="space-y-4 ">
                <div>
                    <label className="block text-sm font-semibold">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 block w-full
                        rounded-md border border-border shadow-sm outline-none
                        focus:ring-bite-tongue focus:ring-1
                        dark:bg-background"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold">Description</label>
                    <textarea
                        value={description}
                        maxLength={400}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 p-2 block w-full
                        rounded-md border border-border
                        shadow-sm outline-none
                        focus:ring-bite-tongue focus:ring-1
                        dark:bg-background"
                        rows={6}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="mt-1 p-2 rounded-md block w-4/5 hover:bg-bite-tongue transition-colors duration-200"
                        required
                    />
                </div>
                {error && <p className="text-destructive text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-bite-tongue text-background py-2 px-4 rounded-md hover:bg-copper-coin focus:outline-none focus:ring-2 focus:ring-bite-tongue focus:ring-offset-2 disabled:opacity-50"
                >
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
            </form>
        </div>
    );
};

export default GalleryUpload;

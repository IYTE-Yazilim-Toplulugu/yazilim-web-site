'use client';

import { useState } from 'react';
import { createClient } from "@/lib/supabase/client";
import { SectionHeader } from './ui/section-container';

export default function GalleryUpload() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError('Please select an image to upload');
            return;
        }

        try {
            setUploading(true);
            setError(null);

            // Upload file to storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('gallery-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Create gallery entry
            const { error: insertError } = await supabase.from('gallery').insert({
                title,
                description,
                file_path: filePath,
                uploaded_at: new Date().toISOString(),
            });

            if (insertError) throw insertError;

            // Reset form
            setTitle('');
            setDescription('');
            setFile(null);
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', JSON.stringify(error));
            setError('Error uploading image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg">
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
} 

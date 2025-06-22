
export interface StatsResponse {
    id: number;
    answer: string;
}

export interface GalleryImage {
    id: number;
    title: string;
    description: string;
    uploaded_at: string;
    file_path: string;
    uploader_id: number;
};

export type Event = {
    slug: string;
    title: string; // max 255 karakter
    description: string;
    event_date: string; // ISO datetime string (ör: 2025-06-15T10:00:00)
    location: [number, number]; // [latitude, longitude]
    capacity_limit: number;
    is_online: boolean;
    registration_url?: string | null;
};

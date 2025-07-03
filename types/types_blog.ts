export interface Blog {
    id: number;
    author_id: string; // UUID format
    title: string;
    content: string;
    tags: string[];
    cover_image_url: string;
    is_published: boolean;
    published_at: string; // ISO datetime string (2025-06-15T10:00:00)
    created_at: string; // ISO datetime string (2025-06-15T10:00:00)
    updated_at: string; // ISO datetime string (2025-06-15T10:00:00)
}

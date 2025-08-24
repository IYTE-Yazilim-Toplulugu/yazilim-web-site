export interface Announcement {
    id: number; // UUID format
    event_id: number; // UUID format
    title: string; // max 255 characters
    description: string; // max 1000 characters
    image_path: string; // URL format (e.g., https://example.com/image.jpg)
    expires_at: string; // ISO datetime string (e.g., 2025-06-15T10:00:00)
    published_at: string; // ISO datetime string (e.g., 2025-06-15T10:00:00)
    created_at: string; // ISO datetime string (e.g., 2025-06-15T10:00:00)
    link_url: string;
}

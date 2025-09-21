export type Event = {
    id: number;
    title: string;
    description: string;
    event_date: string;
    location_name: string;
    location: [number, number];
    capacity: number;
    is_online: boolean;
    registration_url?: string | null;
    published_at: string | null;
    is_published: boolean;
    created_at: string;
    image_url?: string | null;
};

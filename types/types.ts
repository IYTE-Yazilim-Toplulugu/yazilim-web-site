
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

export interface QuestionFill {
    survey_id: number;
    question_id: string;
    type: string;
    answer: string | number | boolean | null;
}

export type Event = {
    id: number;
    title: string; // max 255 karakter
    description: string;
    event_date: string; // ISO datetime string (ör: 2025-06-15T10:00:00)
    location: [number, number]; // [latitude, longitude]
    capacity_limit: number;
    is_online: boolean;
    registration_url?: string | null;
};


interface Survey {
    id: number;
    title: string;
    icon: string;
    description: string;
    release_date: string; // ISO datetime string (ör: 2025-06-15T10:00:00)
    requirements?: { // WTF is that bro
        type: number; // 0: public, 1: private, 2: members only
    } | null;
    questions: Question[];
}

interface Question {
    id: string; // UUID format
    type: string; // "text", "number", "boolean", "select", "multi-select"
    question: string; // soru metni
    options?: any[]; // sadece "select" ve "multi-select" tipleri için
    placeholder?: string; // sadece "text" ve "number" tipleri için
}

export interface SurveyGET {
    code: number;
    message: string | null;
    surveys: Survey[];
}



export interface StatsResponse {
    id: number;
    answer: string;
}

export interface QuestionFill {
    survey_id: number;
    question_id: number;
    type: number;
    answer: string | number | boolean | (string | number | boolean)[] | null;
}

export type AnswerHandlerProps = {
    survey_id: number,
    question_id: number,
    type: number,
    answer: string | number | boolean
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


export interface Survey {
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

export interface Question {
    id: number; // UUID format
    type: number; // "text", "number", "boolean", "select", "multi-select"
    required: boolean; // true veya false
    question: string; // soru metni
    options?: any[]; // sadece "select" ve "multi-select" tipleri için
    placeholder?: string; // sadece "text" ve "number" tipleri için
}


export interface NavbarProps {
    href: string;
    pathname: string;
    children: React.ReactNode;
    className?: string;
}

export type blog = {

    id: number;
    slug: string;
    title: string;
    content: string;
    cover_image_url: string;
}

export type HexColor = `#${string}`;
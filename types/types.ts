
export interface StatsResponse {
    id: number;
    answer: string;
}

export interface QuestionFill {
    survey_id: number;
    question_id: number;
    question: string,
    type: number;
    answer: string | number | boolean | (string | number | boolean)[] | null;
}

export interface SurveyAnswers {
    id: number;
    user_id: number; // UUID format
    user_name: string;
    survey_id: number;
    answered_at: string; // ISO datetime string (2025-06-15T10:00:00)
    answers: {
        question_id: number; // UUID format
        question: string;
        answer: string | number | boolean | (string | number | boolean)[] | null;
    }[];
}

export type AnswerHandlerProps = {
    survey_id: number,
    question_id: number,
    question: string,
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
    icon: number;
    description: string;
    image_path: string; // URL format (https://example.com/image.jpg)
    created_at: string; // ISO datetime string (2025-06-15T10:00:00)
    requirements?: {
        type: number; // 0: public, 1: student, 2: special, 3: admin, 4: student_or_special
        events: number[] // filled with event id
    } | null;
    is_active: boolean;
    is_anonym: boolean;
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



export type HexColor = `#${string}`;

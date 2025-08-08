import { HexColor } from "@/types/types";

export interface HomeHeroConfig {
    up_header: {
        title: string;
        color: string; // HexColor
    };
    header: string;
    description: string;
    workspaces: {
        content: string;
        color: HexColor;

    }[];
    links: {
        icon: number; // int32
        color: HexColor;
        url: string;
    }[];
}

export interface HomeAboutUsConfig {
    title: string;
    description: string;
    left_content: {
        name: string;
        title?: string;
        subtitle?: string;
        icon?: number; // int32
        image?: string;
    }[];
    right_content: {
        title: string;
        description1: string;
        description2: string;
        events: {
            content: string;
            icon: number; // int32
            color: HexColor;
        }[];
        link: {
            title: string;
            url: string;
        };
    };
}

export interface HomeFooterConfig {
    left_content: {
        title: string;
        description: string;
        links: {
            icon: number; // int32
            color: HexColor;
            url: string;
        }[];
    };
    quick_links: {
        title: string;
        url: string;
    }[];
    contact_info: {
        title: string;
        icon: number;
        url?: string;
    }[];
    newsletter: {
        description: string;
        placeholder: string;
        terms: string;
    };
    all_rights_reserved: string;
}

export type GeneralContactConfig = {
    location_text: string,
    location_url: string,
    email: string,
    work_span: string,
    phone: string
};

export type ContactConfig = {
    title: string,
    description: string
};

export interface Object {
    id: number;
    key: string;
    value: any;
}

export type Configuration = Object;

export type UserInfo = {
    id: string,
    full_name: string,
    place: string | undefined,
    email: string | undefined,
    phone: string,
    school_number: string | undefined,
    department: number | undefined,
    updated_at: string | undefined,
    created_at: string,
    receives_emails: boolean,
    is_admin: boolean,
    is_special: boolean,
    is_student: boolean,
    from_iztech: boolean
};
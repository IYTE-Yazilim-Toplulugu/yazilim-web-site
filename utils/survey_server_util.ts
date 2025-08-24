'use server';
import supabase from "@/lib/supabase/supabase";
import { QuestionFill, Survey } from "@/types/types";
import { User, UserMetadata } from "@supabase/supabase-js";

export async function getSurveysAdmin(page: number, query?: string) {
    page--;
    if (page < 0) page = 0;

    let q = supabase
        .from("surveys")
        .select<"*", Survey>("*", {
            count: "exact"
        });

    if (query && query.length > 0) {
        if (!query.startsWith("%") && !query.endsWith("%"))
            query = `%${query}%`;
        q = q.ilike('title', query);
    }

    const { data, error, count } = await q
        .order("id", {
            ascending: true,
        })
        .range(page * 10, (page + 1) * 10 - 1);

    if (error) {
        return { data: null, pageCount: null, error: error };
    }
    return {
        data: data || [],
        pageCount: !count ? 1 : Math.ceil(count / 10),
        error: null
    };
}

export async function getSurveys(answeredSurveys: QuestionFill[] | null, is_active: boolean, user: User | null) {
    let query = supabase
        .from("surveys")
        .select<"*", Survey>();

    if (is_active) {
        query = query.eq("is_active", true);
    }
    const userInfo = user?.user_metadata ?? null

    const filters = getRequirementFilters(userInfo);
    if (filters.length > 0) {
        query = query.or(filters.join(','));
    }

    if (answeredSurveys && answeredSurveys.length > 0) {
        const ids = answeredSurveys.map(s => s.survey_id).join(",");
        query = query.not("id", "in", `(${ids})`);
    }

    const { data, error } = await query;
    return {
        data: data || [],
        error
    };
}

export async function getFormCount() {
    const { count, error } = await supabase
        .from("survey_answers")
        .select("*", { count: "exact", head: true }); // `head: true` means return only headers, not data

    if (error) {
        return 0;
    }
    return count || 0;
}

function getRequirementFilters(userMetadata: UserMetadata | null): string[] {
    const filters = new Set<string>();

    const isStudent = userMetadata?.isStudent;
    const isAdmin = userMetadata?.isAdmin;
    const isSpecial = userMetadata?.isSpecial;

    filters.add("requirements->>type.is.null");
    if (!userMetadata) return Array.from(filters);

    [0, 1, 2, 3, 4].forEach(page => {
        let b = false;

        if (isAdmin || page == 0) {
            b = true;
        }
        if (!b && isStudent && (page == 1 || page == 3)) {
            b = true;
        }
        if (!b && isSpecial && (page == 2 || page == 3)) {
            b = true;
        }
        if (b) {
            filters.add(
                `requirements->>type.eq.${page}`
            );
        }
    });

    return Array.from(filters);
}

export async function getSurveyAnswers(surveys: Survey[]) {
    const surveyIds = surveys.map(s => s.id);

    const { data, error } = await supabase
        .from("survey_answers")
        .select("*")
        .in("survey_id", surveyIds)


    if (error) {
        return { data: null, error: error };
    }
    return {
        data: data || [],
        error: null
    }
}

export async function getSurvey(id: number) {
    try {
        const { data, error } = await supabase
            .from("surveys")
            .select<"*", Survey>()
            .eq("id", id)

        if (error) {
            return { "data": null, "error": error };
        }
        return { "data": data && data.length >= 1 ? data[0] : null, "error": null };
    } catch (error) {
        return { "data": null, "error": error };
    }
}

export async function updateSurvey(surveyData: Survey) {
    const id = surveyData.id;
    if (!id || typeof id !== "number") {
        return { "data": null, "error": { code: '23503', message: "Invalid survey ID" } };
    }

    const { data, error } = await supabase
        .from("surveys")
        .update(surveyData)
        .eq("id", id)
        .select()

    if (data && data.length > 0) {
        return { "data": data[0], "error": null };
    }
    return { "data": null, "error": error || { code: null, message: "Unknown error occurred" } };
}

export async function createSurvey(surveyData: Survey) {

    const { data, error } = await supabase
        .from("surveys")
        .insert(surveyData)
        .select();

    if (data && data.length > 0) {
        return { "data": data[0], "error": null };
    }
    return { "data": null, "error": error || { code: null, message: "Unknown error occurred" } };
}


export async function deleteSurvey(id: number) {
    const { error } = await supabase
        .from("surveys")
        .delete()
        .eq("id", id)
        .select("*");

    // @ts-ignore
    if (error) {
        return { "success": false, error };
    }
    return { "success": true };
}

export async function uploadImage(file: File) {
    const ext = file.name.split('.').pop();
    const fileName = `${(Math.random() + 1) * (10 ** 16)}.${ext}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
        .from("survey-images")
        .upload(filePath, file);

    if (error) {
        return { "filepath": null, "error": error };
    }
    return {
        "filepath": filePath,
        "error": null,
    }
}


export async function hasSubmittedCheck(surveyId: number | null, ip: string) {
    const hasSubmitted = await supabase
        .from("survey_answers")
        .select("user_ip")
        .eq("survey_id", surveyId)
        .eq("user_ip", ip)

    // @ts-ignore
    if (hasSubmitted.data.length > 0) {
        return { error: '23505' }
    }
    return { error: null }
}

export async function getAnsweredSurveys(userId: string, ip: string) {
    const { data, error } = await supabase
        .from("survey_answers")
        .select("*")
        .or(`user_id.eq.${userId},user_ip.eq.${ip}`);

    return {
        data: data || [],
        error,
    };
}

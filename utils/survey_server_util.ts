// import { createServer } from "@/lib/supabase/server";
import supabase from "@/lib/supabase/supabase";
import { Survey } from "@/types/types";

export async function getSurveys(page: number, query?: string) {
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





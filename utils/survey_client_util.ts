import { QuestionFill, Survey } from "@/types/types";
import { createClient } from "@/lib/supabase/client";


async function getSurveys(answeredSurveys: QuestionFill[] | null, is_active: boolean) {
    let query = createClient()
        .from("surveys")
        .select<"*", Survey>();

    if (is_active) {
        query = query.eq("is_active", true);
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

export function getSurveyImagePath(image_path: string) {
    return createClient().storage
        .from('survey-images')
        .getPublicUrl(image_path)
        .data.publicUrl;
}

async function postSurveyAnswer(
    userId: string,
    surveyId: number | null,
    answers: any,
    ip: string
) {
    const { error } = await createClient()
        .from("survey_answers")
        .insert({
            user_id: userId,
            survey_id: surveyId,
            answered_at: new Date().toISOString(),
            answers: answers,
            user_ip: ip
        })
    return { error };
}

async function getAnsweredSurveys(userId: string) {
    const { data, error } = await createClient()
        .from("survey_answers")
        .select<"*", QuestionFill>()
        .eq("user_id", userId)

    return {
        data: data || [],
        error
    }
}

export { getSurveys, postSurveyAnswer, getAnsweredSurveys };

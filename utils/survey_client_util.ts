import { QuestionFill } from "@/types/types";
import { createClient } from "@/lib/supabase/client";


export function getSurveyImagePath(image_path: string) {
    return createClient().storage
        .from('survey-images')
        .getPublicUrl(image_path)
        .data.publicUrl;
}

export async function postSurveyAnswer(
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

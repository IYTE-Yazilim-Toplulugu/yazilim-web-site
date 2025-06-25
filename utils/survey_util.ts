import { createClient } from '@/lib/supabase/client'

export async function submitSurveyAnswers(
    survey_id: number,
    answers: { question_id: string, option_id: string | number | boolean | null }[]
) {
    const supabase = createClient();

    const user = await supabase.auth.getUser();
    const user_id = user.data?.user?.id;

    const { error } = await supabase.from('survey_answers').insert([
        {
            user_id,
            survey_id,
            answered_at: new Date().toISOString(),
            answers,
        }
    ]);

    return error ? { error } : { success: true };
}

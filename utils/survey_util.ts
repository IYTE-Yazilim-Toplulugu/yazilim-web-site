import { createClient } from '@/lib/supabase/client'

export async function submitSurveyAnswers(
    survey_id: number,
    answers: { question_id: string, options: string[] | number[] | boolean | null, contenct: string }[]
) {
    const supabase = createClient();

    const user = await supabase.auth.getUser();
    const user_id = user.data?.user?.id;
    console.log('User ID:', user_id);

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

'use server';
import { QuestionFill } from "@/types/types";
import { getSurveys } from "@/utils/survey_server_util";
import { User } from "@supabase/supabase-js";

export default async function surveysGet(answeredSurveys: QuestionFill[] | null, is_active: boolean, user: User | null) {
    return await getSurveys(answeredSurveys, is_active, user);
}

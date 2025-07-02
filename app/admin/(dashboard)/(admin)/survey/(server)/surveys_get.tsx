'use server'
import { Survey } from "@/types/types";
import { getSurveys, getSurveyAnswers } from "@/utils/survey_server_util";

export default async function SurveysAll(page: number, query?: string) {
    return getSurveys(page, query)
}

export async function SurveyAnswersAll(surveys: Survey[]) {
    return getSurveyAnswers(surveys);
}

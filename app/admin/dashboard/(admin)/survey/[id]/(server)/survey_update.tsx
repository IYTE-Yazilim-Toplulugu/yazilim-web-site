'use server';
import { Survey } from "@/types/types";
import { updateSurvey } from "@/utils/survey_server_util";

export default async function SurveyUpdate(surveyData: Survey) {
    return updateSurvey(surveyData);
}

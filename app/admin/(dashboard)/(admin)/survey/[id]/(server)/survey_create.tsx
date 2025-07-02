import { Survey } from "@/types/types";
import { createSurvey } from "@/utils/survey_server_util";


export default async function SurveyCreate(surveyData: Survey) {
    return createSurvey(surveyData);
}

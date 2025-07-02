import { QuestionFill, Survey } from "@/types/types";
import { createClient } from "@/lib/supabase/client";
import { User, UserMetadata } from "@supabase/supabase-js";


async function getSurveys(answeredSurveys: QuestionFill[] | null, is_active: boolean, user: User) {

    let query = createClient()
        .from("surveys")
        .select<"*", Survey>();
    if (is_active) {
        query = query.eq("is_active", true);
    }
    const userInfo = user?.user_metadata

    if (!user) {
        // query = query.or('requirements.type.is.null');
        return { data: [], error: null };
    } else {
        const filters = getRequirementFilters(userInfo);
        if (filters.length > 0) {
            query = query.or(filters.join(','));
        }
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

function getRequirementFilters(userMetadata: UserMetadata): string[] {
    const filters = new Set<string>();
    console.log("User metadata", userMetadata);

    if (!userMetadata) return [];

    if (userMetadata.isStudent) {
        filters.add('requirements->>type.is.null');
        filters.add('requirements->>type.eq.0');
        filters.add('requirements->>type.eq.1');
    }
    if (userMetadata.isSpecial) {
        filters.add('requirements->>type.is.null');
        filters.add('requirements->>type.eq.0');
        filters.add('requirements->>type.eq.2');
    }
    if (userMetadata.isAdmin) {
        filters.add('requirements->>type.is.null');
        filters.add('requirements->>type.eq.0');
        filters.add('requirements->>type.eq.1');
        filters.add('requirements->>type.eq.2');
        filters.add('requirements->>type.eq.3');
    }

    return Array.from(filters);
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

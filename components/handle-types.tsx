

// 0: yes_no, 1: single_choice, 2: number, 3: text, 4: multiple_choice, 5: rating, 6: checkbox, 7: date, 8: dropdown
export function handleQuestionType(questionType: number) {
    switch (questionType) {
        case 0:
            return "0 • Yes/No";
        case 1:
            return "1 • Single Choice";
        case 2:
            return "2 • Number";
        case 3:
            return "3 • Text";
        case 4:
            return "4 • Multiple Choice";
        case 5:
            return "5 • Rating";
        case 6:
            return "6 • Checkbox";
        case 7:
            return "7 • Date";
        case 8:
            return "8 • Dropdown";
        // case 9:
        //     return "File Upload";
    }
}
// 0: public, 1: student, 2: special, 3: admin
export function handleSurveyType(surveyType: number) {
    switch (surveyType) {
        case 0:
            return "Public";
        case 1:
            return "Students";
        case 2:
            return "Specials";
        case 3:
            return "Admins";
    }
}

export function handleEventName(eventName: string) {

}

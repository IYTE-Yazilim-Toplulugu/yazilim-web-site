"use client";
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Circle, X } from 'lucide-react';

import { SurveyData } from '@/lib/pseudo';
import { SectionHeader } from '@/components/ui/section-container';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Loading from '@/components/loading';
import DatePicker from '@/components/datepicker';
import { Dropdown } from '@/components/dropdown';
import useHandleErrorCode from '@/components/handle-error-code';
import { HandleIcon } from '@/components/handle-icons';
import { toast } from '@/hooks/use-toast';
import { getUser, getUserIp } from '@/utils/user_client_util';
import { QuestionFill, AnswerHandlerProps, Question, Survey } from '@/types/types';
import { postSurveyAnswer, getSurveyImagePath } from '@/utils/survey_client_util';
import YazilimBlankPage from '@/components/blank-page';
import Image from 'next/image';
import { User } from '@supabase/supabase-js';
import surveysGet from './(server)/surveys_get';
import checkHasSubmitted from './(server)/survey_check';
import answeredSurveysGet from './(server)/answers_get';
import { useTranslations } from 'next-intl';

export default function SurveyPage() {
    const containerRef = useRef(null);
    // const [mouse, setMouse] = useState({ x: 0, y: 0 });

    const [surveyData, setSurveyData] = useState<Survey[]>(SurveyData); // Survey GET Response
    const [surveyFill, setSurveyFill] = useState<QuestionFill[]>([]); // Survey Request array

    // Handler variables
    const [focusedId, setFocusedId] = useState<number | null>(null);
    const [answeredSurveys, setAnsweredSurveys] = useState<QuestionFill[] | null>();
    const currentSurvey = surveyData.find((s) => s.id === focusedId);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<Record<number, string>>({});

    const [userInfo, setUserInfo] = useState<any>(null);

    const t = useTranslations('forms')

    const handleErrorCode = useHandleErrorCode();


    useEffect(() => {
        getUser()
            .then((user) => {
                setUserInfo(user);
                return user;
            })
            .then((user): Promise<{ user: User | null; data: QuestionFill[] | null }> => {
                if (!user) {
                    return Promise.resolve({ user: null, data: null });
                }

                return getAnsweredSurveyData(user.id).then((data) => ({
                    user,
                    data: data ?? null
                }));
            })
            .then((result) => {
                return fetchSurveyData(result);
            })
            .catch((error) => {
                console.error("Error fetching forms data:", error);
                handleErrorCode(error.code);
            });
    }, [focusedId]);

    const fetchSurveyData = async (result: { user: User | null, data: QuestionFill[] | null }) => {
        try {
            surveysGet(result?.data, true, result?.user)
                .then(x => {
                    if (x.data) {
                        setSurveyData(x.data);
                    } else {
                        console.error("Error fetching forms data:", x.error);
                        handleErrorCode(x.error?.code || "");
                    }
                })
                .then(() => setLoading(false))
        } catch (error) {
            console.error("Unexpected error while fetching forms data:", error);
        }
    }

    const postSurveyData = async () => {
        try {
            const answers = surveyFill.map(({ survey_id, type, ...rest }) => rest);
            const ip: string = await getUserIp();

            checkHasSubmitted(focusedId, ip).then((hasSubmitted) => {
                if (hasSubmitted.error) {
                    handleErrorCode(hasSubmitted.error)
                    setFocusedId(null);
                    return;
                }
                postSurveyAnswer(userInfo?.id, userInfo?.user_metadata.fullName, focusedId, answers, ip)
                    .then(x => {
                        if (x.error) {
                            console.error("Error submitting form answers:", x.error);
                            handleErrorCode(x.error.code);
                        } else {
                            toast({
                                title: t('submit_success.title'),
                                description: t('submit_success.desc'),
                                variant: "success",
                            })
                            setFocusedId(null);
                        }
                    })
            })
        } catch (error) {
            console.error("Unexpected Error", error);
            toast({
                title: t('submit_error.title'),
                description: t('submit_error.desc'),
                variant: "destructive",
            })
        }
    }

    // Not working properly
    const getAnsweredSurveyData = async (userId: string | null) => {
        try {
            if (!userId) return null;
            const ip: string = await getUserIp();

            return answeredSurveysGet(userId, ip)
                .then(x => {
                    if (x.data && x.data.length > 0) {
                        setAnsweredSurveys(x.data);
                        return x.data;
                    }
                    if (x.error) {
                        console.error("Error fetching form answers:", x.error);
                        handleErrorCode(x.error.code);
                    }
                    return null;
                })
        } catch (error) {
            console.error("Unexpected error while fetching answered form:", error);
            toast({
                title: t('fetch_error.title'),
                description: t('fetch_error.desc'),
                variant: "destructive",
            })
        }

    }



    useEffect(() => {
        if (!focusedId) {
            setSurveyFill([]);
        }
    }, [focusedId])


    const addAnswer = ({ survey_id, question_id, question, type, answer }: AnswerHandlerProps) => {
        try {
            if (surveyFill.some((item) => item.question_id === question_id)) {
                setSurveyFill((prevState) => [...prevState.filter((item) => item.question_id !== question_id)]);
            }
            setSurveyFill((prevState) => {
                return [
                    ...prevState,
                    {
                        survey_id: survey_id,
                        question_id: question_id,
                        question: question,
                        type: type,
                        answer: answer,
                    },
                ]
            })
        } catch (error) {
            console.error("Error adding answer:", error);
        }
    }


    const addMultipleAnswer = ({ survey_id, question_id, question, type, answer }: AnswerHandlerProps) => {
        setSurveyFill((prevState) => {
            const existing = prevState.find(
                (item) => item.question_id === question_id
            );

            if (existing) {
                return prevState.map((item) =>
                    item.question_id === question_id
                        ? {
                            ...item,
                            answer: [...(item.answer as (string | number | boolean)[]), answer],
                        }
                        : item
                );
            } else {

                return [
                    ...prevState,
                    {
                        survey_id,
                        question_id,
                        question,
                        type,
                        answer: [answer],
                    },
                ];
            }
        });
    };


    const removeMultipleAnswer = ({ question_id, answer }: AnswerHandlerProps) => {
        setSurveyFill((prevState) => {
            return prevState
                .map((item) => {
                    if (item.question_id === question_id) {
                        const filteredAnswers = (item.answer as (string | number | boolean)[]).filter(
                            (a) => a !== answer
                        );

                        if (filteredAnswers.length === 0) return null;

                        return {
                            ...item,
                            answer: filteredAnswers,
                        };
                    }
                    return item;
                })
                .filter((item): item is QuestionFill => item !== null); // Remove nulls
        });
    }


    // 0: yes_no, 1: single_choice, 2: number, 3: text, 4: multiple_choice, 5: rating, 6: checkbox, 7: date, 8: dropdown
    // Form Handling
    const HandleQuestions = (survey_id: number, question_id: number, question: string, type: number, options?: (number | string)[], placeholder?: string) => {
        switch (type) {
            case 0: // yes_no
                return (
                    <section className="flex flex-row gap-8">
                        <Button variant="outline"
                            onClick={() => !isAnswered(question_id, true)
                                ? addAnswer({
                                    survey_id,
                                    question_id,
                                    question,
                                    type,
                                    answer: true
                                })
                                : setSurveyFill((prevState) => {
                                    return prevState.filter((item) => item.question_id !== question_id)
                                })
                            }
                            className={`group p-2 m-2 flex flex-row space-x-4
                            rounded-lg bg-succulent/40 hover:bg-succulent/80
                            ${isAnswered(question_id, true) ? "bg-succulent text-background dark:text-primary" : ""}
                            cursor-pointer`}>
                            <p>Yes</p>
                            <Check className={`text-succulent transition-colors dark:group-hover:text-primary
${isAnswered(question_id, true) ? "text-background dark:text-primary" : ""}`} />
                        </Button >
                        <Button variant="outline"
                            onClick={() => !isAnswered(question_id, false)
                                ? addAnswer({
                                    survey_id,
                                    question_id,
                                    question,
                                    type,
                                    answer: false
                                })
                                : setSurveyFill((prevState) => {
                                    return prevState.filter((item) => item.question_id !== question_id)
                                })
                            }
                            className={`group p-2 m-2 flex flex-row space-x-4
                            rounded-lg bg-destructive/40 hover:bg-destructive/80 
                            ${isAnswered(question_id, false) ? "bg-destructive text-background dark:text-primary" : ""}
                            cursor-pointer`}>
                            <p>No</p>
                            <X className={`text-destructive-foreground transition-colors group-hover:text-background dark:group-hover:text-primary
                                ${isAnswered(question_id, false) ? "text-background dark:text-primary" : ""}`} />
                        </Button>
                    </section >
                )
            case 1: // single_choice
                return (
                    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {options?.map((option, i) => {
                            const isSelected = isAnswered(question_id, option);
                            return (
                                <div
                                    key={i}
                                    onClick={() => {
                                        !isSelected
                                            ? addAnswer({
                                                survey_id,
                                                question_id,
                                                question,
                                                type,
                                                answer: option
                                            })
                                            : setSurveyFill((prevState) => {
                                                return prevState.filter((item) => item.question_id !== question_id)
                                            })
                                    }}
                                    className={`pt-4 flex flex-row gap-4 w-fit items-center rounded-md transition-colors cursor-pointer `}
                                >
                                    <Circle className={`w-6 h-6 transition-all ${isSelected ? "bg-muted-foreground rounded-full" : ""}`} />
                                    <Button variant="outline" className='cursor-pointer '>
                                        {option}
                                    </Button>
                                </div>
                            )
                        })}
                    </section>
                )
            case 2: // number
                const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value.trim();

                    const MIN_INT32 = 0;
                    const MAX_INT32 = 4294967295;

                    const numeric = Number(value);

                    // Just for reliability
                    if (Number.isNaN(numeric) || !Number.isInteger(numeric)) {
                        console.warn("Invalid input: not an integer.");
                        return;
                    }
                    if (numeric < MIN_INT32 || numeric > MAX_INT32) {
                        console.warn("Value is out of 32-bit integer range.");
                        return;
                    }

                    setSurveyFill((prevState) => {
                        const exists = prevState.some((item) => item.question_id === question_id);
                        const updatedAnswer: QuestionFill = {
                            survey_id,
                            question_id,
                            question,
                            type,
                            answer: numeric,
                        };

                        return exists
                            ? prevState.map((item) =>
                                item.question_id === question_id ? updatedAnswer : item
                            )
                            : [...prevState, updatedAnswer];
                    });
                };
                return (
                    <section className='p-2' >
                        <Input
                            placeholder={placeholder}
                            type="number"
                            inputMode="numeric"
                            min={0}
                            max={4294967295}
                            step={1}
                            value={surveyFill.find((item) => item.question_id === question_id)?.answer?.toString() ?? ""}
                            onChange={(e) => handleNumberChange(e)}
                            onFocus={(e) => {
                                if (e.currentTarget.value === "") {
                                    e.currentTarget.value = "0";
                                    handleNumberChange({ target: e.currentTarget } as React.ChangeEvent<HTMLInputElement>);
                                }
                            }}
                            onWheel={(e) => e.currentTarget.blur()}
                            onPaste={(e) => {
                                const pasted = e.clipboardData.getData("text");
                                if (!/^\d+$/.test(pasted)) {
                                    e.preventDefault();
                                }
                            }}
                            className="border border-border rounded-lg p-2"
                        />
                    </section >
                )
            case 3: // text
                return (
                    <section className='p-2' >
                        <textarea
                            name="text-area"
                            rows={3}
                            maxLength={400}
                            placeholder={placeholder}
                            value={surveyFill.find((item) => item.question_id === question_id)?.answer?.toString() || ""}
                            inputMode="text"
                            onChange={(e) => {
                                const newNote = e.target.value;
                                if (newNote === "") {
                                    setSurveyFill(prev => {

                                        return prev.filter(item => item.question_id !== question_id);
                                    })
                                }
                                if (surveyFill.find(item => item.question_id === question_id)) {
                                    setSurveyFill(prev => {
                                        return prev.map(item =>
                                            item.question_id === question_id
                                                ? { ...item, answer: newNote }
                                                : item
                                        )
                                    });
                                } else {
                                    setSurveyFill(prev => {
                                        return [...prev,
                                        {
                                            survey_id: survey_id,
                                            question_id: question_id,
                                            question: question,
                                            type: type,
                                            answer: newNote
                                        }]
                                    })
                                }


                            }}
                            className="w-full bg-background outline-none border border-border rounded-lg p-2"
                        />
                    </section >
                )
            case 4: // multiple_choice
                return (
                    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {options?.map((option, i) => {
                            const isSelected = isAnswered(question_id, option);
                            return (
                                <div
                                    key={i}
                                    onClick={() => {
                                        !isSelected
                                            ? addMultipleAnswer({
                                                survey_id,
                                                question_id,
                                                question,
                                                type, answer: option
                                            })
                                            : removeMultipleAnswer({
                                                survey_id,
                                                question_id,
                                                question,
                                                type, answer: option
                                            })
                                    }}
                                    className={`pt-4 flex flex-row gap-4 w-fit items-center rounded-md transition-colors cursor-pointer `}
                                >
                                    <Checkbox checked={isSelected} className={`transition-all duration-300`} />
                                    <Button variant="outline" className='cursor-pointer '>
                                        {option}
                                    </Button>
                                </div>
                            )
                        })}
                    </section>
                )
            case 5: // rating
                const size = options ? Number(options[options.length - 1]) : 5;
                return (
                    <section className='flex flex-wrap items-center justify-start gap-4'>
                        {Array.from({ length: size }).map((_, id) => {
                            const isSelected = isAnswered(question_id, id + 1);
                            return (
                                <div
                                    key={id + 1}
                                    onClick={() => {
                                        !isSelected
                                            ? addAnswer({
                                                survey_id,
                                                question_id,
                                                question,
                                                type,
                                                answer: id + 1
                                            })
                                            : setSurveyFill((prevState) => {
                                                return prevState.filter((item) => item.question_id !== question_id)
                                            })
                                    }}
                                    className={`pt-4 flex flex-row gap-4
                                w-fit items-center rounded-md
                                transition-colors cursor-pointer
                                `}
                                >
                                    <Circle className={`w-6 h-6 transition-all ${isSelected ? "bg-muted-foreground rounded-full" : ""}`} />
                                    <Button variant="outline" className='cursor-pointer '>
                                        {id + 1}
                                    </Button>
                                </div>
                            )
                        })}


                    </section>
                )
            case 6: // checkbox
                const isSelected = isAnswered(question_id, true);
                return (
                    <section
                        onClick={() => {
                            !isSelected
                                ? addAnswer({
                                    survey_id,
                                    question_id,
                                    question,
                                    type,
                                    answer: true
                                })
                                : setSurveyFill((prevState) => {
                                    return prevState.filter((item) => item.question_id !== question_id)
                                })
                        }}
                        className={`pt-4 flex flex-row gap-4 w-fit items-center rounded-md transition-colors cursor-pointer`}
                    >
                        <Checkbox checked={isSelected} className={`transition-all duration-300`} />
                        <Button variant="outline" className='cursor-pointer '>
                            {placeholder || "Select"}
                        </Button>
                    </section>
                )
            case 7: // date
                return (
                    <section>
                        <DatePicker
                            id="date-picker"
                            placeholder="Select a date"
                            onChange={(dates, currentDateString) => {
                                addAnswer({
                                    survey_id,
                                    question_id,
                                    question,
                                    type,
                                    answer: currentDateString,
                                })
                                console.log({ dates, currentDateString });
                            }}
                        />
                    </section>
                )
            case 8: // dropdown
                return (
                    <section className="mt-2 mb-10 relative inline-block">
                        <Dropdown
                            trigger={
                                <Button
                                    variant="outline"
                                    className="w-64 cursor-pointer"
                                >
                                    {surveyFill.filter((item) => item.question_id === question_id)[0]?.answer || "Select a value"}
                                </Button>
                            }
                        >
                            {options?.map((option, i) => {
                                const isSelected = isAnswered(question_id, option);

                                return (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            !isSelected ?
                                                addAnswer({
                                                    survey_id,
                                                    question_id,
                                                    question,
                                                    type,
                                                    answer: option,
                                                })
                                                : setSurveyFill((prevState) => {
                                                    return prevState.filter((item) => item.question_id !== question_id)
                                                })
                                        }}
                                        className={`m-1 p-1 text-center cursor-pointer hover:bg-muted rounded-md dark:hover:bg-muted-foreground ${isSelected ? "bg-muted/70" : "bg-background"}`}
                                    >
                                        {option}
                                    </div>
                                );
                            })}
                        </Dropdown>
                    </section >
                );
        }
    }



    const handleSubmit = async (survey_content: any) => {
        setLoading(true);
        validateSurvey(survey_content);
        setLoading(false);
    }


    const validateSurvey = (survey_content: any) => {
        const newErrors: Record<number, string> = {};

        survey_content.questions && survey_content.questions.forEach((question: Question) => {
            const isAnswered = surveyFill.some((item) => item.question_id === question.id);

            if (question.required && !isAnswered) {
                newErrors[question.id] = `Question "${question.question}" is required.`;
            } else {
                newErrors[question.id] = "";
            }
        });

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some((error) => error !== "");
        if (hasError) {
            console.error("Validation errors:", newErrors);
            toast({
                title: t('validation_error.title'),
                description: t('validation_error.desc'),
                variant: "destructive",
            });
        } else {
            postSurveyData();
        }
    };

    // Style Handler
    const isAnswered = (
        question_id: number,
        answer: string | number | (string | number)[] | boolean | null
    ): boolean => {
        const entry = surveyFill.find((item) => item.question_id === question_id);

        if (!entry || entry.answer == null) return false;

        if (Array.isArray(entry.answer)) {
            // @ts-ignore
            return entry.answer.includes(answer);
        }

        return entry.answer === answer;
    };

    const handleQuestionType = (type: number) => {
        switch (type) {
            case 1:
                return t('single_choice')
            case 4:
                return t('multi_choice')
        }
    }


    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mt-16'
        >
            <SectionHeader title={t('title')} titleClassName='mt-4 bg-clip-text text-transparent bg-gradient-to-r from-happy-hearts to-golden-nugget' decorative={false} >
                <motion.span
                    className="absolute -bottom-2 left-2 h-1 bg-primary rounded-l-full bg-gradient-to-r from-golden-nugget to-background to-99%"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.6 }}
                />
            </SectionHeader>

            <section ref={containerRef} className={`flex flex-wrap justify-center items-center ${focusedId ? "blur-sm pointer-events-none" : ""}`}>
                {surveyData.length === 0 ? (
                    !userInfo ? (
                        <YazilimBlankPage
                            content={`No Forms Found For You.
Are You Logged In?`}
                            emoji="😭"
                        />
                    ) : (
                        <YazilimBlankPage content="No Forms Found For You" emoji="😭" />
                    )
                ) : null}
                {surveyData && surveyData.length > 0 && surveyData.map((survey: any) => {
                    if (answeredSurveys?.includes(survey)) return null;

                    return (
                        <motion.div
                            key={survey.id}
                            layoutId={`survey-${survey.id}`}
                            onClick={() => setFocusedId(survey.id)}
                            className="container m-4 w-2/5 min-w-96
                            items-center justify-center border border-border
                            rounded-lg shadow-md overflow-hidden"
                        >
                            <section
                                className="p-4 flex flex-row gap-4 items-center bg-bite-tongue/70 justify-between cursor-pointer"
                                onClick={() => setFocusedId(survey.id)}
                            >
                                <div className="flex flex-row gap-4 items-center">
                                    {HandleIcon(survey.icon)}
                                    <p className="text-lg font-semibold">{survey.title}</p>
                                </div>
                            </section>
                        </motion.div>
                    );
                })}
            </section >
            <AnimatePresence>
                {focusedId && currentSurvey && (
                    <motion.section
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
                        onClick={() => setFocusedId(null)}
                    >
                        <motion.section
                            layoutId={`survey-${focusedId}`}
                            // I will customize scrollbar
                            className="relative m-4 bg-muted p-10 rounded-2xl shadow-2xl max-w-2xl w-full max-h-3/4 overflow-y-auto overflow-x-hidden scrollbar scrollbar-track-bite-tongue scrollbar-thumb-bite-tongue z-50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setFocusedId(null)}
                                aria-label="Close preview"
                                className="group absolute top-4 right-4 text-muted-foreground hover:text-primary hover:bg-bite-tongue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-bite-tongue rounded-full"
                            >
                                <X className="transition-transform duration-800 group-hover:rotate-[180deg]" />
                            </Button>

                            <h2 className="text-bite-tongue text-2xl font-bold">
                                {currentSurvey.title}
                            </h2>
                            {currentSurvey.image_path && (
                                <Image
                                    src={`${getSurveyImagePath(currentSurvey.image_path)}`}
                                    alt={currentSurvey.title}
                                    width={1280} height={720}
                                    className="aspect-auto object-cover rounded-lg my-4"
                                ></Image>
                            )}
                            <p className="mt-4 text-lg whitespace-pre-line">
                                {currentSurvey.description}
                            </p>
                            {currentSurvey.questions && currentSurvey.questions.map((question: any, id) => (
                                <div key={id} className='relative py-4 sm:p-4'>
                                    <div className='absolute -left-4 sm:left-0'>
                                        {question.required && "*"}
                                    </div>
                                    <p className='font-semibold'>{question.question} {handleQuestionType(question.type)}</p>
                                    {HandleQuestions(currentSurvey.id,
                                        question.id,
                                        question.question,
                                        question.type,
                                        question.options,
                                        question.placeholder
                                    )}
                                    <div className="text-destructive text-sm">
                                        {errors[question.id] &&
                                            <p className="mt-2">{errors[question.id]}</p>
                                        }
                                    </div>
                                </div>
                            ))}

                            <Button
                                variant="outline"
                                onClick={() => handleSubmit(currentSurvey)}
                                className="mt-6 px-4 py-2 bg-bite-tongue text-white rounded hover:bg-bite-tongue/80 transition duration-200"
                            >
                                {t("submit")}
                            </Button>
                        </motion.section>
                    </motion.section>
                )}
            </AnimatePresence>

        </motion.div >
    )
}

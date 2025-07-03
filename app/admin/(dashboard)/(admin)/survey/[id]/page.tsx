"use client";
import { useParams } from "next/navigation"
import { Survey } from "@/types/types";
import { useEffect, useState } from "react";
import SurveyGet from "./(server)/survey_get";
import handleErrorCode from "@/components/handle-error-code";
import Loading from "@/components/loading";
import Form from "@/components/admin/form/Form";
import Label from "@/components/admin/form/Label";
import Input from "@/components/admin/form/input/InputField";
import Link from "next/link";
import Button from "@/components/admin/ui/button/Button";
import Checkbox from "@/components/admin/form/input/Checkbox";
import SurveyUpdate from "./(server)/survey_update";
import { toast } from "@/hooks/use-toast";
import SurveyDelete from "./(server)/survey_delete";
import { MessageCircleQuestionIcon } from "lucide-react";
import { HandleIcon } from "@/components/handle-icons";
import SurveyCreate from "./(server)/survey_create";
import imageUpload from "./(server)/survey_image_upload";

export default function AdminSurveyPage() {
    const id = Number(useParams().id);
    const [survey, setSurvey] = useState<Survey | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Record<string, string> | null>(null);

    useEffect(() => {
        id != 0 ? fetchSurvey() : setLoading(false);
    }, [id]);

    const fetchSurvey = async () => {
        SurveyGet(id)
            .then((res) => {
                console.log("SurveyGet response:", res);
                if (res.data) {
                    const surveyData = res.data as Survey;
                    setSurvey(surveyData);
                    setLoading(false);
                    return;
                }
                console.error("Error fetching survey:", res.error);
                setLoading(false);
                // @ts-ignore
                handleErrorCode(res.error.code ?? null);
            })
    }

    const updateSurvey = async () => {
        if (!survey) {
            console.error("Survey data is not available for update.");
            handleErrorCode("23503")
            return
        }

        const { data, error } = await SurveyUpdate(survey);
        if (data) {
            toast({
                title: "Survey updated successfully",
                description: "The survey has been updated in the database.",
                variant: "success",
            })
            console.log("Survey updated successfully:", data);
            setSurvey(data);
            return
        }
        console.error("Error updating survey:", error);
        handleErrorCode(error?.code || null);
    }

    const createSurvey = async () => {
        if (!survey) {
            console.error("Survey data is not available for creation. Fill the form first.");
            toast({
                title: "Submission Error",
                description: "Please fill the form before creating a survey.",
                variant: "destructive",
            })
            return
        }


        const { data, error } = await SurveyCreate(survey);
        if (data) {
            toast({
                title: "Survey created successfully",
                description: "The survey has been created in the database.",
                variant: "success",
            })
            setSurvey(data);
            return
        }
        console.error("Error creating survey:", error);
        handleErrorCode(error?.code || null);
    }

    const deleteSurvey = async () => {
        if (!confirm("Are you sure?"))
            return;

        const error = await SurveyDelete(id);

        if (!error) {
            toast({
                variant: "default",
                description: "Success",
            });
            SurveyGet(id)
        }
        else {
            console.log(error);
            // @ts-ignore
            handleErrorCode(error.code);
        }
    }

    const uploadSurveyImage = async (file: File | null) => {
        if (!file) {
            console.error("No file selected for upload.");
            toast({
                title: "Upload Image Error",
                description: "Please select an image to upload.",
                variant: "destructive",
            })
            return
        }

        const res = await imageUpload(file);

        if (res.error) {
            console.error("Error uploading image:", res.error);
            // @ts-ignore
            handleErrorCode(res.error.cause);
            return
        }

        // @ts-ignore
        setSurvey(prevSurvey => {
            return {
                ...prevSurvey,
                image_path: res.filepath
            }
        })
        toast({
            title: "Image uploaded successfully",
            description: "The image has been uploaded successfully.",
            variant: "success",
        })
    }

    const handleChangeEvent = (event: any) => handleChange(event.target.name, event.target.value);
    const handleChange = (key: string, value: any) => {
        // @ts-ignore
        setSurvey(prevSurvey => {
            return {
                ...prevSurvey,
                [key]: value
            }
        });

    }


    const handleChangeJSON = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            if (e.target.value != "") {
                const parsed = JSON.parse(e.target.value);
                setSurvey(prevSurvey => {
                    if (!prevSurvey) return null;

                    return {
                        ...prevSurvey,
                        [e.target.name]: parsed,
                    };
                });
            }
            switch (e.target.name) {
                case "questions":
                    setError(prevError => ({
                        ...prevError,
                        questions: ""
                    }));
                    break;
                case "requirements":
                    setError(prevError => ({
                        ...prevError,
                        requirements: ""
                    }))
            }
        } catch {
            switch (e.target.name) {
                case "questions":
                    setError(prevError => ({
                        ...prevError,
                        questions: "Invalid JSON format. Please check your input."
                    }));
                    break
                case "requirements":
                    setError(prevError => ({
                        ...prevError,
                        requirements: "Invalid JSON format. Please check your input."
                    }))
            }
        }
    };

    // Handle date formatting
    let date = survey?.created_at;
    const spl = date?.split(":");
    if (spl) date = spl[0] + ":" + spl[1];


    if (loading) {
        return <Loading />
    }

    return (
        <div className={"flex justify-center"}>
            <div className={"w-[75%] align-middle"}>
                <Form onSubmit={() => { }}>
                    <div className={"flex flex-col gap-2"}>
                        <Label htmlFor={"id"}>Id</Label>
                        <Input disabled={true} name={"id"} defaultValue={survey?.id} />

                        <Label htmlFor={"title"}>Title (text)</Label>
                        <Input type={"text"} name={"title"} onChange={handleChangeEvent} defaultValue={survey?.title} />

                        <Label htmlFor={"icon"}>Icon (number)</Label>
                        <div className="relative flex items-center">
                            <div className="absolute -left-10">{HandleIcon(Number(survey?.icon))}</div>
                            <Input type={"number"} name={"icon"} onChange={handleChangeEvent} defaultValue={survey?.icon} placeholder={"Icon"} />
                        </div>
                        <Label htmlFor={"description"}>Description (text)</Label>
                        <Input type={"text"} name={"description"} onChange={handleChangeEvent} defaultValue={survey?.description} placeholder={"Description"} />

                        <div className="flex flex-row gap-4">
                            <Label htmlFor={"image-path"}>Image Path (e.g image.png)</Label>
                            <input type="file" accept="image/*"
                                name="image_path"
                                onChange={e => uploadSurveyImage(e.target.files?.[0] ?? null)}
                                className="cursor-pointer file:cursor-pointer file:rounded-md file:border-0
                                file:bg-bite-tongue file:px-4 file:py-2 file:text-sm file:font-semibold
                                file:text-background hover:file:bg-copper-coin transition-colors duration-200
                                text-transparent"
                            />
                        </div>
                        <input type={"text"} name={"image_path"} placeholder="No files found" onChange={handleChangeEvent} value={survey?.image_path} />

                        <div className={"relative group flex gap-2"}>
                            <Label htmlFor={"questions"}>Questions</Label>
                            <span className="peer text-gray-500">
                                <MessageCircleQuestionIcon className="w-5 h-5" />
                            </span>
                            <p className="p-4 mt-1 absolute left-1/3 -translate-x-1/2
                                hidden group-hover:grid
                                max-w-[20vw] text-sm overflow-auto
                                top-full rounded-lg whitespace-pre-wrap
                                bg-card text-foreground border border-gray-500
                                shadow-lg z-40 animate-fadeIn">
                                {`questions - json (array)
* id - int,
* type - int // 0: yes_no, 1: single_choice, 2: number, 3: text, 4: multiple_choice, 5: rating, 6: checkbox, 7: date, 8: dropdown,
* required - boolean,
* question - text[400],
options - array[object]? (string or number)[],
placeholder - text[63]?,

--- Questions in JSON format, e.g. [{\"id\": 1, \"required\": true, \"options\": [\"Option1\", \"Option2\"], \"question\": \"What is your favorite color?\", \"placeholder\": \"Type here...\"}] ---`}</p>
                        </div>
                        <textarea name={"questions"}
                            onChange={handleChangeJSON}
                            defaultValue={survey?.questions ? JSON.stringify(survey.questions, null, 4) : ""}
                            className="w-full p-2 dark:bg-gray-900 rounded-md border border-gray-700 shadow-sm outline-none"
                            placeholder="Type questions in JSON format"
                            rows={10}
                        />
                        {error && (<p className="text-destructive">{error["questions"]}</p>)}

                        {// type - int // 0: public to authed users, 1: student, 2: special, 3: student or special, 4: admin, leave empty for anonymous users}
                            /* filled with event id */}
                        <div className={"relative group flex gap-2"}>
                            <Label htmlFor={"requirements"}>Requirements</Label>
                            <span className="peer text-gray-500">
                                <MessageCircleQuestionIcon className="w-5 h-5" />
                            </span>
                            <p className="p-4 mt-1 absolute left-1/3 -translate-x-1/2
                                hidden group-hover:grid
                                max-w-[20vw] text-sm overflow-auto
                                top-full rounded-lg whitespace-pre-wrap
                                bg-card text-foreground border border-gray-500
                                shadow-lg z-40 animate-fadeIn">{`requirements - array[object]
type - int // 0: public to authed users, 1: student, 2: special, 3: student or special, 4: admin, leave empty for anonymous users
events - array[int] // check related event id on events table for now

--- Requirements in JSON format, e.g. {\"type\": 0, \"events\": [1, 2]} ---`}</p>
                        </div>
                        <textarea name={"requirements"}
                            onChange={handleChangeJSON}
                            defaultValue={survey?.requirements ? JSON.stringify(survey.requirements, null, 4) : ""}
                            className="w-full p-2 dark:bg-gray-900 rounded-md border border-gray-700 shadow-sm outline-none"
                            placeholder="Type requirements in JSON format"
                            rows={5}
                        />
                        {error && (<p className="text-destructive">{error["requirements"]}</p>)}

                        <Label htmlFor={"created-at"}>Created At</Label>
                        <Input disabled name={"created_at"} onChange={handleChangeEvent} defaultValue={survey?.created_at} />


                        <div className={"flex gap-2 w-[100%] justify-center"}>
                            <Checkbox label={"Is Active"} onChange={x => handleChange("is_active", x)} checked={survey?.is_active ?? false} />
                            <Checkbox label={"Is Anonym"} onChange={x => handleChange("is_anonym", x)} checked={survey?.is_anonym ?? false} />
                        </div>

                        <div className={"flex w-[100%]"}>
                            <div className={"gap-2 flex items-center"}>
                                <Link href={"/admin/survey"}>
                                    <Button variant={"outline"} className="cursor-pointer">
                                        Back
                                    </Button>
                                </Link>
                                {id != 0 && <Link href={"/admin/survey/0"}>
                                    <Button variant={"outline"} className="cursor-pointer">
                                        Create
                                    </Button>
                                </Link>}
                            </div>
                            <div className={"gap-2 flex justify-end w-[100%]"}>
                                <Button variant={"outline"} className="cursor-pointer" onClick={() => id && deleteSurvey()}>
                                    Delete
                                </Button>
                                <Button className="cursor-pointer" onClick={() => id ? updateSurvey() : createSurvey()}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div >
        </div >
    )

}

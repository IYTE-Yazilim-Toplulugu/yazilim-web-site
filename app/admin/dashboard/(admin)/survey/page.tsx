"use client";
import handleErrorCode from "@/components/handle-error-code";
import { toast } from "@/hooks/use-toast";
import { deleteSurvey } from "@/utils/survey_server_util";
import { useEffect, useState } from "react";
import SurveysAll, { SurveyAnswersAll } from "./(server)/surveys_get";
import { Survey, SurveyAnswers } from "@/types/types";
import Input from "@/components/admin/form/input/InputField";
import { Button } from "@/components/ui/button";
import { PlusIcon, RefreshCwIcon, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/admin/ui/table";
import Pagination from "@/components/admin/tables/Pagination";
import Link from "next/link";
import { HandleIcon } from "@/components/handle-icons";
import { handleQuestionType, handleSurveyType } from "@/components/handle-types";
import { getSurveyImagePath } from "@/utils/survey_client_util";
import Loading from "@/components/loading";


export default function AdminSurveysPage() {
    // Data handling state
    const [surveys, setSurveys] = useState<Survey[]>();
    const [answers, setAnswers] = useState<SurveyAnswers[]>([]);

    // Pagination and search state
    const [pageCount, setPageCount] = useState<number>(1);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState<string>();
    const [queryTemp, setQueryTemp] = useState<string>();

    // Sorting state
    const [sortKey, setSortKey] = useState<"id" | "title" | "icon" | "description" | "is_active" | "is_anonym" | "created_at">("id");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchSurveys(page, query);
        setLoading(false);

    }, [page, query]);

    useEffect(() => {
        fetchAnswers();
    }, [surveys]);

    const fetchSurveys = async (page: number, query?: string) => {
        SurveysAll(page, query).then(r => {
            setSurveys(r.data ?? [])
            setPageCount(r.pageCount ?? 1);
        });
    }

    const fetchAnswers = async () => {
        if (surveys && surveys.length > 0) {
            const res = await SurveyAnswersAll(surveys);
            console.log("Survey answers fetched:", res);
            if (res.error) {
                console.error("Error fetching survey answers:", res.error);
                handleErrorCode(res.error.code);
            }
            setAnswers(res.data ?? []);
        }
    }

    const handleDelete = async (id: number, title: string) => {
        if (!confirm(`Are you sure you want to delete the survey "${title}"? This action cannot be undone.`)) {
            return;
        }
        const { success, error } = await deleteSurvey(id);

        if (success) {
            toast({
                title: "Survey deleted successfully",
                description: "The survey has been removed from the database.",
                variant: "success",
            })
            fetchSurveys(page, query);
        } else {
            console.error("Error deleting survey:", error);
            handleErrorCode(null)
        }
    }

    const handleSort = (key: "id" | "title" | "icon" | "description" | "is_active" | "is_anonym" | "created_at") => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };
    const sortedSurveys = surveys?.slice().sort((a, b) => {
        // @ts-ignore
        const aVal = a[sortKey];
        // @ts-ignore
        const bVal = b[sortKey];

        if (typeof aVal === "string" && typeof bVal === "string") {
            return sortOrder === "asc"
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        }
        return sortOrder === "asc"
            ? (aVal as number) - (bVal as number)
            : (bVal as number) - (aVal as number);
    });

    if (loading) return <Loading />

    return (
        <div>
            <div className={"justify-end gap-2 w-full items-center flex flex-row"}>
                < Input
                    id={"search"}
                    type={"text"}
                    placeholder={"Search by title..."}
                    defaultValue={queryTemp}
                    onEnter={() => setQuery(queryTemp)
                    }
                    onChange={(e) => setQueryTemp(e.target.value)}
                />
                <Button className={"cursor-pointer"} onClick={() => setQuery(queryTemp)}>
                    <Search />
                </Button >
            </div >

            <div className="overflow-x-auto w-full h-[70vh]">
                <div
                    className="scroll-container"
                    onWheel={(e) => {
                        if (e.deltaY !== 0) {
                            e.currentTarget.scrollLeft += e.deltaY;
                        }
                    }}
                >
                    <Table className={"m-4 p-4 rounded-2xl border border-gray-500"}>
                        <TableHeader>
                            <TableRow className={"font-bold text-center divide-x"}>
                                <TableCell className="p-4 border border-gray-500 cursor-pointer select-none"
                                    onClick={() => handleSort("id")}>* ID {sortKey === "id" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-500 cursor-pointer select-none"
                                    onClick={() => handleSort("title")}>* TITLE {sortKey === "title" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-500 cursor-pointer select-none"
                                    onClick={() => handleSort("icon")}>ICON {sortKey === "icon" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-500 cursor-pointer select-none"
                                    onClick={() => handleSort("description")}>DESCRIPTION {sortKey === "description" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-500">Questions</TableCell>
                                <TableCell className="p-4 border border-gray-500">IMAGE</TableCell>
                                <TableCell className="p-4 border border-gray-500 cursor-pointer select-none"
                                    onClick={() => handleSort("is_active")}>* IS ACTIVE {sortKey === "is_active" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-500 cursor-pointer select-none"
                                    onClick={() => handleSort("is_anonym")}>* IS ANONYM {sortKey === "is_anonym" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-500">TYPE</TableCell>
                                <TableCell className="p-4 border border-gray-500">EVENTS</TableCell>
                                <TableCell className="p-4 border border-gray-500">ANSWERS</TableCell>
                                <TableCell className="p-4 border border-gray-500 cursor-pointer select-none"
                                    onClick={() => handleSort("created_at")}>* CREATED AT {sortKey === "created_at" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-500">{""}</TableCell>
                                <TableCell className="p-4 border border-gray-500">{""}</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedSurveys?.map(u => (
                                <TableRow key={u.id} className={"divide-x divide-gray-500 border border-gray-500"}>
                                    <TableCell className="p-4 text-center">{u.id}</TableCell>
                                    <TableCell className="p-4 relative group">
                                        <span className="peer">
                                            {u.title.length > 16 ? u.title.substring(0, 16) + "..." : u.title}
                                        </span>
                                        <div className="p-2 mt-1 absolute left-1/2 -translate-x-1/2 hidden group-hover:block
                                            {u.title.length > 16 && (
                                            peer-hover:delay-500
                                            max-w-xs w-max top-full rounded-lg text-wrap
                                            bg-card text-foreground border border-gray-500
                                            shadow-lg z-40 animate-fadeIn">
                                            {u.title}
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-4 relative group text-center">
                                        <span className="peer">{u.icon}</span>
                                        <div className="mt-1 absolute top-8 left-1/2 -translate-x-1/2
                                            w-7 h-7 text-center items-center justify-center rounded-full
                                            hidden group-hover:block bg-card text-foreground border border-gray-500">
                                            {HandleIcon(u.icon)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-4 relative group">
                                        <span className="peer">
                                            {u.description && u.description.length > 50 ? u.description.substring(0, 50) + "..." : u.description}
                                        </span>
                                        {u.description.length > 50 && (
                                            <div className="p-2 mt-1 absolute left-1/2 -translate-x-1/2 hidden group-hover:block
                                            peer-hover:delay-500
                                            w-full top-full rounded-lg text-wrap
                                            bg-card text-foreground border border-gray-500
                                            shadow-lg z-40 animate-fadeIn">
                                                {u.description}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="p-4 relative group">
                                        <span className={`peer flex justify-center ${!u.questions && "text-destructive"}`}>
                                            {u.questions && u.questions.length > 0 ? (
                                                u.questions.length > 1
                                                    ? `question: ${u.questions[0].question?.substring(0, 16)}...`
                                                    : `question: ${u.questions[0].question?.substring(0, 16)}, type: ${u.questions[0].type}`
                                            ) : (
                                                "None"
                                            )}
                                        </span>

                                        {u.questions && (<div
                                            className={`p-4 mt-1 absolute left-1/2 -translate-x-1/2 hidden
                                        group-hover:grid ${u.questions && u.questions.length > 2 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[60vw]"
                                                    : u.questions.length === 2 ? "grid-cols-1 md:grid-cols-2 w-[60vw] sm:w-[40vw]" : "grid-cols-1 w-[60vw]  md:w-[40vw] lg:w-[20vw]"}
                                        gap-4 max-h-[60vh] overflow-auto
                                        top-full rounded-lg whitespace-pre-wrap
                                        bg-card text-foreground border border-gray-500
                                        shadow-lg z-40 animate-fadeIn`}
                                        >
                                            {u.questions.map((q, i) => (
                                                <div
                                                    key={i}
                                                    className="w-full p-3 border border-border rounded-md shadow-sm bg-muted"
                                                >
                                                    <h2 className="text-lg font-semibold text-bite-tongue underline mb-1">
                                                        {i + 1} • <span className="text-sm font-normal">id: {q.id}</span>
                                                    </h2>
                                                    <p>type: {handleQuestionType(q.type)}</p>
                                                    <p>
                                                        required:{" "}
                                                        <span className={q.required ? "text-success-500" : "text-destructive"}>
                                                            {`${q.required}`}
                                                        </span>
                                                    </p>
                                                    <p>question:{" "}
                                                        <span className="text-brand-400">{q.question}</span></p>
                                                    <p>options: [{q.options?.join(", ") || "None"}]</p>
                                                    <p>
                                                        placeholder:{" "}
                                                        <span className={!q.placeholder ? "text-destructive" : ""}>
                                                            {q.placeholder || "None"}
                                                        </span>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>)}
                                    </TableCell>
                                    <TableCell className={`${u.image_path && "hover:bg-sidebar-ring hover:text-background cursor-pointer"} dark:hover:text-primary`}>
                                        <Link href={u.image_path ? getSurveyImagePath(u.image_path) : ""}
                                            target="_blank" className="p-4 text-center">
                                            {u.image_path}
                                        </Link>
                                    </TableCell>
                                    <TableCell className={`p-4 text-center ${u.is_active ? "text-success-400" : "text-destructive"}`}>{u.is_active.toString()}</TableCell>
                                    <TableCell className={`p-4 text-center ${u.is_anonym ? "text-success-400" : "text-destructive"}`}>{u.is_anonym.toString()}</TableCell>
                                    <TableCell className={`p-4 text-center ${!u.requirements?.type && "text-destructive"}`}>{u.requirements?.type ? `${u.requirements.type} • Open for ${handleSurveyType(u.requirements.type)}` : "None"}</TableCell>
                                    <TableCell className={`p-4 text-center text-nowrap ${!u.requirements?.events && "text-destructive"}`}>{u.requirements?.events ? `[${u.requirements.events?.join(", ")}]` : "None"}</TableCell>
                                    <TableCell className="p-4 text-center flex flex-row justify-center">
                                        {answers.some(s => s.survey_id === u.id) ? answers.filter(s => s.survey_id === u.id)?.map((answerData, index) => (
                                            <div key={index} className="relative group">
                                                <span className="peer">
                                                    {`user_id:${answerData.user_id.toString().substring(0, 10)}... answer:${answerData.answers[0]?.answer?.toString().substring(0, 16)}...`}
                                                </span>
                                                <div
                                                    className={`p-4 mt-1 absolute left-1/2 -translate-x-1/2 hidden
                                                    group-hover:grid 
                                                        ${answerData.answers.length > 2 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[60vw]"
                                                            : answerData.answers.length === 2 ? "grid-cols-1 md:grid-cols-2 w-[60vw] sm:w-[40vw]"
                                                                : "grid-cols-1 w-[60vw]  md:w-[40vw] lg:w-[20vw]"}  
                                                    gap-4
                                                    max-h-[60vh] overflow-auto
                                                    top-full rounded-lg whitespace-pre-wrap
                                                    bg-card text-foreground border border-gray-500
                                                    shadow-lg z-40 animate-fadeIn`}
                                                >
                                                    {"User: " + answerData.user_id}
                                                    {answerData.answers.map((a, i) => {
                                                        const q = u.questions.find(question => question.id === a.question_id);

                                                        if (!q) return null;

                                                        return (
                                                            <div
                                                                key={i}
                                                                className="w-full p-3 border border-border rounded-md shadow-sm bg-muted"
                                                            >
                                                                <h2 className="text-lg font-semibold text-bite-tongue underline mb-1">
                                                                    {i + 1} • <span className="text-sm font-normal">question_id: {q.id}</span>
                                                                </h2>
                                                                <p>
                                                                    required:{" "}
                                                                    <span className={q.required ? "text-success-500" : "text-destructive"}>
                                                                        {`${q.required}`}
                                                                    </span>
                                                                </p>
                                                                <p>
                                                                    question: <span className="text-brand-400">{q.question}</span>
                                                                </p>
                                                                <p>options: [{q.options?.join(", ") || "None"}]</p>
                                                                <p>
                                                                    <strong>Answer:</strong> {a.answer ?? <em className="text-destructive">No answer</em>}
                                                                </p>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>)) : <p className="flex text-center items-center justify-center text-destructive">None</p>}
                                    </TableCell>
                                    <TableCell className="p-4">{new Date(u.created_at).toLocaleString()}</TableCell>
                                    <TableCell className="
                                    dark:hover:text-primary cursor-pointer
                                    text-center text-sidebar-ring 
                                    hover:bg-sidebar-ring hover:text-background">
                                        <Link href={"/admin/dashboard/survey/" + u.id} className="p-4">Edit</Link>
                                    </TableCell>
                                    <TableCell className="p-4
                                    text-destructive text-center
                                    hover:bg-destructive hover:text-background
                                    dark:hover:text-primary cursor-pointer">
                                        <div onClick={async () => await handleDelete(u.id, u.title)}>Delete</div>
                                    </TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className={"relative w-full flex flex-wrap items-center justify-center gap-4"}>
                <Link href={"/admin/dashboard/survey/0"}>
                    <Button variant={"secondary"} className="cursor-pointer select-none">
                        <p>Create</p>
                        <PlusIcon />
                    </Button>
                </Link>
                <div>
                    <Pagination currentPage={page} totalPages={pageCount} onPageChange={setPage} />
                </div>
                <Button variant={"secondary"} className="cursor-pointer select-none"
                    onClick={() => { fetchSurveys(page, query) }}>
                    <RefreshCwIcon />
                </Button>
            </div>
        </div >
    )

}

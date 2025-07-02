"use client";
import handleErrorCode from "@/components/handle-error-code";
import { toast } from "@/hooks/use-toast";
import { deleteSurvey } from "@/utils/survey_server_util";
import { useEffect, useState } from "react";
import SurveysAll from "./(server)/surveys_all";
import { Survey } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/admin/ui/table";
import Link from "next/link";
import {Search} from "lucide-react";
import Pagination from "@/components/admin/tables/Pagination";


async function handleDelete(id: number, title: string) {
    if (!confirm(`Are you sure you want to delete the survey "${title}"? This action cannot be undone.`)) {
        return;
    }
    const error = await deleteSurvey(id);

    if (!error) {
        toast({
            title: "Survey deleted successfully",
            description: "The survey has been removed from the database.",
            variant: "success",
        })
    } else {
        console.error("Error deleting survey:", error);
        // @ts-ignore
        handleErrorCode(error.error?.code)
    }
}



export default function AdminSurveyPage() {
    const [surveys, setSurveys] = useState<Survey[]>();
    const [pageCount, setPageCount] = useState<number>(1);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState<string>();
    const [queryTemp, setQueryTemp] = useState<string>();

    useEffect(() => {
        SurveysAll(page, query).then(r => {
            setSurveys(r.data ?? []);
            setPageCount(r.pageCount);
        });
    }, [page, query]);


    // ======== THIS NOT IMPLEMENTED YET ========
    // ======== THIS NOT IMPLEMENTED YET ========
    // ======== THIS NOT IMPLEMENTED YET ========
    // ======== THIS NOT IMPLEMENTED YET ========
    //
    //
    return (
        <div>
            <div className={"justify-end gap-2 w-full items-center flex flex-row"}>
                <Input
                    id={"search"}
                    defaultValue={queryTemp}
                    onEnter={() => setQuery(queryTemp)}
                    onChange={(e) => setQueryTemp(e.target.value)}
                />
                <Button className={"cursor-pointer"} onClick={() => setQuery(queryTemp)}>
                    <Search />
                </Button>
            </div>
            <Table className={"p-5 border-separate border-spacing-4 "}>
                <TableHeader>
                    <TableRow className={"font-bold"}>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Required</TableCell>
                        <TableCell>Is Special</TableCell>
                        <TableCell>Is Student</TableCell>
                        <TableCell>From IZTECH</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>{""}</TableCell>
                        <TableCell>{""}</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        users?.map(u => (
                            <TableRow key={u.id}>
                                <TableCell>{u.full_name}</TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>{u.phone}</TableCell>
                                <TableCell>{u.is_special ? "+" : "-"}</TableCell>
                                <TableCell>{u.is_student ? "+" : "-"}</TableCell>
                                <TableCell>{u.from_iztech ? "+" : "-"}</TableCell>
                                <TableCell>{new Date(u.created_at).toLocaleString()}</TableCell>
                                <TableCell><Link className={"!text-blue"} href={"/admin/user/" + u.id}>Details</Link></TableCell>
                                <TableCell><Button variant={"outline"} className={"cursor-pointer text-red"} onClick={async () => await handleDelete(u.id, u.full_name)}>Delete</Button></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <div className={"w-full flex gap-2 justify-center"}>
                <Pagination currentPage={page} totalPages={pageCount} onPageChange={setPage} />
            </div>
        </div>
    )

}

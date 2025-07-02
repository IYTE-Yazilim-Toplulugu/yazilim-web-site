'use client'

import { useEffect, useState } from "react";
import UsersAllServer from "@/app/admin/(dashboard)/(admin)/user/all/(server)/users_all";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/admin/ui/table";
import Button from "@/components/admin/ui/button/Button";
import Link from "next/link";
import UserDeleteServer from "@/app/admin/(dashboard)/(admin)/user/[id]/(server)/user_delete";
import Pagination from "@/components/admin/tables/Pagination";
import { Search } from "lucide-react";
import Input from "@/components/admin/form/input/InputField";
import { toast } from "@/hooks/use-toast";
import { UserInfo } from "@/types/types_user";

async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete ${name}?`))
        return;

    const error = await UserDeleteServer(id);

    if (!error) {
        toast({
            variant: "default",
            description: "Success",
        });
    }
    else {
        console.error(error);
        // @ts-ignore
        handleErrorCode(error.code);
    }
}

export default function UsersAll() {
    const [users, setUsers] = useState<UserInfo[]>();
    const [pageCount, setPageCount] = useState<number>(1);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState<string>();
    const [queryTemp, setQueryTemp] = useState<string>();

    useEffect(() => {
        UsersAllServer(page, query).then(r => {
            setUsers(r.data ?? []);
            setPageCount(r.pageCount);
        });
    }, [page, query]);

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
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
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
    );
}

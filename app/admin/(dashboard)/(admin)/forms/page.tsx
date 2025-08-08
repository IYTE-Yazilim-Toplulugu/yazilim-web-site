"use client";
import handleErrorCode from "@/components/handle-error-code";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import Input from "@/components/admin/form/input/InputField";
import FcButton from "@/components/admin/ui/button/Button";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/admin/ui/table";
import Pagination from "@/components/admin/tables/Pagination";
import Link from "next/link";
import Loading from "@/components/loading";
import { redirect } from "next/navigation";
import { Contact } from "@/types/types_contact";
import ContactsAll from "./(server)/contacts_get";
import ContactDelete from "./[id]/(server)/contact_delete";


export default function AdminContactsPage() {
    // Data handling state
    const [contacts, setContacts] = useState<Contact[]>();

    // Pagination and search state
    const [pageCount, setPageCount] = useState<number>(1);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState<string>();
    const [queryTemp, setQueryTemp] = useState<string>();

    // Sorting state
    const [sortKey, setSortKey] = useState<"id" | "name" | "email" | "subject" | "message" | "created_at">("id");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchContacts(page, query);
        setLoading(false);

    }, [page, query]);

    const fetchContacts = async (page: number, query?: string) => {
        ContactsAll(page, query).then(r => {
            setContacts(r.data ?? [])
            setPageCount(r.pageCount ?? 1);
        });
    }


    const handleDelete = async (id: number, title: string) => {
        if (!confirm(`Are you sure you want to delete the contact form "${title}"? This action cannot be undone.`)) {
            return;
        }
        const { data, error } = await ContactDelete(id);

        if (data) {
            toast({
                title: "Contact form deleted successfully",
                description: "The contact form has been removed from the database.",
                variant: "success",
            })
            setContacts(prev => prev?.filter(s => s.id !== id));
        } else {
            console.error("Error deleting contact form:", error);
            handleErrorCode(null)
        }
    }

    const handleSort = (key: "id" | "name" | "email" | "subject" | "message" | "created_at") => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };
    const sortedSurveys = contacts?.slice().sort((a, b) => {
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
                    placeholder={"Search by name..."}
                    defaultValue={queryTemp}
                    onEnter={() => setQuery(queryTemp)
                    }
                    onChange={(e) => setQueryTemp(e.target.value)}
                />
                <FcButton className={"cursor-pointer"} onClick={() => setQuery(queryTemp)}>
                    <Search />
                </FcButton>
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
                    <Table className={"m-4 p-4 rounded-2xl border border-gray-700"}>
                        <TableHeader>
                            <TableRow className={"font-bold text-center divide-x divide-gray-700"}>
                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none"
                                    onClick={() => handleSort("id")}>* ID {sortKey === "id" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>

                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none"
                                    onClick={() => handleSort("name")}>* NAME {sortKey === "name" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none"
                                    onClick={() => handleSort("email")}>* EMAIL {sortKey === "email" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>

                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none"
                                    onClick={() => handleSort("subject")}>* SUBJECT {sortKey === "subject" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none"
                                    onClick={() => handleSort("message")}>* MESSAGE {sortKey === "message" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none"
                                    onClick={() => handleSort("created_at")}>* CREATED AT {sortKey === "created_at" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-700">{""}</TableCell>
                                <TableCell className="p-4 border border-gray-700">{""}</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedSurveys?.map(u => (
                                <TableRow key={u.id} className={"divide-x divide-gray-700 border border-gray-700"}>
                                    <TableCell className="p-4 text-center">{u.id}</TableCell>
                                    <TableCell className="p-4 relative group">
                                        <span className="peer">
                                            {u.name.length > 16 ? u.name.substring(0, 16) + "..." : u.name}
                                        </span>
                                        <div className="p-2 mt-1 absolute left-1/2 -translate-x-1/2 hidden group-hover:block
                                            {u.title.length > 16 && (
                                            peer-hover:delay-500
                                            max-w-xs w-max top-full rounded-lg text-wrap
                                            bg-card text-foreground border border-gray-700
                                            shadow-lg z-40 animate-fadeIn">
                                            {u.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-4 relative group">
                                        <span className="peer">
                                            {u.email.length > 16 ? u.email.substring(0, 16) + "..." : u.email}
                                        </span>
                                        <div className="p-2 mt-1 absolute left-1/2 -translate-x-1/2 hidden group-hover:block
                                            {u.title.length > 16 && (
                                            peer-hover:delay-500
                                            max-w-xs w-max top-full rounded-lg text-wrap
                                            bg-card text-foreground border border-gray-700
                                            shadow-lg z-40 animate-fadeIn">
                                            {u.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-4 relative group">
                                        <span className="peer">
                                            {u.subject.length > 16 ? u.subject.substring(0, 16) + "..." : u.subject}
                                        </span>
                                        <div className="p-2 mt-1 absolute left-1/2 -translate-x-1/2 hidden group-hover:block
                                            {u.title.length > 16 && (
                                            peer-hover:delay-500
                                            max-w-xs w-max top-full rounded-lg text-wrap
                                            bg-card text-foreground border border-gray-700
                                            shadow-lg z-40 animate-fadeIn">
                                            {u.subject}
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-4 relative group">
                                        <span className="peer">
                                            {u.message && u.message.length > 50 ? u.message.substring(0, 50) + "..." : u.message}
                                        </span>
                                        {u.message.length > 50 && (
                                            <div className="p-2 mt-1 absolute left-1/2 -translate-x-1/2 hidden group-hover:block
                                            peer-hover:delay-500
                                            w-full top-full rounded-lg text-wrap
                                            bg-card text-foreground border border-gray-700
                                            shadow-lg z-40 animate-fadeIn">
                                                {u.message}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="p-4">{new Date(u.created_at).toLocaleString()}</TableCell>
                                    <TableCell className="
                                    dark:hover:text-primary cursor-pointer
                                    text-center text-sidebar-ring 
                                    hover:bg-sidebar-ring hover:text-background">
                                        <Link href={"/admin/forms/" + u.id} className="p-4">Edit</Link>
                                    </TableCell>
                                    <TableCell className="p-4
                                    text-destructive text-center
                                    hover:bg-destructive hover:text-background
                                    dark:hover:text-primary cursor-pointer">
                                        <div onClick={async () => await handleDelete(u.id, u.name)}>Delete</div>
                                    </TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className={"mt-4 w-full flex gap-2 justify-center"}>
                <Pagination onCreateClick={() => redirect('/admin/forms/0')} currentPage={page} totalPages={pageCount} onRefreshClick={async () => await fetchContacts(page, query)} onPageChange={setPage} />
            </div>
        </div >
    )

}

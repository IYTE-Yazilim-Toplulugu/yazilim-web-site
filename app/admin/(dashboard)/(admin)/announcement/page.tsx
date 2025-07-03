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
import Image from "next/image";
import { Announcement } from "@/types/types_announcement";
import AnnouncementsAll from "./(server)/announcements_get";
import { getAnnouncementImagePath } from "@/utils/announcement_client_util";
import AnnouncementDelete from "./[id]/(server)/announcement_delete";


export default function AdminAnnouncementsPage() {
    // Data handling state
    const [announcements, setAnnouncements] = useState<Announcement[]>();

    // Pagination and search state
    const [pageCount, setPageCount] = useState<number>(1);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState<string>();
    const [queryTemp, setQueryTemp] = useState<string>();

    // Sorting state
    const [sortKey, setSortKey] = useState<"id" | "title" | "event_id" | "description" | "expires_at" | "published_at" | "created_at">("id");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchAnnouncements(page, query);
        setLoading(false);

    }, [page, query]);

    const fetchAnnouncements = async (page: number, query?: string) => {
        AnnouncementsAll(page, query).then(r => {
            setAnnouncements(r.data ?? [])
            setPageCount(r.pageCount ?? 1);
        });
    }


    const handleDelete = async (id: number, title: string) => {
        if (!confirm(`Are you sure you want to delete the announcement "${title}"? This action cannot be undone.`)) {
            return;
        }
        const { data, error } = await AnnouncementDelete(id);

        if (data) {
            toast({
                title: "Announcement deleted successfully",
                description: "The announcement has been removed from the database.",
                variant: "success",
            })
            setAnnouncements(prev => prev?.filter(s => s.id !== id));
        } else {
            console.error("Error deleting announcement:", error);
            handleErrorCode(null)
        }
    }

    const handleSort = (key: "id" | "title" | "event_id" | "description" | "expires_at" | "published_at" | "created_at") => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };
    const sortedSurveys = announcements?.slice().sort((a, b) => {
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
                                    onClick={() => handleSort("event_id")}>EVENT ID{sortKey === "event_id" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>

                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none"
                                    onClick={() => handleSort("title")}>* TITLE {sortKey === "title" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none"
                                    onClick={() => handleSort("expires_at")}>EXPIRES AT {sortKey === "expires_at" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none"
                                    onClick={() => handleSort("description")}>DESCRIPTION {sortKey === "description" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none"
                                    onClick={() => handleSort("published_at")}>PUBLISEHD AT {sortKey === "published_at" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none"
                                    onClick={() => handleSort("created_at")}>* CREATED AT {sortKey === "created_at" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none">IMAGE</TableCell>
                                <TableCell className="p-4 border border-gray-700">{""}</TableCell>
                                <TableCell className="p-4 border border-gray-700">{""}</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedSurveys?.map(u => (
                                <TableRow key={u.id} className={"divide-x divide-gray-700 border border-gray-700"}>
                                    <TableCell className="p-4 text-center">{u.id}</TableCell>
                                    <TableCell className="p-4">{u.event_id}</TableCell>
                                    <TableCell className="p-4 relative group">
                                        <span className="peer">
                                            {u.title.length > 16 ? u.title.substring(0, 16) + "..." : u.title}
                                        </span>
                                        <div className="p-2 mt-1 absolute left-1/2 -translate-x-1/2 hidden group-hover:block
                                            {u.title.length > 16 && (
                                            peer-hover:delay-500
                                            max-w-xs w-max top-full rounded-lg text-wrap
                                            bg-card text-foreground border border-gray-700
                                            shadow-lg z-40 animate-fadeIn">
                                            {u.title}
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-4">{new Date(u.expires_at).toLocaleString()}</TableCell>
                                    <TableCell className="p-4 relative group">
                                        <span className="peer">
                                            {u.description && u.description.length > 50 ? u.description.substring(0, 50) + "..." : u.description}
                                        </span>
                                        {u.description.length > 50 && (
                                            <div className="p-2 mt-1 absolute left-1/2 -translate-x-1/2 hidden group-hover:block
                                            peer-hover:delay-500
                                            w-full top-full rounded-lg text-wrap
                                            bg-card text-foreground border border-gray-700
                                            shadow-lg z-40 animate-fadeIn">
                                                {u.description}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="p-4">{new Date(u.published_at).toLocaleString()}</TableCell>
                                    <TableCell className="p-4">{new Date(u.created_at).toLocaleString()}</TableCell>
                                    <TableCell className={`${u.image_path && "hover:bg-sidebar-ring hover:text-background cursor-pointer"} dark:hover:text-primary`}>
                                        {u.image_path && <Link href={getAnnouncementImagePath(u.image_path)}
                                            target="_blank" className="p-4 flex items-center justify-center">
                                            <Image src={getAnnouncementImagePath(u.image_path)}
                                                alt={`image-${u.image_path}`}
                                                width={80} height={45}
                                                className="object-cover aspect-video"
                                            />
                                        </Link>}
                                    </TableCell>
                                    <TableCell className="
                                    dark:hover:text-primary cursor-pointer
                                    text-center text-sidebar-ring 
                                    hover:bg-sidebar-ring hover:text-background">
                                        <Link href={"/admin/announcement/" + u.id} className="p-4">Edit</Link>
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
            <div className={"mt-4 w-full flex gap-2 justify-center"}>
                <Pagination onCreateClick={() => redirect('/admin/announcement/0')} currentPage={page} totalPages={pageCount} onRefreshClick={async () => await fetchAnnouncements(page, query)} onPageChange={setPage} />
            </div>
        </div >
    )

}



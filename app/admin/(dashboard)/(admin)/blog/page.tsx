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
import { Blog } from "@/types/types_blog";
import BlogsAll from "./(server)/blogs_get";
import BlogDelete from "./[id]/(server)/blog_delete";
import { getBlogImagePath } from "@/utils/blog_client_util";


export default function AdminBlogsPage() {
    // Data handling state
    const [blogs, setBlogs] = useState<Blog[]>();

    // Pagination and search state
    const [pageCount, setPageCount] = useState<number>(1);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState<string>();
    const [queryTemp, setQueryTemp] = useState<string>();

    // Sorting state
    const [sortKey, setSortKey] = useState<"id" | "author_name" | "title" | "content" | "tags" | "published_at" | "created_at">("id");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchBlogs(page, query);
        setLoading(false);

    }, [page, query]);

    const fetchBlogs = async (page: number, query?: string) => {
        BlogsAll(page, query).then(r => {
            setBlogs(r.data ?? [])
            setPageCount(r.pageCount ?? 1);
        });
    }


    const handleDelete = async (id: number, title: string) => {
        if (!confirm(`Are you sure you want to delete the blog "${title}"? This action cannot be undone.`)) {
            return;
        }
        const { data, error } = await BlogDelete(id);

        if (data) {
            toast({
                title: "Blog deleted successfully",
                description: "The blog has been removed from the database.",
                variant: "success",
            })
            setBlogs(prev => prev?.filter(s => s.id !== id));
        } else {
            console.error("Error deleting blog:", error);
            handleErrorCode(null)
        }
    }

    const handleSort = (key: "id" | "author_name" | "title" | "content" | "tags" | "published_at" | "created_at") => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };
    const sortedSurveys = blogs?.slice().sort((a, b) => {
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
                                    onClick={() => handleSort("author_name")}>* AUTHOR NAME{sortKey === "author_name" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>

                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none"
                                    onClick={() => handleSort("title")}>* TITLE {sortKey === "title" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none"
                                    onClick={() => handleSort("content")}>CONTENT {sortKey === "content" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none"
                                    onClick={() => handleSort("tags")}>TAGS {sortKey === "tags" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none">IS PUBLISHED</TableCell>
                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none">PUBLISHED AT</TableCell>
                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none">UPDATED AT</TableCell>
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
                                    <TableCell className="p-4">{u.author_name}</TableCell>
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
                                    <TableCell className="p-4 relative group">
                                        <span className="peer">
                                            {u.content && u.content.length > 50 ? u.content.substring(0, 50) + "..." : u.content}
                                        </span>
                                        {u.content.length > 50 && (
                                            <div className="p-2 mt-1 absolute left-1/2 -translate-x-1/2 hidden group-hover:block
                                            peer-hover:delay-500
                                            w-full top-full rounded-lg text-wrap
                                            bg-card text-foreground border border-gray-700
                                            shadow-lg z-40 animate-fadeIn">
                                                {u.content}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className={`p-4 text-center text-nowrap ${!u.tags && "text-destructive"}`}>{u.tags ? `[${u.tags?.join(", ")}]` : "None"}</TableCell>


                                    <TableCell className={`p-4 text-center ${u.is_published ? "text-success-400" : "text-destructive"}`}>{u.is_published.toString()}</TableCell>


                                    <TableCell className="p-4">{new Date(u.published_at).toLocaleString()}</TableCell>
                                    <TableCell className="p-4">{new Date(u.updated_at).toLocaleString()}</TableCell>
                                    <TableCell className="p-4">{new Date(u.created_at).toLocaleString()}</TableCell>
                                    <TableCell className={`${u.cover_image_url && "hover:bg-sidebar-ring hover:text-background cursor-pointer"} dark:hover:text-primary`}>
                                        {u.cover_image_url && <Link href={getBlogImagePath(u.cover_image_url)}
                                            target="_blank" className="p-4 flex items-center justify-center">
                                            <Image src={getBlogImagePath(u.cover_image_url)}
                                                alt={`image-${u.cover_image_url}`}
                                                width={80} height={45}
                                                className="object-cover aspect-video"
                                            />
                                        </Link>}
                                    </TableCell>
                                    <TableCell className="
                                    dark:hover:text-primary cursor-pointer
                                    text-center text-sidebar-ring 
                                    hover:bg-sidebar-ring hover:text-background">
                                        <Link href={"/admin/blog/" + u.id} className="p-4">Edit</Link>
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
                <Pagination onCreateClick={() => redirect('/admin/blog/0')} currentPage={page} totalPages={pageCount} onRefreshClick={async () => await fetchBlogs(page, query)} onPageChange={setPage} />
            </div>
        </div >
    )

}



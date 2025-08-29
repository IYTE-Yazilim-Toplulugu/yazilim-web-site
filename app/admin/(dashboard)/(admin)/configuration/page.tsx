"use client";
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
import { Configuration } from "@/types/types_config";
import ConfigurationsAll from "./(server)/configurations_get";
import ConfigurationDelete from "./[id]/(server)/configuration_delete";
import useHandleErrorCode from "@/components/handle-error-code";


export default function AdminConfigrationsPage() {
    // Data handling state
    const [configurations, setConfigurations] = useState<Configuration[]>();

    // Pagination and search state
    const [pageCount, setPageCount] = useState<number>(1);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState<string>();
    const [queryTemp, setQueryTemp] = useState<string>();

    // Sorting state
    const [sortKey, setSortKey] = useState<"id" | "key" | "value">("key");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const [loading, setLoading] = useState<boolean>(true);


    const handleErrorCode = useHandleErrorCode();

    useEffect(() => {
        fetchConfigurations(page, query);
        setLoading(false);

    }, [page, query]);

    const fetchConfigurations = async (page: number, query?: string) => {
        ConfigurationsAll(page, query).then(r => {
            setConfigurations(r.data ?? [])
            setPageCount(r.pageCount ?? 1);
        });
    }


    const handleDelete = async (id: number, title: string) => {
        if (!confirm(`Are you sure you want to delete the announcement "${title}"? This action cannot be undone.`)) {
            return;
        }
        const { data, error } = await ConfigurationDelete(id);

        if (data) {
            toast({
                title: "Announcement deleted successfully",
                description: "The announcement has been removed from the database.",
                variant: "success",
            })
            setConfigurations(prev => prev?.filter(s => s.id !== id));
        } else {
            console.error("Error deleting announcement:", error);
            handleErrorCode(null)
        }
    }

    const handleSort = (key: "id" | "key" | "value") => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };
    const sortedSurveys = configurations?.slice().sort((a, b) => {
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
                    placeholder={"Search by key..."}
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
                                    onClick={() => handleSort("key")}>* KEY {sortKey === "key" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>
                                <TableCell className="p-4 border border-gray-700 cursor-pointer select-none"
                                    onClick={() => handleSort("value")}>* VALUE {sortKey === "value" && (sortOrder === "asc" ? "↑" : "↓")}</TableCell>

                                <TableCell className="p-4 border border-gray-700">{""}</TableCell>
                                <TableCell className="p-4 border border-gray-700">{""}</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedSurveys?.map((u, i) => (
                                <TableRow key={i} className={"divide-x divide-gray-700 border border-gray-700"}>
                                    <TableCell className="p-4 text-center">{u.id}</TableCell>
                                    <TableCell className="p-4 text-center">{u.key}</TableCell>
                                    <TableCell className="p-4 relative group">
                                        <span className="peer">
                                            {u.value && JSON.stringify(u.value, null, 4).length > 50 ? JSON.stringify(u.value, null, 4).substring(0, 50) + "..." : JSON.stringify(u.value, null, 4)}
                                        </span>
                                        {JSON.stringify(u.value, null, 4).length > 50 && (
                                            <textarea className="p-2 mt-1 absolute left-1/2 -translate-x-1/2 hidden group-hover:block
                                            peer-hover:delay-500
                                            w-full min-h-48 top-full rounded-lg text-wrap
                                            bg-card text-foreground border border-gray-700
                                            shadow-lg z-40 animate-fadeIn"
                                                disabled
                                                value={JSON.stringify(u.value, null, 4)}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell className="
                                    dark:hover:text-primary cursor-pointer
                                    text-center text-sidebar-ring 
                                    hover:bg-sidebar-ring hover:text-background">
                                        <Link href={"/admin/configuration/" + u.id} className="p-4">Edit</Link>
                                    </TableCell>
                                    <TableCell className="p-4
                                    text-destructive text-center
                                    hover:bg-destructive hover:text-background
                                    dark:hover:text-primary cursor-pointer">
                                        <div onClick={async () => await handleDelete(u.id, u.key)}>Delete</div>
                                    </TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className={"mt-4 w-full flex gap-2 justify-center"}>
                <Pagination onCreateClick={() => redirect('/admin/configuration/0')} currentPage={page} totalPages={pageCount} onRefreshClick={async () => await fetchConfigurations(page, query)} onPageChange={setPage} />
            </div>
        </div >
    )

}



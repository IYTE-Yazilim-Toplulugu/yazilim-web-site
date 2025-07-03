'use client'

import Input from "@/components/admin/form/input/InputField";
import Button from "@/components/admin/ui/button/Button";
import {Search, X} from "lucide-react";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/admin/ui/table";
import Link from "next/link";
import Pagination from "@/components/admin/tables/Pagination";
import {useEffect, useState} from "react";
import {GalleryImage} from "@/types/types_gallery";
import {getGalleryImages, getImagePath} from "@/utils/gallery_client_util";
import Image from "next/image";
import {AnimatePresence, motion} from "framer-motion";
import {toast} from "@/hooks/use-toast";
import Loading from "@/components/loading";
import GalleryUpload from "@/components/GalleryUpload";
import GalleryAllServer from "@/app/admin/(dashboard)/(admin)/gallery/(server)/gallery_all";
import UserDeleteServer from "@/app/admin/(dashboard)/(admin)/user/[id]/(server)/user_delete";
import handleErrorCode from "@/components/handle-error-code";
import GalleryDeleteServer from "@/app/admin/(dashboard)/(admin)/gallery/(server)/gallery_delete";

export default function Gallery() {
    const [images, setImages] = useState<GalleryImage[]>();
    const [pageCount, setPageCount] = useState<number>(1);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState<string>();
    const [queryTemp, setQueryTemp] = useState<string>();
    const [openedImage, setOpenedImage] = useState<string>();
    const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>();
    const [isLoading, setLoading] = useState<boolean>(false);

    async function handleDelete(id: number) {
        if (!confirm(`Are you sure you want to delete image with id ${id}?`))
            return;

        const result = await GalleryDeleteServer(id);

        if (!result) {
            toast({
                variant: "default",
                description: "Success",
            });
            setImages(images?.filter(x => x.id !== id))
        }
        else {
            console.error(result.error);
            // @ts-ignore
            handleErrorCode(error.code);
        }
    }

    async function fetchImages() {
        setLoading(true);
        const { data, pageCount } = await GalleryAllServer(page, query);
        setImages(data ?? []);
        setPageCount(pageCount);
        setLoading(false);
    }

    useEffect(() => {
        fetchImages().then();
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
            { isLoading && (<Loading/>)}
            { isCreateModalOpen && (
                <AnimatePresence>
                    <motion.section
                        key="overlay2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCreateModalOpen(false)}
                        className={`fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50`}
                    >
                        <GalleryUpload className={"w-1/2"} onClick={e => e.stopPropagation()} onUpload={async () => {
                            await fetchImages();
                            setCreateModalOpen(false);
                        }}/>
                    </motion.section>
                </AnimatePresence>
            )}
            <Table className={"p-5 border-separate border-spacing-4 "}>
                <TableHeader>
                    <TableRow className={"font-bold"}>
                        <TableCell>{""}</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Uploader</TableCell>
                        <TableCell>Uploaded At</TableCell>
                        <TableCell>{""}</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        images?.map(u => {
                            const path = getImagePath(u);
                            const strId = `${u.id}`;
                            return (
                                <TableRow key={u.id}>
                                    <TableCell>
                                        <div>
                                            <AnimatePresence>
                                                {
                                                    openedImage === strId && (
                                                        <motion.section
                                                            key="overlay"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            className={`fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50`}
                                                            onClick={() => setOpenedImage(undefined)}
                                                        >
                                                            <motion.section
                                                                layoutId={openedImage}
                                                                className="relative m-4 bg-muted p-10 rounded-2xl shadow-2xl max-w-2xl w-full max-h-3/4 overflow-y-auto overflow-x-hidden scrollbar scrollbar-track-bite-tongue scrollbar-thumb-bite-tongue z-50"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => setOpenedImage(undefined)}
                                                                    aria-label="Close preview"
                                                                    className="group absolute top-4 right-4 text-muted-foreground hover:text-primary hover:bg-bite-tongue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-bite-tongue rounded-full"
                                                                >
                                                                    <X className="transition-transform duration-800 group-hover:rotate-[180deg]" />
                                                                </Button>

                                                                <Image src={path} width={1280} height={720} className={"object-cover"} alt={u.file_path}/>
                                                                <p>{u.file_path}</p>
                                                            </motion.section>
                                                        </motion.section>
                                                    )
                                                }
                                            </AnimatePresence>
                                            <motion.div layoutId={strId}>
                                                <Image title={u.file_path} src={path} width={30} height={30} alt={u.file_path} onClick={() => setOpenedImage(strId)}/>
                                            </motion.div>
                                        </div>

                                    </TableCell>

                                    <TableCell>{u.title}</TableCell>
                                    <TableCell>{u.description}</TableCell>
                                    <TableCell><Link href={"/admin/user/" + u.uploader_id} title={u.uploader_id}>{u.uploader_name}</Link></TableCell>
                                    <TableCell>{new Date(u.uploaded_at!).toLocaleString()}</TableCell>
                                    <TableCell><Button onClick={async () => await handleDelete(u.id!)} variant={"outline"} className={"cursor-pointer text-red"}>Delete</Button></TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>

            <div className={"w-full flex gap-2 justify-center"}>
                <Pagination onCreateClick={() => setCreateModalOpen(true)} currentPage={page} totalPages={pageCount} onRefreshClick={async () => await fetchImages()} onPageChange={setPage} />
            </div>
        </div>
    );
}
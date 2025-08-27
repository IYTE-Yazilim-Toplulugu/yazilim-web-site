"use client";
import Editor from "@uiw/react-md-editor";
import { getUser } from "@/utils/user_client_util";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import handleErrorCode from "@/components/handle-error-code";
import { createBlog } from "@/utils/blog_client_util";
import Label from "@/components/admin/form/Label";
import { toast } from "@/hooks/use-toast";
import Loading from "@/components/loading";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import BlogImageUpload from "../(server)/blog_image_upload";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";



export default function CreateBlogPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<User>();
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string | undefined>("");
    const [tags, setTags] = useState<string[]>([]);
    const [imageUrl, setImageUrl] = useState<string>("");
    const { theme } = useTheme()

    const t = useTranslations('blogs.create')

    useEffect(() => {
        getUser().then((user) => {
            if (!user) {
                redirect('/login');
            }
            setUserData(user);
            setLoading(false);
        })
    }, [])

    const blogCreate = async (
        author: User,
        title: string,
        content: string,
        tags: string[],
        cover_image_url: string,
        is_published: boolean
    ) => {
        const res = await createBlog(author, title, content, tags, cover_image_url, is_published);

        if (res.error) {
            console.error("Error creating blog:", res.error);
            handleErrorCode(res.error.code);
            return
        }
        toast({
            title: t('success.title'),
            description: t('success.desc'),
            variant: "success",
        })
        redirect('/blog');
    }

    const uploadBlogImage = async (file: File | null) => {
        if (!file) {
            console.error("No file selected for upload.");
            toast({
                title: t('error.title'),
                description: t('error.title'),
                variant: "destructive",
            })
            return
        }

        const res = await BlogImageUpload(file);

        if (res.error) {
            console.error("Error uploading image:", res.error);
            // @ts-ignore
            handleErrorCode(res.error.cause);
            return
        }

        setImageUrl(res.filepath)
        toast({
            title: t('image_success.title'),
            description: t('image_success.desc'),
            variant: "success",
        })

    }

    if (loading) return <Loading />;

    return (
        <div className="mt-20 flex justify-center">

            <div className="relative mt-16 m-4 md:m-16 md:max-w-3xl flex flex-col gap-8">
                <Link href="/blog">
                    <Button variant={"secondary"} className="absolute left-0 -top-8
                    bg-bite-tongue hover:bg-happy-hearts cursor-pointer
                    shadow-sm shadow-black/30 z-30"><ArrowLeft /></Button>
                </Link>
                <div>
                    <Label htmlFor="blog-title" className="text-lg font-bold mb-4">{t('title')}</Label>
                    <Input type="text" placeholder={t('title')}
                        className="w-full"
                        value={title}
                        onChange={e => e.target.value.length < 64 && setTitle(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="blog-title" className="flex flex-row items-center gap-2 text-lg font-bold mb-4" >{t('tags')}<p className="text-sm text-muted-foreground">({t('separate')})</p></Label>
                    <Input type="text"
                        onChange={e => setTags(e.target.value
                            .split(" "))}
                        value={tags.join(" ")}
                        className="w-full" />
                </div>
                <div >
                    <Label htmlFor="blog-content" className="text-lg font-bold mb-4">{t('content')}</Label>
                    <Editor value={content} height={512}
                        data-color-mode={theme === "light" ? "light" : "dark"} preview="edit"
                        onChange={(e) => setContent(e)} />
                </div>

                <div className="flex flex-row items-center gap-4 ">
                    <label className="relative inline-block cursor-pointer">
                        <span className="sr-only">{t('browse')}</span>
                        <input
                            type="file"
                            accept="image/*"
                            name="image_path"
                            onChange={(e) => uploadBlogImage(e.target.files?.[0] ?? null)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Button
                            variant="secondary"
                            className="bg-bite-tongue hover:bg-happy-hearts"
                        >
                            {t('browse')}
                        </Button>
                    </label>
                    <Label htmlFor={"image-path"}>{imageUrl ? imageUrl : t('image_path')}</Label>
                </div>
                {/* <MarkdownEditor /> */}
                <Button variant="secondary" disabled={!userData}
                    onClick={() => { userData && blogCreate(userData, title, content ?? "", tags, imageUrl, true) }}
                    className="mb-4 mx-4 md:mx-12
                hover:bg-bite-tongue cursor-pointer">
                    {t('submit')}
                </Button>
            </div>
        </div>
    )

}

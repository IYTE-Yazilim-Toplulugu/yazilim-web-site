"use client";
import Editor from "@uiw/react-md-editor";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import Form from "@/components/admin/form/Form";
import Label from "@/components/admin/form/Label";
import Input from "@/components/admin/form/input/InputField";
import Link from "next/link";
import Button from "@/components/admin/ui/button/Button";
import { toast } from "@/hooks/use-toast";
import { Blog } from "@/types/types_blog";
import BlogGet from "./(server)/blog_get";
import BlogUpdate from "./(server)/blog_update";
import BlogCreate from "./(server)/blog_create";
import BlogDelete from "./(server)/blog_delete";
import BlogImageUpload from "./(server)/blog_image_upload";
import { MessageCircleQuestionIcon } from "lucide-react";
import { getUser } from "@/utils/user_client_util";
import { useTheme } from "next-themes";
import Checkbox from "@/components/admin/form/input/Checkbox";
import useHandleErrorCode from "@/components/handle-error-code";

export default function AdminBlogPage() {
    const id = Number(useParams().id);
    const [user, setUser] = useState<any>(null);
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Record<string, string> | null>(null);
    const { theme } = useTheme();


    const handleErrorCode = useHandleErrorCode();

    useEffect(() => {
        id != 0 ? fetchBlog() : setLoading(false);
        getUser().then(userData => {
            setUser(userData?.user_metadata);
            // @ts-ignore
            setBlog(prevBlog => ({
                ...prevBlog,
                author_id: userData?.id,
            }))
        })
    }, [id]);

    const fetchBlog = async () => {
        BlogGet(id)
            .then((res) => {
                if (res.data) {
                    const blogData = res.data as Blog;
                    setBlog(blogData);
                    setLoading(false);
                    return;
                }
                console.error("Error fetching blog:", res.error);
                setLoading(false);
                // @ts-ignore
                handleErrorCode(res.error.code ?? null);
            })
    }

    const updateBlog = async () => {
        if (!blog) {
            console.error("Blog data is not available for update.");
            handleErrorCode("23503")
            return
        }

        const { data, error } = await BlogUpdate(blog);
        if (data) {
            toast({
                title: "Blog updated successfully",
                description: "The blog has been updated in the database.",
                variant: "success",
            })
            console.log("Blog updated successfully:", data);
            setBlog(data);
            return
        }
        console.error("Error updating blog:", error);
        handleErrorCode(error?.code || null);
    }

    const createBlog = async () => {
        if (!blog) {
            console.error("Blog data is not available for creation. Fill the form first.");
            toast({
                title: "Submission Error",
                description: "Please fill the form before creating a blog.",
                variant: "destructive",
            })
            return
        }

        if (user?.id == null) {
            console.error("User is not signed in or user ID is null.");
            toast({
                title: "Authentication Error",
                description: "You must be signed in to create a blog.",
                variant: "destructive",
            })
            return
        }

        const { data, error } = await BlogCreate(blog);
        if (data) {
            toast({
                title: "Blog created successfully",
                description: "The blog has been created in the database.",
                variant: "success",
            })
            setBlog(data);
            return
        }
        console.error("Error creating blog:", error);
        handleErrorCode(error?.code || null);
    }

    const deleteBlog = async () => {
        if (!confirm("Are you sure?"))
            return;

        const { data, error } = await BlogDelete(id);

        if (data) {
            toast({
                variant: "default",
                description: "Success",
            });
            setBlog(null);
            return
        }
        console.error(error);
        handleErrorCode(error.code);
    }

    const uploadBlogImage = async (file: File | null) => {
        if (!file) {
            console.error("No file selected for upload.");
            toast({
                title: "Upload Image Error",
                description: "Please select an image to upload.",
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

        // @ts-ignore
        setBlog(prevSurvey => {
            return {
                ...prevSurvey,
                cover_image_url: res.filepath
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
        setBlog(prevSurvey => {
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
                setBlog(prevBlog => {
                    if (!prevBlog) return null;

                    return {
                        ...prevBlog,
                        [e.target.name]: parsed,
                    };
                });
            }
            switch (e.target.name) {
                case "tags":
                    setError(prevError => ({
                        ...prevError,
                        tags: ""
                    }));
                    break;
            }
        } catch {
            switch (e.target.name) {
                case "tags":
                    setError(prevError => ({
                        ...prevError,
                        tags: "Invalid JSON format. Please check your input."
                    }));
                    break
            }
        }
    };

    // Handle date formatting
    let date = blog?.created_at;
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
                        <Input disabled={true} name={"id"} defaultValue={blog?.id} />

                        <Label htmlFor={"author-id"}>Author Id</Label>
                        <Input disabled={true} name={"author_id"} defaultValue={blog?.author_id} />

                        <Label htmlFor={"author-id"}>Author Name</Label>
                        <Input disabled={true} name={"author_name"} defaultValue={blog?.author_name} />

                        <Label htmlFor={"title"}>Title (text)</Label>
                        <Input type={"text"} name={"title"} onChange={handleChangeEvent} defaultValue={blog?.title} />


                        <Label htmlFor="content">Content (text)</Label>
                        <Editor value={blog?.content} onChange={e => {
                            // @ts-ignore
                            setBlog(prev => ({
                                ...prev,
                                content: e || ""
                            }));
                        }}
                            data-color-mode={theme === "light" ? "light" : "dark"} preview="edit"
                            height={512}
                        />

                        <div className={"relative group flex gap-2"}>
                            <Label htmlFor={"tags"}>Tags</Label>
                            <span className="peer text-gray-500">
                                <MessageCircleQuestionIcon className="w-5 h-5" />
                            </span>
                            <p className="p-4 mt-1 absolute left-1/3 -translate-x-1/2
                                hidden group-hover:grid
                                max-w-[20vw] text-sm overflow-auto
                                top-full rounded-lg whitespace-pre-wrap
                                bg-card text-foreground border border-gray-500
                                shadow-lg z-40 animate-fadeIn">
                                {`comma seperated array`}</p>
                        </div>
                        <textarea name={"tags"}
                            onChange={handleChangeJSON}
                            defaultValue={blog?.tags ? JSON.stringify(blog.tags, null, 4) : ""}
                            className="w-full p-2 dark:bg-gray-900 rounded-md border border-gray-700 shadow-sm outline-none"
                            placeholder="Type questions in JSON format"
                            rows={10}
                        />
                        {error && (<p className="text-destructive">{error["tags"]}</p>)}

                        <div className="flex flex-row gap-4">
                            <Label htmlFor={"image-path"}>Image Path (e.g image.png)</Label>
                            <input type="file" accept="image/*"
                                name="cover_image_url"
                                onChange={e => uploadBlogImage(e.target.files?.[0] ?? null)}
                                className="cursor-pointer file:cursor-pointer file:rounded-md file:border-0
                                file:bg-bite-tongue file:px-4 file:py-2 file:text-sm file:font-semibold
                                file:text-background hover:file:bg-copper-coin transition-colors duration-200
                                text-transparent"
                            />
                        </div>
                        <input type={"text"} name={"cover_image_url"} placeholder="No files found" onChange={handleChangeEvent} value={blog?.cover_image_url || "/images/yazilim.png"} />

                        <Label htmlFor={"created-at"}>Created At</Label>
                        <Input disabled name={"created_at"} onChange={handleChangeEvent} defaultValue={blog?.created_at} />

                        <Label htmlFor={"published-at"}>PUBLISHED AT</Label>
                        <Input disabled name={"published_at"} onChange={handleChangeEvent} defaultValue={blog?.published_at} />
                        <Label htmlFor={"updated-at"}>UPDATED AT</Label>
                        <Input disabled name={"updated_at"} onChange={handleChangeEvent} defaultValue={blog?.updated_at} />

                        <div className={"flex gap-2 w-[100%] justify-center"}>
                            <Checkbox label={"Is Published"} onChange={x => handleChange("is_published", x)} checked={blog?.is_published ?? false} />
                        </div>



                        <div className={"flex w-[100%]"}>
                            <div className={"gap-2 flex items-center"}>
                                <Link href={"/admin/blog"}>
                                    <Button variant={"outline"} className="cursor-pointer">
                                        Back
                                    </Button>
                                </Link>
                                {id != 0 && <Link href={"/admin/blog/0"}>
                                    <Button variant={"outline"} className="cursor-pointer">
                                        Create
                                    </Button>
                                </Link>}
                            </div>
                            <div className={"gap-2 flex justify-end w-[100%]"}>
                                <Link href={"/blog/" + blog?.id}>
                                    <Button variant={"outline"} className="cursor-pointer">
                                        Go To Blog
                                    </Button>
                                </Link>
                                <Button variant={"outline"} className="cursor-pointer" onClick={() => id && deleteBlog()}>
                                    Delete
                                </Button>
                                <Button className="cursor-pointer" onClick={() => id ? updateBlog() : createBlog()}>
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

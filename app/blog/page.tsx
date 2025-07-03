"use client";
import { useEffect, useState } from "react";
import Image from "next/image"
import Link from "next/link";
import {
    Card,
    CardContent,
    CardFooter,
    CardTitle,
    CardHeader,
} from "@/components/ui/card";
import { Blog } from "@/types/types_blog";
import { getBlogImagePath, getBlogs } from "@/utils/blog_client_util";
import handleErrorCode from "@/components/handle-error-code";
import Loading from "@/components/loading";
import Button from "@/components/admin/ui/button/Button";
import { ExternalLink, PlusIcon } from "lucide-react";
import blogAuthorGet from "./(server)/blog_user_get";
import { User } from "@supabase/supabase-js";
import { getUser } from "@/utils/user_client_util";


export default function BlogsPage() {
    const [blogsData, setBlogsData] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<User>();

    useEffect(() => {
        getUser().then((user) => { setUserData(user); })
        fetchBlogs().then(() => setLoading(false));
    }, []);

    const fetchBlogs = async () => {
        const res = await getBlogs(true);

        if (res.error) {
            console.error("Error fetching blogs:", res.error);
            handleErrorCode(res.error.code);
            return
        }
        setBlogsData(res.data || []);
    };



    if (loading) return (<Loading />)

    return (

        <div className="mt-20">
            <Link href={userData ? "/blog/create" : "/blog/create"}>
                <button
                    className="mx-4 md:mx-12 gap-2 flex items-center h-10 justify-center rounded-lg
                    border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700
                    shadow-theme-xs hover:bg-gray-50 disabled:opacity-50
                    dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400
                    dark:hover:bg-white/[0.03] text-sm cursor-pointer"
                >
                    {userData ? "Create New" : "Login for Create"}
                    {userData && <PlusIcon />}
                </button>
            </Link>
            <div className="m-4 md:m-12 md:mt-8 flex flex-col gap-8">
                {blogsData && blogsData.length > 0 && (() => {
                    const firstBlog = blogsData[0];

                    return (
                        <div className="flex flex-col rounded-2xl overflow-hidden">
                            <div className="relative w-full h-64">
                                <Image
                                    src={getBlogImagePath(firstBlog.cover_image_url) || "/images/yazilim.png"}
                                    alt={firstBlog.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <Card className="relative -top-4 h-80 md:h-40 border-border w-full rounded-2xl z-20">
                                <CardHeader className="flex flex-wrap gap-2">
                                    <CardTitle>{firstBlog.title}</CardTitle>
                                    {/* <p>{blogAuthorGet(firstBlog.author_id)}</p> */}
                                    <p className="text-muted-foreground">{new Date(firstBlog.published_at).toLocaleDateString('tr-TR')}</p>
                                </CardHeader>
                                <CardContent >
                                    <p>{firstBlog.content.length > 100 ? firstBlog.content.substring(0, 100) + "..." : firstBlog.content}</p>
                                </CardContent>
                                <CardFooter className="absolute bottom-4 right-4">
                                    <Link href={`/blog/${firstBlog.id}`}>
                                        <Button size="sm" variant="primary" type="button"
                                            startIcon={<ExternalLink className="w-4 h-4" />}
                                            className="text-xs bg-bite-tongue cursor-pointer">
                                            Read more
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>
                    )
                })()}
                <div className="md:mx-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {blogsData && blogsData.length > 0 && blogsData.slice(1).map((blog, id) => (
                        <div
                            key={id}
                            className="relative flex flex-col rounded-2xl overflow-hidden"
                        >
                            <div className="relative w-full h-48">
                                <Image
                                    src={getBlogImagePath(blog.cover_image_url) || "/images/yazilim.png"}
                                    alt={blog.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <Card className="relative -top-4 h-80 border-border w-full rounded-2xl z-20">
                                <CardHeader className="flex flex-wrap gap-2">
                                    <CardTitle>{blog.title}</CardTitle>
                                    <p className="text-muted-foreground">{new Date(blog.published_at).toLocaleDateString('tr-TR')}</p>
                                </CardHeader>
                                <CardContent >
                                    <p>{blog.content.length > 100 ? blog.content.substring(0, 100) + "..." : blog.content}</p>
                                </CardContent>
                                <CardFooter className="absolute bottom-0 right-0">
                                    <Link href={`/blog/${blog.id}`}>
                                        <Button size="sm" variant="primary" type="button"
                                            startIcon={<ExternalLink className="w-4 h-4" />}
                                            className="text-xs bg-bite-tongue cursor-pointer">
                                            Read more
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

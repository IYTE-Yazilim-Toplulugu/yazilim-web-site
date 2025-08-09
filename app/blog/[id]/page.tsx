'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "@/components/loading";
import { Blog } from "@/types/types_blog";
import { useParams } from "next/navigation";
import { getBlog, getBlogImagePath } from "@/utils/blog_client_util";
import handleErrorCode from "@/components/handle-error-code";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { useIsMobile } from "@/components/ui/use-mobile";
import MarkdownComponents from "@/components/markdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogMarkdown from "@/components/blog-markdown";


export default function BlogPage() {
    const id = Number(useParams().id);
    const [blogData, setBlogData] = useState<Blog | null>(null);
    const [previousBlog, setPreviousBlog] = useState<Blog | null>(null);
    const [nextBlog, setNextBlog] = useState<Blog | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const isMobile = useIsMobile()


    useEffect(() => {
        if (id) {
            fetchBlog(id).then(() => setLoading(false));
        }
    }, [])

    const fetchBlog = async (id: number) => {
        const res = await getBlog(id)

        if (res.error) {
            console.error("Error fetching blog:", res.error);
            handleErrorCode(res.error.code);
            return null
        }
        switch (res.data.length) {
            case 0:
                break
            case 1:
                setBlogData(res.data[0] || {});
                break
            default:
                res.data.forEach((blog: Blog) => {
                    switch (blog.id) {
                        case id - 1:
                            setPreviousBlog(blog);
                            break
                        case id + 1:
                            setNextBlog(blog);
                            break
                        case id:
                            setBlogData(blog);
                            break
                    }
                })
        }
    }


    if (loading) return (<Loading />);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mt-20 m-4 flex justify-center"
        >
            <div className={`container max-w-3xl relative m-4 p-6 bg-muted dark:bg-card rounded-lg shadow-xl`}>
                <Link href="/blog">
                    <Button variant={"secondary"} className="absolute left-4 -top-2
                    bg-bite-tongue hover:bg-happy-hearts cursor-pointer
                    shadow-sm shadow-black/30 z-30"><ArrowLeft /></Button>
                </Link>
                <div className="relative">
                    <Image
                        src={getBlogImagePath(blogData?.cover_image_url || null) || "/images/yazilim.png"}
                        width={1280}
                        height={720}
                        alt="Blog Cover"
                        className="w-full rounded-lg object-cover aspect-video"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent rounded-b-lg z-10" />
                    {!isMobile && <h1 className="absolute bottom-6 md:bottom-20 left-6 text-xl md:text-2xl lg:text-3xl text-background dark:text-primary font-bold z-20">
                        {blogData?.title}
                    </h1>}
                </div>
                <div className="mb-4 p-2 flex flex-col border-b border-border items-center">
                    {isMobile && <h1 className="text-xl mb-4 font-bold z-20">
                        {blogData?.title}
                    </h1>}
                    <p className="text-muted-foreground self-start">
                        {/* @ts-ignore */}
                        {new Date(blogData?.published_at).toLocaleDateString('tr-TR')}
                    </p>
                </div>
                <BlogMarkdown content={blogData?.content || ""} />

                <p className="text-sm text-muted-foreground mx-8 mt-4">Tags: {blogData?.tags.join(", ")}</p>

                <div className="flex justify-between items-start mt-4">
                    <Link href={`/blog/${id - 1}`} className="text-start">
                        {previousBlog && <p className="text-sm">See Previous Blog</p>}
                        <p>{previousBlog && previousBlog.title}</p>
                    </Link>
                    <Link href={`/blog/${id + 1}`} className="text-end">
                        {nextBlog && <p className="text-sm">See Next Blog</p>}
                        <p>{nextBlog && nextBlog.title}</p>
                    </Link>
                </div>
            </div>
        </motion.div>
    )

}

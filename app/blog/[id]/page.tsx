'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "@/components/loading";
import { Blog } from "@/types/types_blog";
import { useParams } from "next/navigation";
import { getBlog, getBlogImagePath } from "@/utils/blog_client_util";
import handleErrorCode from "@/components/handle-error-code";
import Image from "next/image";
import { useIsMobile } from "@/components/ui/use-mobile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogMarkdown from "@/components/blog-markdown";
import YazilimBlankPage from "@/components/blank-page";
import { useTranslations } from "next-intl";


export default function BlogPage() {
    const id = Number(useParams().id);
    const [blogData, setBlogData] = useState<Blog | null>(null);
    const [previousBlog, setPreviousBlog] = useState<Blog | null>(null);
    const [nextBlog, setNextBlog] = useState<Blog | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const isMobile = useIsMobile()

    const t = useTranslations('blogs.read')


    useEffect(() => {
        if (id) {
            fetchBlog(id).then(() => setLoading(false));
        }
    }, [])

    const fetchBlog = async (id: number) => {
        const { current, prev, next, error } = await getBlog(id)

        if (error) {
            console.error("Error fetching blog:", error);
            handleErrorCode(error.code);
            return null
        }

        setBlogData(current || null);
        setPreviousBlog(prev || null);
        setNextBlog(next || null);
    }


    if (loading) return (<Loading />);
    if (blogData === null) return (<div className="mt-16">
        <YazilimBlankPage content="No Blog Found" emoji="😴" />
        <Link href={"/blog"}>
            <button
                className="absolute top-96 left-1/2 transform -translate-x-1/2
        w-fit h-10 px-3.5 py-2.5
        gap-2 flex items-center justify-center 
        rounded-lg border border-gray-300 bg-white 
        text-gray-700 shadow-theme-xs 
        hover:bg-gray-50 disabled:opacity-50 
        dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 
        dark:hover:bg-white/[0.03] text-sm cursor-pointer z-50"
            >
                <ArrowLeft />
                {t('go_back')}
            </button>
        </Link>

    </div>)

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
                    {isMobile && <p className="text-nowrap text-muted-foreground self-start">{blogData?.author_name}</p>}
                    {isMobile && <h1 className="text-xl mb-4 font-bold z-20">
                        {blogData?.title}
                    </h1>}
                    <p className="flex flex-wrap w-full justify-between text-muted-foreground">
                        {/* @ts-ignore */}
                        <div className="">{new Date(blogData?.published_at).toLocaleDateString('tr-TR')}</div>
                        {!isMobile && <p className="text-nowrap">{blogData?.author_name}</p>}
                    </p>
                </div>
                <BlogMarkdown content={blogData?.content || ""} />

                <p className="text-sm text-muted-foreground mx-8 mt-4">{t("tags")}: {blogData?.tags.join(", ")}</p>

                <div className="flex justify-between items-start mt-4">
                    <Link href={`/blog/${previousBlog?.id}`} className="text-start">
                        {previousBlog && <p className="text-sm">{t('prev_blog')}</p>}
                        <p>{previousBlog && previousBlog.title}</p>
                    </Link>
                    <Link href={`/blog/${nextBlog?.id}`} className="text-end">
                        {nextBlog && <p className="text-sm">{t('next_blog')}</p>}
                        <p>{nextBlog && nextBlog.title}</p>
                    </Link>
                </div>
            </div>
        </motion.div>
    )

}

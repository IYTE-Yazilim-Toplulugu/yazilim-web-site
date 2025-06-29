"use client";

import { createClient } from "@/lib/supabase/client"; 

import { blog } from "@/types/types";

import Image from "next/image"
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export default function Blog() {

  const [blogArray, setBlogArray] = useState<blog[]>([]);

  const supabase = createClient()

  useEffect(() => {
    async function fetchBlogPosts() {

      const { data, error } = await supabase
        .from("blogs")
        .select("id, slug, title, content, cover_image_url, clicked")
        .order("clicked", { ascending: false })
        .limit(4);

      if (error) throw new Error(error.message);

      setBlogArray(data || []);
    }
    fetchBlogPosts();
  }, []);

  return (

    <div className="min-h-screen pt-16">
      <div className="flex flex-col space-y-10 m-10">
        {blogArray[0] && (
          <div className="flex flex-col flex-[3] ml-12 mr-18 flex-col border-white border-1 rounded-2xl overflow-hidden">
            <div className="relative w-full h-64">
              <Image
                src={blogArray[0].cover_image_url}
                alt={blogArray[0].title}
                fill
                className="rounded-t-2xl object-cover"
                priority
              />
            </div>
            <Card className="max-w h-full w-full rounded-b-2xl">
              <CardHeader>
                <CardTitle>{blogArray[0].title}</CardTitle>
                <CardDescription>{blogArray[0].content}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{blogArray[0].content}</p>
              </CardContent>
              <CardFooter className="flex flex-ver">
                <div className="flex-[1]" />
                <div className="flex flex-[1] justify-end">
                  <Link href={`/blog/${blogArray[0].slug}`}>
                    <button className="underline text-blue-600">Read more</button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
        <div className="flex space-x-6 ml-12 mr-18">
          {blogArray.slice(1).map((blog) => (
            <div
              key={blog.id}
              className="flex-1 border-white border-1 rounded-2xl overflow-hidden"
            >
              <div className="relative w-full h-48 rounded-t-2xl overflow-hidden">
                <Image
                  src={blog.cover_image_url}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>
              <Card className="h-full w-full rounded-b-2xl">
                <CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription>{blog.content}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{blog.content}</p>
                </CardContent>
                <CardFooter className="flex">
                  <div className="flex-1" />
                  <div className="flex justify-end">
                    <Link href={`/blog/${blog.slug}`}>
                      <button className="underline text-blue-600">Read more</button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

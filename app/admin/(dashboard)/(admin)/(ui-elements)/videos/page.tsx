import PageBreadcrumb from "@/components/admin/common/PageBreadCrumb";
import VideosExample from "@/components/admin/ui/video/VideosExample";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Next.js Videos | TailAdmin - Next.js Dashboard Template",
    description:
        "This is Next.js Videos page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function VideoPage() {
    return (
        <div>

            <PageBreadcrumb pageTitle="Videos" />
            <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=MstljEAD-0DUPWV6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

            <VideosExample />

        </div>
    );
}

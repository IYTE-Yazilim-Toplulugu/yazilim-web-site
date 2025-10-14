"use client";
import ContactForm from "@/components/contact-form";
import Loading from "@/components/loading";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";


export default function Contact() {
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();
    const router = useRouter();

    const [initialData, setInitialData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        // Get name, email, subject and message from URL query parameters
        const name = searchParams.get('name') || '';
        const email = searchParams.get('email') || '';
        const subject = searchParams.get('subject') || '';
        const message = searchParams.get('message') || '';

        setInitialData({
            name,
            email,
            subject,
            message
        });

        // Remove query parameters from URL after reading them
        if (searchParams.toString()) {
            router.replace('/contact');
        }

        setLoading(false);
    }, [searchParams, router])

    if (loading) return (<Loading />)

    return (
        <div className="mt-32 mx-w-2xl mx-auto px-4">
            <ContactForm initialData={initialData} />
        </div>
    )
}

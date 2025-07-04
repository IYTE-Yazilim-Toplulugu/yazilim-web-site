"use client";
import ContactForm from "@/components/contact-form";
import Loading from "@/components/loading";
import { useEffect, useState } from "react";


export default function Contact() {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(false);
    })

    if (loading) return (<Loading />)

    return (
        <div className="mt-32 mx-w-2xl mx-auto px-4">
            <ContactForm />
        </div>
    )
}

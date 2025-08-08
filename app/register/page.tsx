"use client"

import { handleAuthMessage } from "@/lib/auth";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getUser } from "@/utils/user_client_util";

export default function RegisterPage() {

    const params = useSearchParams();
    const msg = params.get("msg");

    useEffect(() => {
        getUser().then(x => {
            if (x && window)
                window.location.href = '/';
        });
    }, [window.location]);

    handleAuthMessage(window);

    return (
        <div>
            <iframe className="w-dvw h-dvh" src={"http://192.168.1.9:3001/register" + (msg != null ? "?msg=" + msg : "")}>

            </iframe>
        </div>
    );
}

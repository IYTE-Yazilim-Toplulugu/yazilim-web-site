"use client"

import { handleAuthMessage } from "@/lib/auth";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getUser } from "@/utils/user_util";
import { useTheme } from "next-themes";


export default function Login() {
    const params = useSearchParams();
    const msg = params.get("msg");
    const rel = params.get("reload");
    // const { theme, setTheme } = useTheme();
    //
    // useEffect(() => {
    //     setTheme('dark');
    // }, [])

    if (typeof window !== "undefined") {
        if (rel === 'true') {
            window.location.href = '/login';
            //window.location.reload();
        }

        useEffect(() => {
            getUser().then(x => {
                if (x && window)
                    window.location.href = '/';
            });
        }, [window.location]);

        handleAuthMessage(window);
    }

    return (
        <div>
            <iframe className="w-dvw h-dvh" src={"http://192.168.1.10:3001/login" + (msg != null ? "?msg=" + msg : "")}>

            </iframe>
        </div>
    )
}

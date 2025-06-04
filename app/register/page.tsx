"use client"

import {handleAuthMessage} from "@/lib/auth";
import {useSearchParams} from "next/navigation";

export default function RegisterPage(){

    const params = useSearchParams();
    const msg = params.get("msg");

    handleAuthMessage(window);

    return (
        <div>
            <iframe className="w-dvw h-dvh" src={"http://localhost:3001/register" + (msg != null ? "?msg=" + msg : "")}>

            </iframe>
        </div>
    );
}
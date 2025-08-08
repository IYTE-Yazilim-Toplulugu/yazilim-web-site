"use client"

import { handleAuthMessage } from "@/lib/auth";
import { useSearchParams } from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import { getUser } from "@/utils/user_client_util";
import Loading from "@/components/loading";


const _Login = function () {
    const params = useSearchParams();
    const msg = params.get("msg");
    const rel = params.get("reload");
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
        }, [window.location]);

        handleAuthMessage(window);
    }

    if (loading) return <Loading />

    return (
        <div>
            <iframe className="w-dvw h-dvh" src={"http://192.168.1.9:3001/login" + (msg != null ? "?msg=" + msg : "")}>

            </iframe>
        </div>
    )
}

const Login = () => (<Suspense><_Login></_Login></Suspense>)

export default Login;
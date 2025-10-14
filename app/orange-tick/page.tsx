"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { getSessionUser, getUserInfo } from "@/utils/user_client_util";
import { useTranslations } from "next-intl";
import Loading from "@/components/loading";

export default function OrangeTickAppPage() {
    const [loading, setLoading] = useState<boolean>(true);

    const t = useTranslations('orangetick')

    const router = useRouter();


    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const userSession = await getSessionUser();

            if (!userSession?.id) {
                toast({
                    title: t('login.title'),
                    description: t('login.desc'),
                    variant: "default",
                });
                router.push("/login");
            }
            // @ts-ignore
            const { data, error } = await getUserInfo(userSession.id)

            console.log(data);

            if (error || !data) {
                console.error("Error fetching user info:", error);
                router.push("/login");
            }

            if (data.is_special) {
                setLoading(false);
                return
            }
            toast({
                title: t('not.title'),
                description: t('not.desc'),
                variant: "destructive",
            });
            router.push("/");

        } catch (error) {
            console.error("Error fetching user data:", error);
            router.push("/login");
        }
    };

    if (loading) return <Loading />

    // If user is special, render the page content
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Special User Content</h1>
            <p className="text-lg">Welcome to the special OrangeTick page!</p>
            {/* Add your special content here */}
        </div>
    );
}

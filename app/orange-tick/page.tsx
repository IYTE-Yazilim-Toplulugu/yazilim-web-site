"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { getSessionUser, getUserInfo } from "@/utils/user_client_util";
import { useTranslations } from "next-intl";
import Loading from "@/components/loading";
import { motion } from "framer-motion";
import { ErrorBoundary } from "@/components/error-boundary";
import { SectionFallback } from "@/components/section-fallback";
import OrangeTickSection from "@/components/orange-tick-section";
import { Loader2 } from "lucide-react";

// Simple loading component
function LoadingSection({ name }: { name: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading {name} section...</p>
        </div>
    )
}

export default function OrangeTickAppPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<any>(null);

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

            if (error || !data) {
                console.error("Error fetching user info:", error);
                router.push("/login");
            }

            if (data.is_special) {
                setUser(data);
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-24"
        >
            <ErrorBoundary fallback={<SectionFallback title="OrangeTick" />}>
                <Suspense fallback={<LoadingSection name="OrangeTick" />}>
                    <OrangeTickSection user={user} />
                </Suspense>
            </ErrorBoundary>
        </motion.div>
    );
}

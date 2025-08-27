"use client"
import { toast } from "@/hooks/use-toast"
import { useTranslations } from "next-intl";


const handleErrorCode = (code: string | null) => {
    const t = useTranslations('error')
    switch (code) {
        case '404':
            toast({
                title: t("error.404.title"),
                description: t("error.404.description"),
                variant: "destructive",
            });
            break;

        case "23514":
            toast({
                title: t("error.23514.title"),
                description: t("error.23514.description"),
                variant: "destructive",
            });
            break;

        case '23503': // Foreign key violation
            toast({
                title: t("error.23503.title"),
                description: t("error.23503.description"),
                variant: "destructive",
            });
            break;

        case '23502': // Not null violation
            toast({
                title: t("error.23502.title"),
                description: t("error.23502.description"),
                variant: "destructive",
            });
            break;

        case '23505': // Unique violation
            toast({
                title: t("error.23505.title"),
                description: t("error.23505.description"),
                variant: "default",
            });
            break;

        case '22001': // Value too long
            toast({
                title: t("error.22001.title"),
                description: t("error.22001.description"),
                variant: "destructive",
            });
            break;

        case '42601': // Syntax error
            toast({
                title: t("error.42601.title"),
                description: t("error.42601.description"),
                variant: "destructive",
            });
            break;

        case '42501': // Insufficient privilege
            toast({
                title: t("error.42501.title"),
                description: t("error.42501.description"),
                variant: "destructive",
            });
            break;

        case '08006': // Connection failure
        case '08003': // Connection does not exist
        case '08004': // Operation not supported
            toast({
                title: t("error.08006.title"),
                description: t("error.08006.description"),
                variant: "destructive",
            });
            break;

        default:
            toast({
                title: t("error.default.title"),
                description: t("error.default.description"),
                variant: "destructive",
            });
    }
};

export default handleErrorCode

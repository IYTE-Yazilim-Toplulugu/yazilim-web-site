"use client";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export default function LanguageSwitcher() {
    const [locale, setLocale] = useState<string>("tr");
    const [, setCookie] = useCookies(["locale"]);
    const router = useRouter();
    const t = useTranslations("header");

    useEffect(() => {
        // Get initial locale from cookie or default to 'tr'
        const cookieLocale = document.cookie
            .split('; ')
            .find(row => row.startsWith('locale='))
            ?.split('=')[1] || "tr";

        setLocale(cookieLocale);
    }, []);

    const toggleLanguage = () => {
        const newLocale = locale === "tr" ? "en" : "tr";
        setLocale(newLocale);

        // Set cookie for 30 days
        setCookie("locale", newLocale, {
            path: "/",
            maxAge: 30 * 24 * 60 * 60,
            sameSite: true
        });

        // Refresh the page to apply the new locale
        router.refresh();
    };

    return (
        <div className="flex items-center space-x-2">
            <Label htmlFor="language-toggle" className="text-sm font-medium">
                TR
            </Label>
            <Switch
                id="language-toggle"
                checked={locale === "en"}
                onCheckedChange={toggleLanguage}
                aria-label={t("rside.language_switch") || "Switch language"}
            />
            <Label htmlFor="language-toggle" className="text-sm font-medium">
                EN
            </Label>
        </div>
    );
}


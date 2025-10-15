"use client"
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Loading from "@/components/loading";
import useHandleErrorCode from "@/components/handle-error-code";
import { Discount } from "@/types/types_orangetick";
import { getDiscounts } from "@/utils/orangetick_client_utils";
import { SectionHeader } from "@/components/ui/section-container";
import { AnimatePresence, motion } from "framer-motion";
import { DiscountCard } from "@/components/discount-card";
import { Button } from "@/components/ui/button";
import { getSessionUser, getUser, getUserInfo } from "@/utils/user_client_util";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { User } from "@supabase/supabase-js";



export default function OrangeTickPage() {
    const [user, setUser] = useState<{ name: string | null, email: string | null, phone: string | null, is_special: boolean }>({ name: null, email: null, phone: null, is_special: false });

    const [discounts, setDiscounts] = useState<Discount[]>();
    const [showDesc, setShowDesc] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);

    const handleErrorCode = useHandleErrorCode()

    const t = useTranslations('orangetick')

    const router = useRouter();

    useEffect(() => {
        fetchData();

        getUser().then(user => {
            console.log(user);
            if (!user) {
                return
            }
            setUser({ email: user.email ?? null, name: null, phone: null, is_special: false });
            return getUserInfo(user.id);
        }).then((res) => {
            if (!res || !res.data) {
                return
            }
            setUser(prevUser => ({ ...prevUser, name: res.data.full_name ?? null, phone: res.data.phone ?? null, is_special: res.data.is_special ?? false }));
        }).then(() => setLoading(false));
    }, [])

    const fetchData = async () => {
        try {
            const { data, error } = await getDiscounts()

            if (error || !data) {
                handleErrorCode(error?.code || "unknown")
            }

            setDiscounts(data)

        } catch (error) {
            console.error(error)
            handleErrorCode("unknown")

        }
    }

    if (loading) return <Loading />

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mt-16'
        >
            <SectionHeader title={t('title')} titleClassName='mt-4 bg-clip-text text-transparent bg-gradient-to-r from-happy-hearts to-golden-nugget' decorative={false} >
                <motion.span
                    className="absolute -bottom-2 left-2 h-1 bg-primary rounded-l-full bg-gradient-to-r from-golden-nugget to-background to-99%"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.6 }}
                />
            </SectionHeader>
            <Button className="flex justify-center mt-4 mx-auto bg-bite-tongue text-white hover:bg-card cursor-pointer"
                variant="outline" size="lg"
                onClick={() => { user.is_special ? window.open("/orange-tick") : setShowDesc(true) }}
            >
                {user.is_special ? t('btn.use') : t('btn.get')}
            </Button>
            <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {discounts && discounts.map((discount) => (
                    <DiscountCard key={discount.id} discount={discount} />
                ))}
            </div>
            <AnimatePresence>
                {showDesc && (
                    <motion.section
                        key="contact-popup"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
                        onClick={() => setShowDesc(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative bg-muted p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setShowDesc(false)}
                                aria-label="Close popup"
                                className="group absolute -top-2 -right-2 text-muted-foreground hover:text-primary hover:bg-bite-tongue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-bite-tongue rounded-full"
                            >
                                <X className="transition-transform duration-800 group-hover:rotate-[180deg]" />
                            </Button>
                            <div className="p-4 font-bold text-2xl text-center">{t('popup.desc.contact')}</div>

                            <Button
                                onClick={() => {
                                    router.push(user.name ? `/contact?name=${user.name}&email=${user.email}&subject=${t('popup.contact.subject')}&message=${t('popup.contact.message', { "name": `${user.name}`, "email": `${user.email}`, "phone": `${user.phone}` })}` : `/contact?subject=${t('popup.contact.subject')}&message=${t('popup.contact.message', { "name": `(isminiz)`, "email": `(emailiniz)`, "phone": `(telefon numaraniz)` })}`);
                                }}
                                className="w-full bg-bite-tongue hover:bg-happy-hearts text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {t('popup.btn.contact')}
                            </Button>
                        </motion.div>
                    </motion.section>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

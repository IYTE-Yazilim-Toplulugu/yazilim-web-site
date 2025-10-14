"use client"
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Loading from "@/components/loading";
import useHandleErrorCode from "@/components/handle-error-code";
import { Discount } from "@/types/types_orangetick";
import { getDiscounts } from "@/utils/orangetick_client_utils";
import { SectionHeader } from "@/components/ui/section-container";
import { motion } from "framer-motion";
import { DiscountCard } from "@/components/discount-card";



export default function OrangeTickPage() {
    const [discounts, setDiscounts] = useState<Discount[]>();
    const [loading, setLoading] = useState<boolean>(true);

    const handleErrorCode = useHandleErrorCode()

    const t = useTranslations('orangetick')


    useEffect(() => {
        fetchData();

    }, [])

    const fetchData = async () => {
        try {
            const { data, error } = await getDiscounts()
            console.log(data, error)

            if (error || !data) {
                handleErrorCode(error?.code || "unknown")
            }

            setDiscounts(data)

        } catch (error) {
            console.error(error)
            handleErrorCode("unknown")

        } finally {
            setLoading(false)
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
            <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {discounts && discounts.map((discount) => (
                    <DiscountCard key={discount.id} discount={discount} />
                ))}
            </div>
        </motion.div>
    )
}

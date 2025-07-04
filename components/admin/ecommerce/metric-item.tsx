import { BadgeProps } from "@/components/ui/badge"
import { ArrowUpIcon, GroupIcon } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"
import Badge from "../ui/badge/Badge"

export default function MetricItem({ icon, title, count, link, badgeColor, badgeIcon, badgeText }: {
    icon?: ReactNode,
    title: string,
    count: number,
    link?: string,
    badgeColor?: BadgeProps['color'],
    badgeIcon?: ReactNode,
    badgeText?: string
}) {
    return (
        <Link href={link || '/admin'} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                {icon || <GroupIcon className="text-gray-800 dark:text-white/90" />}
            </div>

            <div className="flex items-end justify-between mt-5">
                <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {title}
                    </span>
                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                        {count}
                    </h4>
                </div>
                {/* @ts-ignore */}
                <Badge color={badgeColor || 'success'}>
                    {badgeIcon || <ArrowUpIcon />}
                    {badgeText || '0%'}
                </Badge>
            </div>
        </Link>
    )
}

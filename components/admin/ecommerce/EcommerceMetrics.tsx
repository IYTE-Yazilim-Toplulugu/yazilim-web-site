"use client";
import { useEffect } from "react";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/components/admin/icons";
import { useState } from "react";
import MetricItem from "./metric-item";
import GetCounts from "@/app/admin/(dashboard)/(admin)/(server)/counts_get";



export const EcommerceMetrics = () => {
    const [userCount, setUserCount] = useState(0);
    const [diff, setDiff] = useState<{
        userCount?: { diff: number; date: string; count: number };
        formCount?: { diff: number; date: string; count: number };
    }>({});
    const [formCount, setFormCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            const data = await GetCounts(); // returns { userCount, formCount }
            setUserCount(data.userCount);
            setFormCount(data.formCount);

            const today = new Date().toISOString().split("T")[0];

            const metrics = [
                { key: "dailyUserCount", name: "userCount", current: data.userCount },
                { key: "dailyFormCount", name: "formCount", current: data.formCount },
            ];

            metrics.forEach(({ key, name, current }) => {
                const stored = localStorage.getItem(key);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    const { date: prevDate, count: prevCount } = parsed;

                    if (prevDate !== today) {
                        const diff = ((current - prevCount) / (prevCount || 1)) * 100;

                        setDiff(prev => ({
                            ...prev,
                            [name]: {
                                diff: diff.toFixed(1), // optional rounding
                                date: today,
                                count: current,
                            },
                        }));

                        localStorage.setItem(
                            key,
                            JSON.stringify({ name, date: today, count: current })
                        );
                    }
                } else {
                    // First-time store
                    localStorage.setItem(
                        key,
                        JSON.stringify({ name, date: today, count: current })
                    );
                }
            });
        };

        fetchCounts();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            <MetricItem count={userCount || 0} title="Users" link="/admin/user/all"
                icon={<GroupIcon className="text-gray-800 dark:text-white/90" />}
                badgeColor="success" badgeIcon={
                    <ArrowUpIcon className="text-success-500" />
                } badgeText={`${diff?.userCount?.diff && diff.userCount.diff > 0 ? "+" : "-"}${diff.userCount?.diff ?? "0"}%`} />

            <MetricItem icon={<BoxIconLine className="text-gray-800 dark:text-white/90" />}
                count={formCount || 0} title="Forms" link="/admin/survey" badgeColor="warning"
                badgeIcon={<ArrowDownIcon className="text-warning-500" />} badgeText={`${diff?.formCount?.diff && diff.formCount.diff > 0 ? "+" : "-"}${diff.formCount?.diff ?? "0"}%`} />
        </div>
    );
};

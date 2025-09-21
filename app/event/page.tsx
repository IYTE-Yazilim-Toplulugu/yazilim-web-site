"use client";
import { useEffect, useState } from "react";
import { Event } from "@/types/types_event";
import Link from "next/link";
import Loading from "@/components/loading";
import YazilimBlankPage from "@/components/blank-page";
import { useTranslations } from "next-intl";
import useHandleErrorCode from "@/components/handle-error-code";
import { getEventImagePath, getEvents } from "@/utils/event_client_util";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import BlogMarkdown from "@/components/blog-markdown";
import Button from "@/components/admin/ui/button/Button";
import { BookCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";


export default function EventsPage() {
    const [events, setEvents] = useState<Event[] | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    const t = useTranslations('events')

    const handleErrorCode = useHandleErrorCode();

    useEffect(() => {
        fetchEvents().then(() => setLoading(false));
    }, [])

    const fetchEvents = async () => {
        const res = await getEvents();

        if (res.error) {
            console.error("Error fetching events:", res.error);
            handleErrorCode(res.error.code);
            return
        }
        setEvents(res.data || []);
    };

    if (loading) return (<Loading />)

    if (!events || events.length === 0) return <div className="mt-20"><YazilimBlankPage content={t("not_found")} emoji="⏳" /></div>
    // return <div className="mt-20"><YazilimBlankPage content={t("not_found")} emoji="⏳" /></div>

    return (
        <div className="mt-20">
            <div className="flex flex-col justify-center items-center mx-4 md:mx-12 gap-8 md:gap-10">
                {events && events.length > 0 && events.map((event, id) => (
                    <div
                        key={id}
                        className="relative w-full md:w-1/2 2xl:w-1/3 rounded-2xl overflow-hidden"
                    >
                        <div className="relative w-full aspect-video">
                            <Image
                                src={getEventImagePath(event.image_url ?? null) || "/images/yazilim.png"}
                                alt={event.title}
                                fill
                                className="bg-bite-tongue object-cover aspect-video"
                            />
                        </div>
                        <Card className="relative -top-4 h-fit md:h-80 border-border w-full rounded-2xl z-20 overflow-hidden">
                            <CardHeader className="flex flex-wrap gap-2">
                                <div className="flex flex-wrap gap-4 justify-between items-center w-full">
                                    <div className="flex flex-wrap gap-2 items-center">
                                        <CardTitle className="text-nowrap">
                                            {event.title.length > 32 ? event.title.substring(0, 32) + "..." : event.title}
                                        </CardTitle>
                                        {event.is_online && (
                                            <Badge
                                                variant="outline"
                                                key={id}
                                                className={`px-2 py-1 sm:px-3 sm:py-1.5 
                                    bg-success-500 backdrop-blur-sm border-estragon/30
                                    transition-colors text-nowrap`}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = "#039855";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = "#12b76a";
                                                }}
                                            >{t('online')}</Badge>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground">{event.location_name}</p>
                                </div>
                                <p className="text-muted-foreground">{new Date(event.event_date).toLocaleDateString('tr-TR')}</p>
                            </CardHeader>
                            <CardContent >
                                <BlogMarkdown content={event.description.length > 100 ? event.description.substring(0, 100) + "..." : event.description} />
                            </CardContent>
                            <CardFooter className="justify-end gap-4 md:absolute md:bottom-0 md:right-0">
                                <Link href={`/form`}>
                                    <Button size="md" variant="default" type="button"
                                        startIcon={<BookCheckIcon className="w-4 h-4" />}
                                        className="text-xs cursor-pointer border-2 border-muted-foreground hover:border-bite-tongue hover:bg-bite-tongue hover:text-white">
                                        {t("apply")}
                                    </Button>
                                </Link>
                                <Link href={`/event/${event.id}`}>
                                    <Button size="sm" variant="primary" type="button"
                                        className="text-xs bg-bite-tongue cursor-pointer">
                                        {t("details")}
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </div >
    )
}

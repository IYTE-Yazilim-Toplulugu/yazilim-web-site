"use client"
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, ExternalLink, Globe, MapPin, Users } from 'lucide-react';
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from 'react';
import haversine from 'haversine-distance';
import { Event, Location } from '@/types/types_event';
import Loading from '@/components/loading';
import { getEvent, getEventImagePath } from '@/utils/event_client_util';
import useHandleErrorCode from '@/components/handle-error-code';
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import BlogMarkdown from '@/components/blog-markdown';


export default function EventPage() {
    const id = Number(useParams().id);
    const [event, setEvent] = useState<Event>()
    const [userLocation, setUserLocation] = useState<Location | null>(null);
    const [timeLeft, setTimeLeft] = useState({});
    const [eventPassed, setEventPassed] = useState(false);

    const isMobile = useIsMobile()

    const Map = useMemo(() =>
        dynamic(() => import("@/components/map-component"), {
            ssr: false,
            loading: () => <div className="w-full h-48 bg-muted rounded-lg animate-pulse" />
        }),
        []
    );

    const [loading, setLoading] = useState<boolean>(true);

    // const t = useTranslations('events.event')

    const handleErrorCode = useHandleErrorCode();


    useEffect(() => {
        getUserLocation()
        fetchEvent().then(() => setLoading(false))
    }, [])

    useEffect(() => {
        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(timer);
    }, [event?.event_date])

    const fetchEvent = async () => {
        const res = await getEvent(id);

        if (res.error) {
            console.error("Error fetching events:", res.error);
            handleErrorCode(res.error.code);
            return
        }
        setEvent(res.data || []);
        console.log(res.data)
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (error) => {
                    console.error("Error get user location: ", error);
                    handleErrorCode(error.code.toString() ?? null)
                }
            );
        } else {
            console.warn("Your browser is not supported geolocation. Please try to update or change your browser.");
        }
    };

    const calculateTimeLeft = () => {
        if (!event?.event_date) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            setEventPassed(true);
            return;
        }

        const eventDate = new Date(event.event_date);
        const now = new Date();
        const difference = eventDate.getTime() - now.getTime();

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
            setEventPassed(false);
        } else {
            // Event passed → zero out timer
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            setEventPassed(true);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getDistance = () => {
        if (!userLocation || !event?.location) return null;

        const distance = haversine(
            { lat: event?.location[0], lon: event.location[1] },
            { lat: userLocation.latitude, lon: userLocation.longitude }
        );

        return (distance / 1000).toFixed(1);
    };

    if (loading) return (<Loading />)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-24"
        >
            <div className="relative">
                {isMobile && <Link href="/event">
                    <Button size={'default'} variant={"secondary"} className="absolute left-2 -top-2
                    bg-bite-tongue hover:bg-happy-hearts cursor-pointer
                    shadow-sm shadow-black/30 z-30">
                        <ArrowLeft />
                    </Button>
                </Link>}
                {event && (
                    <div className="relative mx-4 lg:mx-auto lg:max-w-2/3 aspect-video bg-cover bg-center rounded-2xl overflow-hidden" style={{ backgroundImage: `url(${getEventImagePath(event.image_url ?? null) || "/images/yazilim.png"})` }}>
                        <div className="absolute inset-0 bg-bite-tongue bg-opacity-40"></div>
                    </div>
                )}

                <div className="relative -mt-7 mx-auto max-w-6xl px-4">
                    {!isMobile && <Link href="/event">
                        <Button size={'default'} variant={"secondary"} className="absolute left-0 -top-2
                    bg-bite-tongue hover:bg-happy-hearts cursor-pointer
                    shadow-sm shadow-black/30 z-30">
                            <ArrowLeft />
                        </Button>
                    </Link>}
                    <div className="bg-card rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-8">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {event?.title}
                            </h1>

                            <div className="grid md:grid-cols-3 gap-4 mb-8">
                                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                                    <Calendar className="h-8 w-8" />
                                    <div>
                                        <p className="font-semibold">Tarih & Saat</p>
                                        <p className="text-sm">{formatDate(event?.event_date ?? "")}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                                    <Users className="h-8 w-8" />
                                    <div>
                                        <p className="font-semibold">Kapasite</p>
                                        <p className="text-sm">{event?.capacity} kişi</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                                    {event?.is_online ? (
                                        <Globe className="h-8 w-8" />
                                    ) : (
                                        <MapPin className="h-8 w-8" />
                                    )}
                                    <div>
                                        <p className="font-semibold">
                                            {event?.is_online ? 'Online' : 'Konum'}
                                        </p>
                                        <p className="text-sm">
                                            {event?.is_online ? 'Çevrimiçi Etkinlik' : event?.location_name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {!eventPassed && Object.keys(timeLeft).length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <Clock className="h-6 w-6" />
                                        Etkinliğe Kalan Süre
                                    </h3>
                                    <div className="grid grid-cols-4 gap-4 max-w-lg">
                                        {Object.entries(timeLeft).map(([unit, value]) => (
                                            <div key={unit} className="text-center p-4 bg-bite-tongue text-white rounded-xl shadow-lg">
                                                <div className="text-3xl font-bold">{value as string}</div>
                                                <div className="text-sm opacity-80 capitalize">
                                                    {unit === 'days' ? 'Gün' : unit === 'hours' ? 'Saat' : unit === 'minutes' ? 'Dakika' : 'Saniye'}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {eventPassed && (
                                <div className="mb-8 p-4 bg-destructive/90 text-background dark:text-primary rounded-xl">
                                    <p className="font-semibold">Bu etkinlik sona ermiştir.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="relative bg-card rounded-2xl shadow-lg p-8">
                            <h2 className="text-3xl font-bold mb-6">Etkinlik Hakkında</h2>
                            <div className="mb-20 prose prose-lg leading-relaxed">
                                <BlogMarkdown content={event?.description || ""} />
                            </div>

                            {event?.registration_url && (
                                <div className="absolute left-8 bottom-8 mt-8">
                                    <Link
                                        href={event.registration_url}
                                        className="relative inline-flex items-center gap-2 px-8 py-4
                                        font-semibold text-lg rounded-xl shadow-lg
                                        border-2 border-bite-tongue/30
                                        overflow-hidden transform transition-all duration-200
                                        hover:-translate-y-1 hover:shadow-xl group
                                        hover:border-hidden"
                                    >
                                        <span className="relative z-10 inline-flex items-center gap-2">
                                            Kayıt Ol
                                            <ExternalLink className="h-5 w-5" />
                                        </span>

                                        {/* Gradient overlay: hover from parent group */}
                                        <span className="absolute inset-0 bg-gradient-to-r from-bite-tongue to-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {!event?.is_online && (
                            <div className="bg-card rounded-2xl shadow-lg p-6">
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <MapPin className="h-6 w-6" />
                                    Konum
                                </h3>
                                {event && <Map location={event.location} />}

                                <div className="mt-4 p-4 rounded-xl">
                                    <p className="font-semibold">{event?.location_name}</p>
                                    {userLocation && getDistance() && (
                                        <p className="mt-2 flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {getDistance()} km mesafede
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="bg-card rounded-2xl shadow-lg p-6">
                            <h3 className="text-2xl font-bold mb-4">Hızlı Bilgi</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span>Durum:</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${eventPassed
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-success-300 text-green-800'
                                        }`}>
                                        {eventPassed ? 'Sona Erdi' : 'Aktif'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-border">
                                    <span className="">Tür:</span>
                                    <span className="font-medium">
                                        {event?.is_online ? 'Online' : 'Yüz Yüze'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span >Kapasite:</span>
                                    <span className="font-medium">{event?.capacity} kişi</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


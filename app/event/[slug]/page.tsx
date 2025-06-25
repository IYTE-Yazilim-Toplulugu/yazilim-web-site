"use client"

import Header from '@/components/header';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, UsersRound } from 'lucide-react';
import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';
import haversine from 'haversine-distance';
import { EventsData } from '@/lib/pseudo';
import { Event } from '@/types/types';
// Dynamically import the Map component with SSR disabled
const Map = dynamic(() => import("../../../components/map-component"), { ssr: false });
const [events, setEvents] = useState<Event[]>(EventsData)



const PostPage = () => {
    const [userLocation, setUserLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    const params = useParams(); // `useParams` hook'u ile slug'ı alıyoruz
    const router = useRouter()
    const slug = params.slug;   // Slug'ı params üzerinden alıyoruz
    const thisEvent: Event | undefined = events.find((event: Event) => event.id.toString() === slug)
    if (thisEvent === undefined) {
        router.push("/")
        return null;
    }
    useEffect(() => {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation({ latitude, longitude });

                    },
                    (error) => {
                        console.error("Error get user location: ", error);
                    }
                );
            } else {
                console.log("Your browser is not supported geolocation. Please try to update or change your browser.");
            }
        };

        getUserLocation(); // Bunu çağırmayı unutma!
    }, [])
    return (
        <div>
            <Header />
            <div><p className='text-center text-3xl'>{thisEvent?.title}</p></div>
            <div className='flex gap-5 justify-center'><div className='flex gap-2'><Calendar className='h-10 w-10' /><p className='text-2xl my-auto'>Tarih: {thisEvent.event_date}</p></div><div className='flex gap-2'><UsersRound className='h-10 w-10' /> <p className='text-2xl my-auto'>Kapasite: {thisEvent.capacity_limit}</p></div></div>
            <div className='w-1/2 mx-auto border-orange-500 rounded shadow border-2 m-20'>
                <p className='text-xl'>About This Event</p>
                <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
            </div>

            <div className='flex justify-center'>
                <div className='w-1/4 p-10 border-orange-400 shadow rounded-xl border-2'>
                    <p className='text-xl'>Konum</p>
                    <Map location={thisEvent.location} />
                    {userLocation && thisEvent.location ? (
                        <p className='text-center'>
                            {(
                                haversine(
                                    {
                                        lat: thisEvent.location[0],
                                        lon: thisEvent.location[1],
                                    },
                                    {
                                        lat: userLocation.latitude,
                                        lon: userLocation.longitude,
                                    }
                                )
                                / 1000
                            ).toFixed(2)}
                            {" "} km ötede
                        </p>
                    ) : (
                        <p>Location not available </p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PostPage;

"use client";
import { ProjectCard } from "@/components/project-card";
import { EventsData } from "@/lib/pseudo";
import { useEffect, useState } from "react";
import { Event } from "@/types/types";
import Link from "next/link";
import Loading from "@/components/loading";
import YazilimBlankPage from "@/components/blank-page";


export default function Events() {
    const [events, setEvents] = useState<Event[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) return (<Loading />)

    return (
        <div className="mt-20">
            <YazilimBlankPage content="Events are coming soon" emoji="⏳" />
            {/* <div className="m-8 flex flex-wrap gap-10 justify-evenly"> */}
            {/*     {events && events.map((event, id) => ( */}
            {/*         <Link key={id} href={`/place/${event.id}`} className="w-[90%] sm:w-[45%] md:w-[30%] lg:w-[18%] min-w-[250px]"> */}
            {/*             <ProjectCard */}
            {/*                 title={event.title} description={event.description} */}
            {/*                 category="Competitive Coding" teamSize={1} technologies={["C#"]} year={2019} rating={4.3} */}
            {/*             /> */}
            {/*         </Link> */}
            {/*     ))} */}
            {/* </div> */}
        </div >
    )
}

"use client";
import { ProjectCard } from "@/components/project-card";
import { EventsData } from "@/lib/pseudo";
import { useState } from "react";
import { Event } from "@/types/types";
import Link from "next/link";


export default function Events() {
    const [events, _setEvents] = useState(EventsData);


    return (
        <div className="mt-20">
            <div className="m-8 flex flex-wrap gap-10 justify-evenly">
                {events.map((event: Event, id) => (
                    <Link key={id} href={`/place/${event.id}`} className="w-[90%] sm:w-[45%] md:w-[30%] lg:w-[18%] min-w-[250px]">
                        <ProjectCard
                            title={event.title} description={event.description}
                            category="Competitive Coding" teamSize={1} technologies={["C#"]} year={2019} rating={4.3}
                        />
                    </Link>
                ))}
            </div>
        </div >
    )
}

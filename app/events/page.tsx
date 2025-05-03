"use client";
import Header from "@/components/header";
import { ProjectCard } from "@/components/project-card";
import ProjectShowcase from "@/components/project-showcase";
import Projects from "@/components/projects";
import { useRouter } from "next/navigation";
const events: Event[] = [
  {
    id: 1,
    title: "Tech Conference 2025",
    description: "A large conference focusing on the latest in tech innovation.",
    event_date: "2025-06-15T10:00:00",
    location: [40.7128, -74.0060], // New York City coords
    capacity_limit: 500,
    is_online: false,
    registration_url: "https://techconf2025.com/register"
  },
  {
    id: 2,
    title: "Online Marketing Webinar",
    description: "A free online webinar about digital marketing strategies.",
    event_date: "2025-05-20T18:00:00",
    location: [0, 0], // Online, so dummy coords
    capacity_limit: 1000,
    is_online: true,
    registration_url: "https://marketingwebinar.com/signup"
  },
  {
    id: 3,
    title: "Community Cleanup Day",
    description: "Join us in cleaning up the local park and making a difference.",
    event_date: "2025-06-01T09:00:00",
    location: [34.0522, -118.2437], // Los Angeles coords
    capacity_limit: 200,
    is_online: false,
    registration_url: null
  },
  {
    id: 4,
    title: "AI & Ethics Panel",
    description: "Discussion on the ethical implications of AI technologies.",
    event_date: "2025-07-10T14:00:00",
    location: [51.5074, -0.1278], // London coords
    capacity_limit: 300,
    is_online: true,
    registration_url: "https://aiethics2025.com"
  },
  {
    id: 5,
    title: "Startup Pitch Night",
    description: "Local startups present their ideas to investors.",
    event_date: "2025-08-05T19:00:00",
    location: [37.7749, -122.4194], // San Francisco coords
    capacity_limit: 150,
    is_online: false,
    registration_url: "https://startuppitchnight.com/register"
  }
];
type Event = {
  id: number;
  title: string; // max 255 karakter
  description: string;
  event_date: string; // ISO datetime string (ör: 2025-06-15T10:00:00)
  location: [number, number]; // [latitude, longitude]
  capacity_limit: number;
  is_online: boolean;
  registration_url?: string | null;
};

export default function Events() {
  const router = useRouter()
  const handleClick = (id: Number) => {
    router.push("/event/" + id)
  }
  return (
    <div>
      <Header />

      <div className="flex flex-wrap gap-10 justify-evenly">{events.map((event: Event) => (

        <div key={event.id} className="w-[90%] sm:w-[45%] md:w-[30%] lg:w-[18%] min-w-[250px]"><ProjectCard onClick={() => handleClick(event.id)} title={event.title} description={event.description} category="baasd" teamSize={1} technologies={["C#"]} year={2019} rating={4.3} /></div>
      ))}</div>
    </div>
  )
}

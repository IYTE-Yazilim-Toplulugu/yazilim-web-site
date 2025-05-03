"use client"

import Header from '@/components/header';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, UsersRound } from 'lucide-react';
import dynamic from "next/dynamic";

// Dynamically import the Map component with SSR disabled
const Map = dynamic(() => import("../../../components/map-component"), { ssr: false });
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

const PostPage = () => {
  const params = useParams(); // `useParams` hook'u ile slug'ı alıyoruz
  const router = useRouter()
  const slug = params.slug;   // Slug'ı params üzerinden alıyoruz
  const thisEvent: Event | undefined = events.find((event: Event) => event.id.toString() === slug)
  if (thisEvent === undefined) {
    router.push("/")
    return null;
  }
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
        </div>
      </div>
    </div>
  );
};

export default PostPage;

"use client"

import { Briefcase, Calendar, Github, GraduationCap, Heart, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"

export function HandleIcons({ icon }: { icon: number }) {
    switch (icon) {
        case 1:
            return <Github className="h-5 w-5" />
        case 2:
            return <Instagram className="h-5 w-5" />
        case 3:
            return <Linkedin className="h-5 w-5" />
        case 4:
            return <Mail className="h-5 w-5" />
        case 6:
            return <Briefcase className="h-3.5 w-3.5 mr-1" />
        case 7:
            return <Phone className="h-4 w-4 text-primary" />
        case 8:
            return <MapPin className="h-4 w-4 text-primary" />
        case 9:
            return <Calendar className="h-4 w-4 text-primary" />
        case 10:
            return <GraduationCap className="h-3.5 w-3.5 mr-1" />
        case 11:
            return <Heart className="h-3.5 w-3.5 mr-1" />





    }
}

// 0: yazilim, 1: user, 2: feature, 3: event, 4: feedback, 5: design, 6: code
export const HandleIcon = (icon: number) => {
    switch (icon) {
        case 1:
            return <p className='text-xl'>👨</p>
        case 2:
            return <p className='text-xl'>🧠</p>
        case 3:
            return <p className='text-xl'>🎫</p>
        case 4:
            return <p className='text-xl'>📝</p>
        case 5:
            return <p className='text-xl'>🎨</p>
        case 6:
            return <p className='text-xl'>💻</p>
        case 7:
            return <p className='text-xl'>🛠️</p>
        case 8:
            return <p className='text-xl'>😎</p>
        case 9:
            return <p className='text-xl'>📅</p>
        case 10:
            return <p className='text-xl'>📧</p>
        case 11:
            return <p className='text-xl'>❤️</p>
        case 12:
            return <p className='text-xl'>📊</p>
        default:
            return <p className='flex items-center justify-center'>
                <Image className="font-bold text-xl
                    bg-gradient-to-r from-happy-hearts to-golden-nugget
                    text-transparent bg-clip-text z-20"
                    src="/images/yazilim.png"
                    alt="yazilim"
                    width={16} height={16}
                />
            </p>
    }
}

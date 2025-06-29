"use client"

import { Briefcase, Calendar, Github, GraduationCap, Heart, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export default function HandleIcons({ icon }: { icon: number }) {
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

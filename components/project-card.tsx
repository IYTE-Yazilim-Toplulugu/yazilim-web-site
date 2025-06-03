"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Calendar, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  category: string
  technologies: string[]
  rating: number
  year: string | number
  teamSize: number
  imageUrl?: string
  onClick?: () => void
}

export function ProjectCard({
  title,
  description,
  category,
  technologies,
  rating,
  year,
  teamSize,
  imageUrl = "/placeholder.svg?height=400&width=600",
  onClick,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const maxVisibleTechnologies = 3
  const hasMoreTechnologies = technologies.length > maxVisibleTechnologies
  const visibleTechnologies = technologies.slice(0, maxVisibleTechnologies)
  const moreTechnologiesCount = technologies.length - maxVisibleTechnologies

  return (
    <Card
      className="overflow-hidden border-0 bg-black text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[16/9] bg-neutral-200">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className={cn("object-cover transition-transform duration-500", isHovered ? "scale-110" : "scale-100")}
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Badge className="bg-amber-600 hover:bg-amber-700 text-white border-0 text-xs font-medium">{category}</Badge>

          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
            ))}
          </div>
        </div>

        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {visibleTechnologies.map((tech, index) => (
            <Badge key={index} className="bg-amber-600/90 hover:bg-amber-600 text-white border-0 text-xs">
              {tech}
            </Badge>
          ))}

          {hasMoreTechnologies && (
            <Badge className="bg-amber-600/90 hover:bg-amber-600 text-white border-0 text-xs">
              +{moreTechnologiesCount} more
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-neutral-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>Team: {teamSize}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}


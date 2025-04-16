"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// Project data
const featuredProjects = [
  {
    id: 1,
    title: "Voice Cloning & Audio Processing Suite",
    description:
      "Comprehensive audio processing system including real-time voice cloning, multilingual transcription, and speaker diarization.",
    longDescription:
      "A state-of-the-art voice cloning system that allows for real-time audio processing with minimal latency. The system uses deep learning models to generate natural-sounding speech that matches the target voice with unprecedented accuracy and emotional range.",
    technologies: ["TensorFlow TTS", "PyTorch", "Whisper", "FastAPI", "React"],
    imageUrl: "/placeholder.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "#",
    color: "from-blue-600 to-violet-600",
  },
  {
    id: 2,
    title: "DALL-E 2 PyTorch Implementation",
    description:
      "Open-source implementation of OpenAI's DALL-E 2 image generation model using PyTorch with CUDA optimization.",
    longDescription:
      "A PyTorch implementation of the DALL-E 2 architecture for generating high-quality images from text descriptions. The project includes optimizations for CUDA acceleration and containerization with Docker for easy deployment and scaling.",
    technologies: ["PyTorch", "CUDA", "Docker", "HuggingFace Transformers", "Python"],
    imageUrl: "/placeholder.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "#",
    color: "from-pink-600 to-orange-600",
  },
  {
    id: 3,
    title: "Community Grant Management System",
    description:
      "Web application for managing community grant applications, reviews, and distributions with advanced analytics.",
    longDescription:
      "A full-stack web application that streamlines the process of managing community grants from application to distribution. The system includes features for application submission, review workflows, financial tracking, and impact measurement dashboards.",
    technologies: ["Next.js", "PostgreSQL", "AWS", "TypeScript", "Prisma"],
    imageUrl: "/placeholder.svg?height=600&width=800",
    demoUrl: "#",
    githubUrl: "#",
    color: "from-green-600 to-emerald-600",
  },
]

export default function ProjectShowcase() {
  const [currentProject, setCurrentProject] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const handleNext = () => {
    setDirection(1)
    setCurrentProject((prev) => (prev + 1) % featuredProjects.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentProject((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const handleDotClick = (index: number) => {
    setDirection(index > currentProject ? 1 : -1)
    setCurrentProject(index)
  }

  const handleDemoClick = (url: string) => {
    toast({
      title: "Demo Link",
      description: "Opening demo in a new tab...",
      duration: 3000,
    })
    window.open(url, "_blank")
  }

  // Auto-rotate projects every 5 seconds
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [isHovered])

  const project = featuredProjects[currentProject]

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale }}
      className="w-full max-w-5xl mx-auto relative rounded-2xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/70 to-background z-10" />

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={project.id}
          custom={direction}
          initial={{
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            },
          }}
          exit={{
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            transition: {
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            },
          }}
          className="relative w-full aspect-[16/9]"
        >
          <Image
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />

          <div className={cn("absolute inset-0 opacity-60 bg-gradient-to-r", project.color)} />

          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
            <Badge variant="outline" className="w-fit mb-4 bg-black/50 backdrop-blur-sm text-white border-white/20">
              Featured Project
            </Badge>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">{project.title}</h3>
            <p className="text-white/90 max-w-3xl mb-6 text-sm md:text-base">{project.longDescription}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, index) => (
                <Badge key={index} className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                className="bg-white text-black hover:bg-white/90 group"
                onClick={() => handleDemoClick(project.demoUrl)}
              >
                Live Demo
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button variant="outline" className="border-white text-white hover:bg-white/20 gap-2" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation controls */}
      <Button
        size="icon"
        variant="ghost"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
        onClick={handleNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Progress dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1">
        {featuredProjects.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              currentProject === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80",
            )}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  )
}

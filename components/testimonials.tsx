"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

// Testimonial data
const testimonials = [
  {
    id: 1,
    content:
      "Shaquille's expertise in AI and machine learning transformed our project. His ability to explain complex concepts in simple terms made collaboration seamless.",
    author: "Dr. Sarah Johnson",
    role: "Research Director, TechLabs",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "TechLabs",
    rating: 5,
  },
  {
    id: 2,
    content:
      "Working with Shaquille on our community education initiative was incredible. His technical knowledge combined with his passion for education created a program that truly made an impact.",
    author: "Marcus Chen",
    role: "Executive Director, NYC Education Fund",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "NYC Education Fund",
    rating: 5,
  },
  {
    id: 3,
    content:
      "Shaquille developed a custom ML solution that increased our operational efficiency by 40%. His attention to detail and commitment to excellence is unmatched.",
    author: "Priya Patel",
    role: "CTO, DataSphere",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "DataSphere",
    rating: 5,
  },
  {
    id: 4,
    content:
      "As a teaching colleague, I've witnessed Shaquille's extraordinary ability to inspire students. His innovative approach to STEM education has set a new standard in our institution.",
    author: "James Wilson",
    role: "Department Chair, Success Academy",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "Success Academy",
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Auto-rotate testimonials
  useEffect(() => {
    if (isPaused) return

    intervalRef.current = setInterval(() => {
      handleNext()
    }, 8000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentIndex, isPaused])

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-4">Client Testimonials</h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Hear what clients and colleagues have to say about working with me.
      </p>

      <div
        className="relative max-w-4xl mx-auto px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={testimonials[currentIndex].id}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction > 0 ? 100 : -100,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              },
            }}
            exit={{
              opacity: 0,
              x: direction > 0 ? -100 : 100,
              transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              },
            }}
            className="w-full"
          >
            <Card className="border-none bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-4 border-background">
                        <AvatarImage src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].author} />
                        <AvatarFallback>
                          {testimonials[currentIndex].author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-1.5">
                        <Quote className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-yellow-500 text-lg">
                          {i < testimonials[currentIndex].rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>

                    <blockquote className="text-lg md:text-xl italic mb-6 relative">
                      <span className="text-primary text-4xl absolute -top-4 -left-2 opacity-20">"</span>
                      {testimonials[currentIndex].content}
                      <span className="text-primary text-4xl absolute -bottom-10 -right-2 opacity-20">"</span>
                    </blockquote>

                    <div>
                      <div className="font-semibold">{testimonials[currentIndex].author}</div>
                      <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-2">
                        <span>{testimonials[currentIndex].role}</span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                        <span>{testimonials[currentIndex].company}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation controls */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="rounded-full"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex ? "bg-primary w-4" : "bg-muted hover:bg-primary/50",
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="rounded-full"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

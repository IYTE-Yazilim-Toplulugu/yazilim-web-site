"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar, ChevronDown, ChevronRight, Clock, MapPin, Award } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineEvent {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
  skills: string[]
  color: string
  logo?: string
}

const timelineData: TimelineEvent[] = [
  {
    id: "rfc",
    title: "Technical Program Director",
    company: "Rose from Concrete",
    location: "Brooklyn, NY",
    period: "January 2021 - Present",
    description:
      "Leading technical initiatives and community programs across Brooklyn, developing and implementing ML models for assessing program impact and reach.",
    achievements: [
      "Forged strategic partnerships with 40+ community centers across Brooklyn",
      "Developed predictive models with Python and Scikit-learn impacting 20,000+ NYC residents",
      "Led implementation of community-focused programs using AWS Lambda and Docker",
      "Designed decentralized energy solutions and AI-powered monitoring tools",
    ],
    skills: ["Python", "Machine Learning", "AWS", "Docker", "GCP", "Community Development"],
    color: "bg-gradient-to-r from-indigo-600 to-purple-600",
  },
  {
    id: "success-academy",
    title: "Lead AP Physics Teacher",
    company: "Success Academy High School of the Liberal Arts",
    location: "New York, NY",
    period: "July 2019 - 2022",
    description:
      "Led physics education initiatives, applying data analysis to optimize teaching strategies for over 150 students while managing a team of 13 teachers.",
    achievements: [
      "Applied advanced data analysis to optimize lesson plans for 150+ students",
      "Awarded the 'Teacher Excellence Award' for instructional strategies",
      "Led a team of 13 teachers, fostering collaborative learning environment",
    ],
    skills: ["Leadership", "Data Analysis", "Education", "Team Management", "Curriculum Development"],
    color: "bg-gradient-to-r from-green-600 to-emerald-600",
  },
  {
    id: "research-assistant",
    title: "Research Assistant",
    company: "City College of New York",
    location: "New York, NY",
    period: "2017 - 2019",
    description:
      "Conducted physics research focused on computational modeling of complex systems and data analysis of experimental results.",
    achievements: [
      "Published research on computational physics models in peer-reviewed journals",
      "Developed custom analysis algorithms for experimental data processing",
      "Presented findings at 3 national physics conferences",
    ],
    skills: ["Python", "Data Analysis", "Research", "Scientific Computing", "Physics"],
    color: "bg-gradient-to-r from-blue-600 to-cyan-600",
  },
]

export default function InteractiveTimeline() {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)
  const [activeEventIndex, setActiveEventIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  const toggleExpand = (id: string) => {
    setExpandedEvent(expandedEvent === id ? null : id)
  }

  // Auto rotate featured event every 5 seconds
  useEffect(() => {
    if (!expandedEvent) {
      const interval = setInterval(() => {
        setActiveEventIndex((prev) => (prev + 1) % timelineData.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [expandedEvent])

  return (
    <div ref={containerRef} className="w-full py-8">
      <div className="mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={timelineData[activeEventIndex].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={cn("rounded-xl p-6 relative overflow-hidden shadow-lg", timelineData[activeEventIndex].color)}
          >
            <div className="absolute inset-0 opacity-10 bg-[url('/placeholder.svg?height=400&width=800')] bg-center bg-cover mix-blend-overlay" />
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <Badge variant="outline" className="bg-white/10 text-white mb-2">
                    Featured Experience
                  </Badge>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{timelineData[activeEventIndex].title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-white/80">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      <span>{timelineData[activeEventIndex].company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{timelineData[activeEventIndex].location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{timelineData[activeEventIndex].period}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {timelineData.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        index === activeEventIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80",
                      )}
                      onClick={() => setActiveEventIndex(index)}
                      title={`Show ${timelineData[index].title}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-white/90 mb-4">{timelineData[activeEventIndex].description}</p>
              <div className="flex flex-wrap gap-2">
                {timelineData[activeEventIndex].skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-white/10 text-white border-white/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        {timelineData.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <div
              className={cn(
                "timeline-item pl-8 pb-8 relative z-10 transition-all duration-300 cursor-pointer",
                expandedEvent === event.id ? "pb-12" : "",
              )}
              onClick={() => toggleExpand(event.id)}
            >
              <div
                className={cn(
                  "absolute left-0 top-0 w-3 h-3 rounded-full z-20 transition-all duration-300",
                  expandedEvent === event.id ? "scale-125" : "",
                  event.color.replace("bg-gradient-to-r", "bg"),
                )}
              />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {event.title}
                    <motion.div
                      animate={{ rotate: expandedEvent === event.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {expandedEvent === event.id ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </motion.div>
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      <span>{event.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.period}</span>
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedEvent === event.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium flex items-center gap-2 mb-2">
                            <Award className="h-4 w-4 text-primary" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-1 ml-6 list-disc text-muted-foreground">
                            {event.achievements.map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {event.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ErrorBoundary } from "@/components/error-boundary"
import {
  Calendar,
  MapPin,
  Building,
  ChevronRight,
  ChevronDown,
  Award,
  Briefcase,
  GraduationCap,
  Users,
  Target,
} from "lucide-react"

// Experience data
const experiences = [
  {
    id: "rfc",
    title: "Technical Program Director",
    company: "Rose from Concrete",
    location: "Brooklyn, NY",
    period: "January 2021 - Present",
    type: "work",
    description:
      "Leading technical initiatives and community programs across Brooklyn, developing and implementing ML models for assessing program impact and reach.",
    responsibilities: [
      "Led multi-functional teams to develop AI-powered community tools, such as predictive models for social welfare programs benefiting over 20,000 NYC residents",
      "Architected a decentralized energy solution leveraging AWS Lambda, Docker, and cloud computing to enhance sustainability in underserved communities",
      "Created and deployed real-time monitoring tools to track the impact of community projects, providing data-driven insights for resource allocation",
      "Forged strategic partnerships with 40+ community centers across Brooklyn, deploying ML models to assess and optimize program reach",
    ],
    skills: ["Python", "Machine Learning", "AWS", "Docker", "GCP", "Community Development"],
    metrics: [
      { value: "40+", label: "Community Centers" },
      { value: "20,000+", label: "Residents impacted" },
      { value: "15", label: "Team Size" },
    ],
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: "success-academy",
    title: "Lead AP Physics Teacher",
    company: "Success Academy High School of the Liberal Arts",
    location: "New York, NY",
    period: "July 2019 - 2022",
    type: "work",
    description:
      "Led physics education initiatives, applying data analysis to optimize teaching strategies for over 150 students while managing a team of 13 teachers.",
    responsibilities: [
      "Applied advanced data analysis and statistical techniques in Python, optimizing lesson plans for 150+ students",
      "Awarded the 'Teacher Excellence Award' for exceptional instructional strategies",
      "Led a team of 13 teachers, fostering a collaborative academic environment",
      "Developed innovative curriculum materials that improved student engagement and performance metrics",
    ],
    skills: ["Leadership", "Data Analysis", "Education", "Team Management", "Curriculum Development"],
    metrics: [
      { value: "150+", label: "Students" },
      { value: "13", label: "Team Size" },
      { value: "95%", label: "Pass Rate" },
    ],
    color: "from-green-600 to-emerald-600",
  },
  {
    id: "research-assistant",
    title: "Research Assistant",
    company: "City College of New York",
    location: "New York, NY",
    period: "2017 - 2019",
    type: "education",
    description:
      "Conducted physics research focused on computational modeling of complex systems and data analysis of experimental results.",
    responsibilities: [
      "Published research on computational physics models in peer-reviewed journals",
      "Developed custom analysis algorithms for experimental data processing",
      "Presented findings at 3 national physics conferences",
      "Collaborated with interdisciplinary teams on cutting-edge research projects",
    ],
    skills: ["Python", "Data Analysis", "Research", "Scientific Computing", "Physics"],
    metrics: [
      { value: "3", label: "Publications" },
      { value: "5", label: "Conferences" },
      { value: "2", label: "Research Grants" },
    ],
    color: "from-blue-600 to-cyan-600",
  },
]

export default function RedesignedExperience() {
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null)
  const [experienceType, setExperienceType] = useState<"all" | "work" | "education">("all")

  const toggleExpand = (id: string) => {
    setExpandedExperience(expandedExperience === id ? null : id)
  }

  // Filter experiences based on type
  const filteredExperiences =
    experienceType === "all" ? experiences : experiences.filter((exp) => exp.type === experienceType)

  return (
    <SectionContainer id="experience" className="bg-gradient-to-b from-background/95 to-background">
      <SectionHeader
        title="Professional Journey"
        subtitle="My professional experiences and career highlights in AI development, education, and community building."
      />

      <ScrollReveal>
        <Tabs
          defaultValue="all"
          onValueChange={(value) => setExperienceType(value as "all" | "work" | "education")}
          className="w-full"
        >
          <div className="overflow-x-auto pb-2 no-scrollbar">
            <TabsList className="flex justify-center gap-2 mb-8 bg-transparent w-fit mx-auto">
              <TabsTrigger
                value="all"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "all" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  <span>All Experience</span>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="work"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "work" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Work Experience</span>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="education"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "education" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Education</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="space-y-6">
            {filteredExperiences.map((experience, index) => (
              <ErrorBoundary key={experience.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={cn("overflow-hidden border-none shadow-lg", `bg-gradient-to-br ${experience.color}/10`)}
                  >
                    <CardContent className="p-0">
                      <div
                        className={cn(
                          "p-4 sm:p-6 cursor-pointer transition-all duration-300",
                          expandedExperience === experience.id ? "pb-3" : "",
                        )}
                        onClick={() => toggleExpand(experience.id)}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <Badge
                              className={cn(
                                "mb-2 px-3 py-1",
                                experience.type === "work"
                                  ? "bg-blue-500/20 text-blue-500 border-blue-500/30"
                                  : "bg-amber-500/20 text-amber-500 border-amber-500/30",
                              )}
                            >
                              {experience.type === "work" ? (
                                <Briefcase className="h-3 w-3 mr-1" />
                              ) : (
                                <GraduationCap className="h-3 w-3 mr-1" />
                              )}
                              {experience.type === "work" ? "Work Experience" : "Education"}
                            </Badge>
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                              {experience.title}
                              <motion.div
                                animate={{ rotate: expandedExperience === experience.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                {expandedExperience === experience.id ? (
                                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                )}
                              </motion.div>
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Building className="h-4 w-4" />
                                <span>{experience.company}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{experience.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{experience.period}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground">{experience.description}</p>
                      </div>

                      <AnimatePresence>
                        {expandedExperience === experience.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 sm:px-6 pb-6">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t">
                                <div>
                                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Award className="h-5 w-5 text-primary" />
                                    Key Responsibilities
                                  </h4>
                                  <ul className="space-y-2">
                                    {experience.responsibilities.map((responsibility, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                          <span className="text-xs text-primary">✓</span>
                                        </div>
                                        <span className="text-sm sm:text-base">{responsibility}</span>
                                      </li>
                                    ))}
                                  </ul>

                                  <div className="mt-6">
                                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                      <Users className="h-5 w-5 text-primary" />
                                      Skills Applied
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {experience.skills.map((skill, i) => (
                                        <Badge key={i} variant="secondary">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Target className="h-5 w-5 text-primary" />
                                    Key Metrics & Achievements
                                  </h4>

                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                                    {experience.metrics.map((metric, i) => (
                                      <div key={i} className="bg-primary/10 rounded-lg p-3 text-center">
                                        <div className="text-xl sm:text-2xl font-bold">{metric.value}</div>
                                        <div className="text-xs sm:text-sm text-muted-foreground">{metric.label}</div>
                                      </div>
                                    ))}
                                  </div>

                                  {experience.type === "work" && (
                                    <div className="mt-4">
                                      <Button variant="outline" className="w-full">
                                        View Reference Letter
                                      </Button>
                                    </div>
                                  )}

                                  {experience.type === "education" && (
                                    <div className="mt-4">
                                      <Button variant="outline" className="w-full">
                                        View Transcript
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              </ErrorBoundary>
            ))}
          </div>
        </Tabs>
      </ScrollReveal>
    </SectionContainer>
  )
}

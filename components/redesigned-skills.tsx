"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal, StaggeredContainer, StaggerItem } from "@/components/ui/scroll-reveal"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import {
  Code,
  Cpu,
  Database,
  Cloud,
  BookOpen,
  PenToolIcon as Tool,
  Microscope,
  Laptop,
  BarChart3,
  Globe,
  MessageSquare,
  Shield,
  Zap,
  Briefcase,
  Loader2,
} from "lucide-react"

// Dynamically import the 3D globe component with no SSR
const SkillsGlobe = dynamic(() => import("@/components/3d-skills-globe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Loading 3D Globe...</span>
    </div>
  ),
})

// Skill categories with icons
const skillCategories = [
  {
    id: "ml-ai",
    name: "Machine Learning & AI",
    icon: <Laptop className="h-5 w-5" />,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "audio",
    name: "Audio & Voice Tech",
    icon: <Zap className="h-5 w-5" />,
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "programming",
    name: "Programming",
    icon: <Code className="h-5 w-5" />,
    color: "from-emerald-500 to-green-500",
  },
  {
    id: "frameworks",
    name: "AI Frameworks",
    icon: <Cpu className="h-5 w-5" />,
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "data",
    name: "Data Science",
    icon: <Database className="h-5 w-5" />,
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: "network",
    name: "Network Analysis",
    icon: <Globe className="h-5 w-5" />,
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: <Cloud className="h-5 w-5" />,
    color: "from-sky-500 to-blue-500",
  },
  {
    id: "chatbots",
    name: "Chatbots & AI",
    icon: <MessageSquare className="h-5 w-5" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "security",
    name: "Cybersecurity",
    icon: <Shield className="h-5 w-5" />,
    color: "from-red-500 to-rose-500",
  },
  {
    id: "research",
    name: "Research",
    icon: <BookOpen className="h-5 w-5" />,
    color: "from-rose-500 to-pink-500",
  },
  {
    id: "tools",
    name: "Tools",
    icon: <Tool className="h-5 w-5" />,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "transferable",
    name: "Transferable Skills",
    icon: <Briefcase className="h-5 w-5" />,
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "math",
    name: "Mathematics",
    icon: <Microscope className="h-5 w-5" />,
    color: "from-cyan-500 to-teal-500",
  },
]

// Skill data
const skillsData = {
  "ml-ai": [
    { name: "Deep Learning", level: 90 },
    { name: "NLP", level: 85 },
    { name: "Computer Vision", level: 85 },
    { name: "Reinforcement Learning", level: 80 },
    { name: "MLOps", level: 75 },
    { name: "Generative AI", level: 90 },
    { name: "Voice Cloning", level: 85 },
    { name: "GANs", level: 90 },
    { name: "Transformers", level: 85 },
    { name: "Object Detection", level: 80 },
  ],
  audio: [
    { name: "Real-time Voice Cloning", level: 90 },
    { name: "One-Shot Voice Cloning", level: 85 },
    { name: "TensorFlow TTS", level: 90 },
    { name: "Speaker Diarization", level: 85 },
    { name: "Whisper Transcription", level: 90 },
    { name: "Audio Processing", level: 85 },
    { name: "Audiobook Generation", level: 80 },
    { name: "Real-time Audio Adjustments", level: 75 },
  ],
  programming: [
    { name: "Python", level: 95 },
    { name: "JavaScript/TypeScript", level: 90 },
    { name: "C++", level: 75 },
    { name: "SQL", level: 80 },
    { name: "R", level: 60 },
    { name: "MATLAB", level: 50 },
    { name: "Julia", level: 55 },
    { name: "Go", level: 65 },
    { name: "Java", level: 70 },
  ],
  frameworks: [
    { name: "PyTorch", level: 90 },
    { name: "TensorFlow", level: 85 },
    { name: "Scikit-learn", level: 95 },
    { name: "Hugging Face", level: 90 },
    { name: "CUDA", level: 75 },
    { name: "TensorRT", level: 65 },
    { name: "MLflow", level: 70 },
    { name: "React", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Flask", level: 85 },
    { name: "Django", level: 80 },
  ],
  data: [
    { name: "Data Mining", level: 85 },
    { name: "Business Intelligence", level: 70 },
    { name: "Big Data Processing", level: 80 },
    { name: "Pandas", level: 95 },
    { name: "Tableau", level: 70 },
    { name: "Data Visualization", level: 85 },
    { name: "Predictive Modeling", level: 90 },
    { name: "Text Analysis", level: 85 },
    { name: "Sentiment Analysis", level: 80 },
    { name: "Social Media Analysis", level: 75 },
  ],
  network: [
    { name: "Social Network Analysis", level: 85 },
    { name: "Graph Analytics", level: 80 },
    { name: "Community Detection", level: 75 },
    { name: "Network Visualization", level: 80 },
    { name: "Friend Recommendation Systems", level: 85 },
    { name: "Topic Connection Analysis", level: 80 },
    { name: "NetworkX", level: 90 },
  ],
  cloud: [
    { name: "AWS", level: 85 },
    { name: "GCP", level: 75 },
    { name: "Docker", level: 90 },
    { name: "Kubernetes", level: 85 },
    { name: "CI/CD", level: 80 },
    { name: "Microservices", level: 75 },
    { name: "DevOps", level: 80 },
    { name: "Terraform", level: 70 },
    { name: "Jenkins", level: 65 },
    { name: "AWS Lambda", level: 85 },
  ],
  chatbots: [
    { name: "Emotion-Aware Chatbots", level: 85 },
    { name: "NLP Integration", level: 90 },
    { name: "Conversational AI", level: 85 },
    { name: "Rule-Based Systems", level: 80 },
    { name: "Sentiment Tracking", level: 85 },
    { name: "Topic Tracking", level: 80 },
    { name: "Customer Service Automation", level: 75 },
  ],
  security: [
    { name: "Vulnerability Detection", level: 80 },
    { name: "IoT Security", level: 75 },
    { name: "ML for Cybersecurity", level: 85 },
    { name: "Ethical Hacking", level: 70 },
    { name: "Security Tools Development", level: 80 },
    { name: "RF Security", level: 65 },
    { name: "Web Security", level: 75 },
  ],
  research: [
    { name: "Grant Writing", level: 75 },
    { name: "Peer Review", level: 80 },
    { name: "Research Methods", level: 90 },
    { name: "Experimental Design", level: 85 },
    { name: "Scientific Writing", level: 90 },
    { name: "Literature Review", level: 85 },
    { name: "Academic Publishing", level: 75 },
  ],
  tools: [
    { name: "Git/GitHub", level: 95 },
    { name: "Linux/Unix", level: 85 },
    { name: "SolidWorks", level: 60 },
    { name: "AutoCAD", level: 55 },
    { name: "Arduino", level: 70 },
    { name: "Raspberry Pi", level: 75 },
    { name: "Jupyter Notebooks", level: 95 },
    { name: "VS Code", level: 90 },
    { name: "Scrapy", level: 85 },
    { name: "Selenium", level: 80 },
  ],
  transferable: [
    { name: "Project Management", level: 90 },
    { name: "Technical Documentation", level: 85 },
    { name: "Data-Driven Decision Making", level: 90 },
    { name: "Innovation & Problem-Solving", level: 95 },
    { name: "Collaboration", level: 90 },
    { name: "Communication", level: 85 },
    { name: "Leadership", level: 90 },
    { name: "Time Management", level: 85 },
  ],
  math: [
    { name: "Linear Algebra", level: 95 },
    { name: "Differential Equations", level: 90 },
    { name: "Complex Analysis", level: 80 },
    { name: "Group Theory", level: 75 },
    { name: "Quantum Mechanics", level: 85 },
    { name: "Statistical Mechanics", level: 85 },
    { name: "Mathematical Physics", level: 80 },
    { name: "Statistics", level: 90 },
    { name: "Probability Theory", level: 85 },
  ],
}

export default function RedesignedSkills() {
  const [activeCategory, setActiveCategory] = useState("ml-ai")
  const [visualizationType, setVisualizationType] = useState<"chart" | "globe">("chart")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <SectionContainer id="skills" className="bg-gradient-to-b from-background to-background/95">
      <SectionHeader
        title="Technical Skills"
        subtitle="A comprehensive overview of my technical expertise across various domains, from machine learning and AI to software development and research."
      />

      <ScrollReveal>
        <Tabs defaultValue="ml-ai" onValueChange={setActiveCategory} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent">
            {skillCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white`
                    : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  {category.icon}
                  <span>{category.name}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex justify-center mb-8">
            <div className="bg-muted rounded-full p-1 flex">
              <button
                onClick={() => setVisualizationType("chart")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  visualizationType === "chart" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted/80",
                )}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Chart View</span>
              </button>
              <button
                onClick={() => setVisualizationType("globe")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  visualizationType === "globe" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted/80",
                )}
              >
                <Globe className="h-4 w-4" />
                <span>3D Globe</span>
              </button>
            </div>
          </div>

          {skillCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <Card className="border-none bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  {visualizationType === "chart" ? (
                    <StaggeredContainer className="grid md:grid-cols-2 gap-8">
                      {/* Left column - Skill bars */}
                      <div>
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                          {category.icon}
                          <span>{category.name} Proficiency</span>
                        </h3>

                        <div className="space-y-6">
                          {skillsData[category.id as keyof typeof skillsData].map((skill, index) => (
                            <StaggerItem key={skill.name} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{skill.name}</span>
                                <Badge
                                  className={cn(
                                    "px-2 py-0.5 text-xs",
                                    skill.level >= 90
                                      ? "bg-green-500/20 text-green-500 border-green-500/30"
                                      : skill.level >= 75
                                        ? "bg-blue-500/20 text-blue-500 border-blue-500/30"
                                        : "bg-amber-500/20 text-amber-500 border-amber-500/30",
                                  )}
                                >
                                  {skill.level}%
                                </Badge>
                              </div>
                              <Progress value={skill.level} className="h-2" />
                            </StaggerItem>
                          ))}
                        </div>
                      </div>

                      {/* Right column - Skill visualization */}
                      <div className="flex items-center justify-center">
                        {isMounted && (
                          <SkillVisualization
                            category={category}
                            skills={skillsData[category.id as keyof typeof skillsData]}
                          />
                        )}
                      </div>
                    </StaggeredContainer>
                  ) : (
                    <div className="flex justify-center">{isMounted && <SkillsGlobe />}</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </ScrollReveal>

      <div className="mt-12 text-center">
        <ScrollReveal>
          <p className="text-muted-foreground">
            These skills represent my technical expertise developed over years of professional experience and continuous
            learning.
            <br />
            I'm constantly expanding my knowledge and staying up-to-date with the latest advancements in AI and
            technology.
          </p>
        </ScrollReveal>
      </div>
    </SectionContainer>
  )
}

interface SkillVisualizationProps {
  category: (typeof skillCategories)[0]
  skills: { name: string; level: number }[]
}

function SkillVisualization({ category, skills }: SkillVisualizationProps) {
  // Helper function to safely extract colors from gradient string
  const getColorFromGradient = (gradientString: string, position: "from" | "to") => {
    // Default colors in case parsing fails
    const defaultColors = {
      from: "#3b82f6", // blue-500
      to: "#6366f1", // indigo-500
    }

    try {
      // Find the part that starts with 'from-' or 'to-'
      const parts = gradientString.split(" ")
      const colorPart = parts.find((part) => part.startsWith(position + "-"))

      if (!colorPart) return defaultColors[position]

      // Extract the color name (e.g., 'blue-500' from 'from-blue-500')
      const colorName = colorPart.replace(position + "-", "")

      // Map color names to actual hex values
      // This is a simplified mapping - you might want to expand this
      const colorMap: Record<string, string> = {
        "blue-500": "#3b82f6",
        "indigo-500": "#6366f1",
        "purple-500": "#8b5cf6",
        "violet-500": "#8b5cf6",
        "emerald-500": "#10b981",
        "green-500": "#22c55e",
        "amber-500": "#f59e0b",
        "yellow-500": "#eab308",
        "sky-500": "#0ea5e9",
        "rose-500": "#f43f5e",
        "pink-500": "#ec4899",
        "orange-500": "#f97316",
        "cyan-500": "#06b6d4",
        "teal-500": "#14b8a6",
        "red-500": "#ef4444",
      }

      return colorMap[colorName] || defaultColors[position]
    } catch (error) {
      console.error("Error parsing gradient color:", error)
      return defaultColors[position]
    }
  }

  // Create a radar chart visualization
  const numSkills = skills.length
  const angleStep = (Math.PI * 2) / numSkills

  // Calculate coordinates for each skill point
  const skillPoints = skills.map((skill, i) => {
    const angle = i * angleStep - Math.PI / 2 // Start from top
    const radius = (skill.level / 100) * 120 // Scale to fit in container
    return {
      x: 150 + radius * Math.cos(angle),
      y: 150 + radius * Math.sin(angle),
      name: skill.name,
      level: skill.level,
    }
  })

  // Create polygon points string
  const polygonPoints = skillPoints.map((point) => `${point.x},${point.y}`).join(" ")

  return (
    <div className="relative w-[300px] h-[300px]">
      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* Background circles */}
        {[25, 50, 75, 100].map((level) => (
          <circle
            key={level}
            cx="150"
            cy="150"
            r={(level / 100) * 120}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {Array.from({ length: numSkills }).map((_, i) => {
          const angle = i * angleStep - Math.PI / 2
          const x2 = 150 + 120 * Math.cos(angle)
          const y2 = 150 + 120 * Math.sin(angle)
          return (
            <line key={i} x1="150" y1="150" x2={x2} y2={y2} stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
          )
        })}

        {/* Skill polygon */}
        <motion.polygon
          points={polygonPoints}
          fill={`url(#gradient-${category.id})`}
          fillOpacity="0.3"
          stroke={`url(#gradient-${category.id})`}
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id={`gradient-${category.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            {/* Extract colors safely from the gradient string */}
            <stop offset="0%" stopColor={getColorFromGradient(category.color, "from")} />
            <stop offset="100%" stopColor={getColorFromGradient(category.color, "to")} />
          </linearGradient>
        </defs>

        {/* Skill points */}
        {skillPoints.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="white"
            stroke={`url(#gradient-${category.id})`}
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          />
        ))}

        {/* Skill labels */}
        {skillPoints.map((point, i) => {
          const angle = i * angleStep - Math.PI / 2
          const labelRadius = 135
          const labelX = 150 + labelRadius * Math.cos(angle)
          const labelY = 150 + labelRadius * Math.sin(angle)

          // Adjust text anchor based on position
          const textAnchor =
            angle > -Math.PI / 4 && angle < Math.PI / 4
              ? "start"
              : angle > (Math.PI * 3) / 4 || angle < (-Math.PI * 3) / 4
                ? "end"
                : "middle"

          // Adjust vertical alignment
          const dy =
            angle > Math.PI / 4 && angle < (Math.PI * 3) / 4
              ? "0.8em"
              : angle > (-Math.PI * 3) / 4 && angle < -Math.PI / 4
                ? "-0.5em"
                : "0.3em"

          return (
            <motion.text
              key={i}
              x={labelX}
              y={labelY}
              textAnchor={textAnchor}
              dy={dy}
              fontSize="10"
              fill="currentColor"
              fillOpacity="0.7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 + 0.3 }}
            >
              {point.name}
            </motion.text>
          )
        })}
      </svg>
    </div>
  )
}

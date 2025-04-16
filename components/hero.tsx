"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-4 bg-background text-foreground">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Badge variant="secondary" className="w-fit mb-8 bg-secondary text-secondary-foreground">
          Senior Software Engineer
        </Badge>

        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-happy-hearts to-golden-nugget bg-clip-text text-transparent">
          Shaquille Williams
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Senior Software Engineer, AI Specialist, and Community Organizer specializing in machine learning, generative
          AI, cybersecurity, and STEM education.
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
          {["Machine Learning", "Generative AI", "Computer Vision", "NLP"].map((skill) => (
            <Badge key={skill} variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">View Projects</Button>
          <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
            Contact Me
          </Button>
        </div>

        <div className="flex gap-4">
          {[
            { icon: Github, href: "https://github.com/swilliams9772" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/shaquille-williams-957970129" },
            { icon: Mail, href: "mailto:contact@example.com" },
          ].map((social, index) => (
            <Button key={index} variant="ghost" size="icon" className="hover:bg-accent/10" asChild>
              <a href={social.href} target="_blank" rel="noopener noreferrer">
                <social.icon className="h-5 w-5" />
              </a>
            </Button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

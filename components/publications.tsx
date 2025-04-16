import { Book, Presentation } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Publications() {
  return (
    <section id="publications" className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Publications & Contributions</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Book className="h-5 w-5" />
            <h3 className="text-xl font-semibold">Publications</h3>
          </div>

          <div className="space-y-4">
            <PublicationCard
              title="Mastering Kubernetes (Third Edition)"
              type="Book"
              description="A comprehensive guide to container orchestration with Kubernetes, focusing on scalable ML deployments and community-oriented infrastructure."
              date="2023"
              link="#"
            />

            <PublicationCard
              title="Machine Learning for Cybersecurity Cookbook"
              type="Book"
              description="Practical recipes for implementing machine learning in cybersecurity applications, with a focus on ethical hacking and security for social justice initiatives."
              date="2022"
              link="#"
              journal="O'Reilly Media"
            />

            <PublicationCard
              title="Efficient Voice Cloning with Reduced Computational Resources"
              type="Journal"
              description="Novel techniques for optimizing voice synthesis models for edge devices and resource-constrained environments."
              date="2022"
              link="#"
              journal="IEEE Transactions on Audio Processing"
            />

            <PublicationCard
              title="Community-Centered AI: Bridging Technology and Social Impact"
              type="Conference Paper"
              description="Framework for developing AI solutions with direct community involvement and feedback loops for social change applications."
              date="2021"
              link="#"
              conference="NeurIPS Workshop on AI for Social Good"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-6">
            <Presentation className="h-5 w-5" />
            <h3 className="text-xl font-semibold">Workshops & Talks</h3>
          </div>

          <div className="space-y-4">
            <WorkshopCard
              title="GraphNR Workshop 2023"
              venue="Network Analysis Conference"
              description="Hands-on workshop on combining graph neural networks with social network analysis for community mapping and resource allocation."
              date="October 2023"
            />

            <WorkshopCard
              title="Hacktivism & Digital Tools for Social Change"
              venue="Social Justice Tech Summit"
              description="Workshop on ethical hacking, secure communication, and digital privacy tools for activists and community organizers."
              date="August 2023"
            />

            <WorkshopCard
              title="Democratizing AI Education"
              venue="STEM Education Summit"
              description="Keynote on creating accessible AI curriculum for underrepresented communities and educational institutions."
              date="May 2023"
            />

            <WorkshopCard
              title="MLOps for Community Organizations"
              venue="Tech for Social Impact Conference"
              description="Workshop on implementing lightweight ML pipelines for resource-constrained organizations and activist networks."
              date="February 2022"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

interface PublicationCardProps {
  title: string
  type: string
  description: string
  date: string
  link: string
  journal?: string
  conference?: string
}

function PublicationCard({ title, type, description, date, link, journal, conference }: PublicationCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge>{type}</Badge>
        </div>
        {journal && <div className="text-sm text-muted-foreground">{journal}</div>}
        {conference && <div className="text-sm text-muted-foreground">{conference}</div>}
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-3">{description}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">{date}</div>
          <a href={link} className="text-sm text-primary hover:underline">
            Read Paper
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

interface WorkshopCardProps {
  title: string
  venue: string
  description: string
  date: string
}

function WorkshopCard({ title, venue, description, date }: WorkshopCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline">{venue}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-3">{description}</p>
        <div className="text-sm text-muted-foreground">{date}</div>
      </CardContent>
    </Card>
  )
}

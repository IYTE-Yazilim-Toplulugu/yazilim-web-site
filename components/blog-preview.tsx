"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, Eye } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "Optimizing Voice Cloning Models for Edge Devices",
    excerpt:
      "Explore techniques for reducing the computational requirements of voice cloning models to run efficiently on resource-constrained edge devices.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "March 15, 2025",
    readTime: "8 min read",
    views: 1243,
    categories: ["AI", "Edge Computing"],
    featured: true,
  },
  {
    id: 2,
    title: "Building Community-Centered AI Solutions",
    excerpt:
      "How to develop AI applications that address real community needs through participatory design and continuous feedback loops.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "February 28, 2025",
    readTime: "6 min read",
    views: 987,
    categories: ["Community", "AI Ethics"],
    featured: false,
  },
  {
    id: 3,
    title: "The Future of MLOps: Trends and Best Practices",
    excerpt:
      "An overview of emerging trends in MLOps and recommendations for implementing robust machine learning pipelines.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "February 10, 2025",
    readTime: "10 min read",
    views: 1567,
    categories: ["MLOps", "DevOps"],
    featured: false,
  },
  {
    id: 4,
    title: "Democratizing AI Education: Lessons Learned",
    excerpt:
      "Insights from developing and implementing AI curriculum for underrepresented communities and educational institutions.",
    coverImage: "/placeholder.svg?height=400&width=600",
    date: "January 22, 2025",
    readTime: "7 min read",
    views: 842,
    categories: ["Education", "Diversity"],
    featured: false,
  },
]

export default function BlogPreview() {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)
  const { toast } = useToast()

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  const handleReadMore = (id: number) => {
    toast({
      title: "Blog Post",
      description: "This would navigate to the full blog post in a real implementation.",
      duration: 3000,
    })
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-4">Latest Articles</h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Thoughts, insights, and perspectives on AI, technology, and community building.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredPost && (
          <motion.div
            className="md:col-span-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card
              className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-primary/5 to-primary/10"
              onMouseEnter={() => setHoveredPost(featuredPost.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <Image
                    src={featuredPost.coverImage || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-500",
                      hoveredPost === featuredPost.id ? "scale-110" : "scale-100",
                    )}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {featuredPost.categories.map((category, index) => (
                        <Badge key={index} variant="outline">
                          {category}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold mb-3">{featuredPost.title}</h3>
                    <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{featuredPost.views.toLocaleString()} views</span>
                      </div>
                    </div>

                    <Button
                      variant="default"
                      className="w-full gap-2 group"
                      onClick={() => handleReadMore(featuredPost.id)}
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        )}

        {regularPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className="overflow-hidden h-full flex flex-col border-none shadow-md hover:shadow-lg transition-shadow duration-300"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-500",
                    hoveredPost === post.id ? "scale-110" : "scale-100",
                  )}
                />
              </div>

              <CardContent className="p-5 flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.map((category, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>

                <h3 className="font-bold mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
              </CardContent>

              <CardFooter className="p-5 pt-0 flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{post.date}</span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 p-0 h-auto hover:bg-transparent hover:text-primary"
                  onClick={() => handleReadMore(post.id)}
                >
                  <span>Read more</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" className="gap-2">
          View All Articles
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

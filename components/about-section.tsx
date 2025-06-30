"use client"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal, StaggeredContainer, StaggerItem } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Award, Briefcase, ExternalLink } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import HandleIcons from "./handle-icons"
import {HomeAboutUsConfig} from "@/types/types_config";

export default function AboutSection({ home_about_us }: { home_about_us?: HomeAboutUsConfig }) {
    return (
        <SectionContainer id="about" className="relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />

            <SectionHeader
                title={home_about_us?.title ?? "About Us"}
                subtitle={home_about_us?.description}
            />

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <ScrollReveal>
                    <div className="relative">
                        <div className="relative z-10 rounded-lg overflow-hidden border border-white/10 shadow-xl">
                            <Image
                                src={home_about_us?.left_content.find(item => item.name === "background")?.image ?? "/images/yazilim.png"}
                                alt="Yazilim Toplulugu"
                                width={600}
                                height={800}
                                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-4 text-white">
                                    <p className="font-medium">{home_about_us?.left_content.find(item => item.name === "lower_right")?.title}</p>
                                    <p className="text-sm text-white/80">{home_about_us?.left_content.find(item => item.name === "lower_right")?.subtitle}</p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-4 -left-4 w-full h-full border-2 border-primary/50 rounded-lg -z-10" />
                        <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-lg -z-10" />

                        {/* Stats cards */}
                        <motion.div
                            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            className="absolute -bottom-6 -right-6 w-40 shadow-lg backdrop-blur-sm bg-background/80 border-white/10 rounded-lg overflow-hidden"
                        >
                            <Card className="border-none bg-transparent">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2">
                                        <Award className="h-5 w-5 text-primary" />
                                        <div>
                                            <div className="text-sm font-medium">{home_about_us?.left_content.find(item => item.name === "lower_left")?.title}</div>
                                            <div className="text-2xl font-bold">{home_about_us?.left_content.find(item => item.name === "lower_left")?.subtitle}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            className="absolute -top-6 -right-6 w-40 shadow-lg backdrop-blur-sm bg-background/80 border-white/10 rounded-lg overflow-hidden"
                        >
                            <Card className="border-none bg-transparent">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="h-5 w-5 text-primary" />
                                        <div>
                                            <div className="text-sm font-medium">{home_about_us?.left_content.find(item => item.name === "upper_right")?.title}</div>
                                            <div className="text-2xl font-bold">{home_about_us?.left_content.find(item => item.name === "upper_right")?.subtitle}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </ScrollReveal>

                <div>
                    <StaggeredContainer>
                        <StaggerItem>
                            <h3 className="text-2xl font-bold mb-4">{home_about_us?.right_content.title}</h3>
                        </StaggerItem>

                        <StaggerItem>
                            <p className="text-muted-foreground mb-6">{home_about_us?.right_content.description1}</p>
                        </StaggerItem>

                        <StaggerItem>
                            <p className="text-muted-foreground mb-6">{home_about_us?.right_content.description2}</p>
                        </StaggerItem>

                        <StaggerItem>
                            <div className="flex flex-wrap gap-3 mb-8">
                                {home_about_us?.right_content.events.map((event, index) => (
                                    <Badge
                                        key={index}
                                        className="px-3 py-1.5 border transition-colors flex items-center gap-2"
                                        style={{
                                            backgroundColor: `${event.color}20`,
                                            color: event.color,
                                            borderColor: `${event.color}50`,
                                        }}
                                    >
                                        <HandleIcons icon={event.icon} />
                                        {event.content}
                                    </Badge>
                                ))}
                            </div>
                        </StaggerItem>

                        <StaggerItem>

                            <div className="flex items-center">
                                <Link href="/register" >
                                    <Button variant="outline" className="gap-2 group shadow-md bg-primary border-primary text-background hover:shadow-primary/10 transition-all duration-300 cursor-pointer">
                                        <Download className="h-4 w-4 group-hover:animate-bounce" />
                                        Join Us
                                    </Button>
                                </Link>
                                <Button variant="outline" className="ml-3 gap-2 group" asChild>
                                    <a
                                        href={home_about_us?.right_content.link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span>{home_about_us?.right_content.link.title}</span>
                                        <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </Button>


                            </div>
                        </StaggerItem>
                    </StaggeredContainer>
                </div>
            </div>
        </SectionContainer>
    )
}

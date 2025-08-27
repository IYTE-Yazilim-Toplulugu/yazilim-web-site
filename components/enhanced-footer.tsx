"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Send, ArrowUp } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { HandleIcons } from "@/components/handle-icons"
import { createClient } from "@/lib/supabase/client"
import handleErrorCode from "./handle-error-code"
import { HomeFooterConfig } from "@/types/types_config";
import { useTranslations } from "next-intl"


export default function EnhancedFooter({ home_footer }: { home_footer?: HomeFooterConfig }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const supabase = createClient()

    const t = useTranslations('home.footer')

    // Form validation schema
    const subscribeSchema = z.object({
        email: z.string().email({
            message: t('validate'),
        }),
    })

    // Initialize form
    const form = useForm<z.infer<typeof subscribeSchema>>({
        resolver: zodResolver(subscribeSchema),
        defaultValues: {
            email: "",
        },
    })


    const postMail = async (values: z.infer<typeof subscribeSchema>) => {
        try {
            const { data, error } = await supabase
                .from("newsletter_users")
                .insert([
                    {
                        email: values.email,
                        created_at: new Date().toISOString()
                    }
                ])
            if (error) {
                console.error("Error inserting data:", error)
                handleErrorCode(error.code)
            } else {
                toast({
                    title: t('success.title'),
                    description: t('success.desc', { data: data || "" }),
                    variant: "success",
                })
            }
        } catch (error) {
            console.error("Unexpected error:", error)
            toast({
                title: t('error.title'),
                description: t('error.desc'),
                variant: "destructive",
            })
        }
    }


    // Handle form submission
    function onSubmit(values: z.infer<typeof subscribeSchema>) {
        setIsSubmitting(true)
        postMail(values)
        setIsSubmitting(false)
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }



    return (
        <footer className="bg-gradient-to-b from-background to-background/80 border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="font-bold text-xl mb-4">{home_footer?.left_content.title}</div>
                        <p className="text-muted-foreground mb-6">{home_footer?.left_content.description}</p>

                        <div className="flex gap-3">
                            {home_footer?.left_content.links.map((link, index) => (
                                <Button
                                    variant="ghost"
                                    key={index}
                                    size="icon"
                                    asChild
                                    className="rounded-full transition-all duration-300 hover:scale-110"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = link.color + "80";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "transparent";
                                    }}
                                >
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`link-${index + 1}`}
                                    >
                                        <HandleIcons icon={link.icon} />
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="font-semibold mb-4">{t('quick_links')}</h3>
                        <div className="grid grid-cols-2 gap-y-3 text-nowrap">
                            {home_footer?.quick_links.map((link, index) => (
                                <Link href={link.url} key={index} className="text-muted-foreground hover:text-primary transition-colors duration-200 inline-block">{link.title}</Link>
                            ))}
                        </div>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="font-semibold mb-4">{t("contact_info")}</h3>
                        <ul className="space-y-3">
                            {home_footer?.contact_info.map((info, index) => (
                                <Link key={index} href={info.url ?? ""} className="flex items-center gap-3 text-muted-foreground hover:underline">
                                    <HandleIcons icon={info.icon} />
                                    <span>{info.title}</span>
                                </Link>
                            ))}
                        </ul>

                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="font-semibold mb-4">{t("newsletter")}</h3>
                        <p className="text-muted-foreground mb-4">{home_footer?.newsletter.description}</p>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex gap-2">
                                                <FormControl>
                                                    <Input placeholder={home_footer?.newsletter.placeholder} {...field} />
                                                </FormControl>
                                                <Button type="submit" size="icon" disabled={isSubmitting}>
                                                    {isSubmitting ? (
                                                        <svg
                                                            className="animate-spin h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            ></circle>
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            ></path>
                                                        </svg>
                                                    ) : (
                                                        <Send className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>

                        <p className="text-xs text-muted-foreground mt-2">{home_footer?.newsletter.terms}</p>
                    </motion.section>
                </div>

                <div className="border-t pt-6 flex md:flex-row justify-end items-center">
                    <div className="absolute left-1/2 -translate-x-1/2 text-sm text-muted-foreground text-center justify-center mb-4 md:mb-0">
                        {home_footer?.all_rights_reserved}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            onClick={scrollToTop}
                            aria-label="Scroll to top"
                        >
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

interface SocialButtonProps {
    icon: React.ReactNode
    url: string
    label: string
}

function SocialButton({ icon, url, label }: SocialButtonProps) {
    return (
        <Button
            variant="outline"
            size="icon"
            asChild
            className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
        >
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
                {icon}
            </a>
        </Button>
    )
}

interface FooterLinkProps {
    href: string
    label: string
}

function FooterLink({ href, label }: FooterLinkProps) {
    return (
        <li>
            <a
                href={href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 inline-block"
                onClick={(e) => {
                    e.preventDefault()
                    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
                }}
            >
                {label}
            </a>
        </li>
    )
}

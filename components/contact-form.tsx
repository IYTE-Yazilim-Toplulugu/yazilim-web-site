"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Send, CheckCircle, Mail, Phone, MapPin } from "lucide-react"
import { SectionHeader } from "./ui/section-container"
import { useIsMobile } from "@/hooks/use-mobile"
import ContactSubmitServer from "@/app/contact/(server)/contact_submit";
import { getConfigurations } from "@/utils/config_client_util";
import { ContactConfig, GeneralContactConfig } from "@/types/types_config";
import Link from "next/link";
import handleErrorCode from "./handle-error-code"
import { useTranslations } from "next-intl"



export default function ContactForm() {
    const { toast } = useToast()
    const isMobile = useIsMobile()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const [pageConfig, setPageConfig] = useState<ContactConfig>()
    const [contactConfig, setContactConfig] = useState<GeneralContactConfig>()

    const t = useTranslations('contact')

    // Form validation schema
    const formSchema = z.object({
        name: z.string().min(2, {
            message: t('schema.name'),
        }),
        email: z.string().email({
            message: t('schema.email'),
        }),
        subject: z.string().min(5, {
            message: t('schema.subject'),
        }),
        message: z.string().min(10, {
            message: t('schema.message'),
        }),
    })
    useEffect(() => {
        getConfigurations(["general_contact", "contact"]).then(a => {
            if (a.data && a.data.length > 0) {
                setContactConfig(a.data.find(x => x.key === 'general_contact')?.value);
                setPageConfig(a.data.find(x => x.key === 'contact')?.value);
            }
        });
    }, []);

    // Initialize form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        const error = await ContactSubmitServer({
            ...values,
            id: undefined,
            created_at: undefined
        });

        if (!error) {
            toast({
                title: t('sent.title'),
                description: t('sent.desc'),
            });

            setIsSubmitted(true);
        }
        else {
            console.log(error);
            handleErrorCode(error.code);
        }
        setIsSubmitting(false);
    }

    return (
        <div className="m-4 grid md:grid-cols-2 gap-8">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {isMobile
                    ? <SectionHeader titleClassName="text-2xl font-bold mb-6" title={pageConfig?.title ?? ""} />
                    : <h1 className="text-2xl font-bold mb-6">{pageConfig?.title}</h1>
                }
                <p className="text-muted-foreground mb-6">
                    {pageConfig?.description}
                </p>

                <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">{t('lside.email')}</div>
                            <div>{contactConfig?.email}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">{t('lside.phone')}</div>
                            <div>{contactConfig?.phone}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">{t('lside.location')}</div>
                            <div><Link href={contactConfig?.location_url ?? ""}>{contactConfig?.location_text}</Link></div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
            >
                {isSubmitted ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6">
                        <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                            <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t('sent.title')}</h3>
                        <p className="text-muted-foreground mb-6">{t('sent.desc')}</p>
                        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                            {t('sent.another')}
                        </Button>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('rside.name')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('rside.placeholder.name')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('rside.email')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('rside.placeholder.email')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('rside.subject')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('rside.placeholder.subject')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('rside.message')}</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder={t('rside.placeholder.message')} className="min-h-[120px] resize-none" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                        {t('rside.sending')}
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        {t('rside.send')}
                                        <Send className="h-4 w-4" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </Form>
                )}
            </motion.div>
        </div>
    )
}

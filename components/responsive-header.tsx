"use client"
import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation';

import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { getUser } from "@/utils/user_client_util";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import ThemeChanger from "@/components/themeChanger"
import LanguageSwitcher from "@/components/language-switcher"
import { NavbarProps } from "@/types/types"
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslations } from "next-intl";

export default function ResponsiveHeader() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()
    const isMobile = useIsMobile()
    const [isAdmin, setIsAdmin] = useState(false)
    const [fullName, setFullName] = useState("")

    const t = useTranslations("header");

    useLayoutEffect(() => {

        setIsMounted(true)
        getUser().then((user) => {
            setIsAdmin(user?.user_metadata.isAdmin || false)
            setFullName(user?.user_metadata.fullName || null)
        })
    }, [pathname])



    const NavItem = ({ href,
        pathname,
        children,
        className
    }: NavbarProps) => {
        const isActive = pathname === href;

        return (
            <Link
                href={href}
                className={`p-1 rounded-2xl flex items-center transition-all ${isActive ? "border-[#f2f2f2]" : ""
                    } ${className} ${isActive && "after:w-full"}`}
            >
                <span>
                    {children}
                </span>

            </Link>
        );
    }



    // Handle scroll effect
    useEffect(() => {

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 300)

            if (mobileMenuOpen) {
                setMobileMenuOpen(false)
            }
        }

        // Only add event listener client-side
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [mobileMenuOpen])


    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target as Node)
            ) {
                setMobileMenuOpen(false)
            }
        }

        if (mobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [mobileMenuOpen])

    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])



    const navItems = [
        { name: t("tabs.home"), href: "/home" },
        { name: t("tabs.aboutus"), href: "/home#about" },
        { name: t("tabs.events"), href: "/event" },
        { name: t("tabs.blogs"), href: "/blog" },
        { name: t("tabs.forms"), href: "/form" },
        { name: t("tabs.announcements"), href: "/home#announcements" },
        { name: t("tabs.gallery"), href: "/gallery" },
        { name: t("tabs.contact"), href: "/contact" },
    ]

    if (!isMounted) {
        return (
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="font-bold text-xl m-4">YS</div>
                        <div className="hidden md:block">
                            <div className="font-bold text-destructive">İYTE Yazılım Topluluğu</div>
                            <div className="text-xs text-muted-foreground">Software for Everyone</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-9 w-9"></div> {/* Placeholder for theme toggle */}
                        <div className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </header >
        )
    }

    if (pathname.startsWith("/admin")) {
        return null;
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-border transition-all duration-300 ${isScrolled ? "border-b" : "bg-transparent"}`}
        >
            {!isMobile && isAdmin && (
                <Link href="/admin/">
                    <Button variant="outline" className="m-4 absolute top-16 right-0 z-50 cursor-pointer">{t("rside.dashboard")}</Button>
                </Link>

            )}
            <div className="flex h-16 items-center justify-between px-4">
                <Link href="/">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2"
                    >
                        <div className="relative flex items-center gap-4 z-50">
                            <div className="absolute -top-1 -left-2 bg-destructive rounded-full h-14 w-14" />
                            <Image className="font-bold text-xl bg-gradient-to-r from-happy-hearts to-golden-nugget text-transparent bg-clip-text z-20" src="/images/yazilim.png" alt="yazilim" width={40} height={40} />
                            <div className="hidden lg:block text-nowrap">
                                <div className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-happy-hearts to-golden-nugget">{t("lside.title")}</div>
                                <div className="text-xs text-muted-foreground">{t("lside.sub")}</div>
                            </div>
                        </div>
                        <div className={`absolute inset-0 -top-8 -left-4 w-40 bg-background blur-xl rounded-md z-0 md:w-64 md:left-0 md:block ${mobileMenuOpen ? "block" : "hidden"}`}></div>
                    </motion.div>
                </Link>


                <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-4 lg:gap-6 text-sm">
                    {navItems.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <NavItem href={item.href} pathname={pathname} className={` 
                                relative transition-colors text-nowrap hover:text-primary
                                after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full ${isScrolled ? "animate-fadeOut" : ""}`}>
                                {item.name}
                            </NavItem>
                        </motion.div>
                    ))}
                </nav>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                        className="flex items-center space-x-3"
                    >

                        {fullName && (
                            <Link href={"/user"} className="lg:absolute lg:top-16 lg:right-32 2xl:flex 2xl:static">
                                <Label className="p-2 text-nowrap hover:bg-bite-tongue/80 rounded-md cursor-pointer">
                                    {fullName}
                                </Label>
                            </Link>
                        )}
                        {pathname === '/login' || pathname === '/register' ? null :
                            <div>
                                {!isMobile && (
                                    <div className="flex items-center space-x-3">
                                        {!isScrolled && <div className="lg:absolute lg:top-16 lg:right-4 2xl:flex 2xl:static">
                                            <LanguageSwitcher />
                                        </div>}
                                        <Link href={fullName ? "/logout" : "/login"} >
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="p-4 w-fit"
                                                aria-label="login"
                                            >
                                                {fullName ? t("rside.logout") : t("rside.login")}
                                            </Button>
                                        </Link>
                                        <ThemeChanger />
                                    </div>
                                )}
                                {isMobile && (
                                    <div className="flex items-center space-x-2">
                                        <ThemeChanger />
                                    </div>
                                )}
                            </div>
                        }
                    </motion.div>

                    <div className="lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={mobileMenuOpen}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            className="disabled:opacity-100"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        ref={mobileMenuRef}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden border-t overflow-hidden backdrop-blur-md"
                    >
                        <div className="absolute top-4 right-4">
                            <LanguageSwitcher />
                        </div>
                        <div className="flex flex-col space-y-3 p-4">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <NavItem href={item.href} pathname={pathname} className="
                                        relative transition-colors hover:text-primary w-fit 
                                        after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                                    >
                                        {item.name}
                                    </NavItem>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 10 * 0.05 }}
                            >
                                {isMobile && (
                                    <Link href={fullName ? "/logout" : "/login"} >
                                        <div className="p-1 -mt-1.5 mb-2
                                        relative transition-colors hover:text-primary w-fit 
                                        after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                                        >
                                            {fullName ? t("rside.logout") : t("rside.login")}
                                        </div>
                                    </Link>
                                )}
                                {isAdmin && (
                                    <Link href="/admin">
                                        <div className="p-1
                                        relative transition-colors hover:text-primary w-fit 
                                        after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">
                                            {t("rside.dashboard")}
                                        </div>
                                    </Link>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header >
    )
}

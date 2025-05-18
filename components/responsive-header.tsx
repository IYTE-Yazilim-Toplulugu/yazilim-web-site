"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from 'next/navigation';
import ThemeChanger from "@/components/themeChanger"

export default function ResponsiveHeader() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    const NavItem = ({ href, pathname, children, className }: { href: string; pathname: string; children: React.ReactNode, className?: string }) => {
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

    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        setIsMounted(true)

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 300)
        }

        // Only add event listener client-side
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { name: "Home", href: "/home" },
        { name: "About Us", href: "/home#about" },
        { name: "Events", href: "/home#events" },
        { name: "Blogs", href: "/blog" },
        { name: "Surveys", href: "/survey" },
        { name: "Announcements", href: "/announcement" },
        { name: "Gallery", href: "/gallery" },
        { name: "Contact", href: "/contact" },
    ]

    // If not mounted yet, render a simpler version to avoid hydration issues
    if (!isMounted) {
        return (
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="font-bold text-xl m-4">YS</div>
                        <div className="hidden md:block">
                            <div className="font-bold text-destructive">IYTE Yazilim Society</div>
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

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-all duration-300 ${isScrolled ? "border-b border-border" : "bg-transparent"}`}
        >
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
                            <div className="hidden md:block">
                                <div className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-happy-hearts to-golden-nugget">IYTE Yazilim Society</div>
                                <div className="text-xs text-muted-foreground">Software for Everyone</div>
                            </div>
                        </div>
                        <div className='absolute inset-0 -top-8 w-64 bg-background blur-xl rounded-md z-0'></div>
                    </motion.div>
                </Link>

                <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-4 lg:gap-6 text-sm">
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
                        <Link href="/login" >
                            <Button
                                variant="outline"
                                size="icon"
                                className="p-4 w-fit"
                                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            >
                                Login
                            </Button>

                        </Link>

                        <ThemeChanger />
                    </motion.div>

                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden border-t overflow-hidden backdrop-blur-md"
                    >
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
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

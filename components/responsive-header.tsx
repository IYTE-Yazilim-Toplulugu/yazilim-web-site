"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from 'next/navigation';

export default function ResponsiveHeader() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    const NavItem = ({ href, pathname, children }: { href: string; pathname: string; children: React.ReactNode }) => {
        const isActive = pathname === href;

        return (
            <Link
                href={href}
                className={`p-1 rounded-2xl flex items-center transition-all ${isActive ? "border-[#f2f2f2]" : ""
                    }`}
            >
                <span className={`${isActive ? "border-b border-white" : ""}`}>
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
            setIsScrolled(window.scrollY > 10)
        }

        // Only add event listener client-side
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { name: "Home", href: "/home" },
        { name: "About Us", href: "/home#about" },
        { name: "Announcements", href: "/announcement" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ]

    // If not mounted yet, render a simpler version to avoid hydration issues
    if (!isMounted) {
        return (
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="font-bold text-xl">YS</div>
                        <div className="hidden md:block">
                            <div className="font-bold">IYTE Yazilim Society</div>
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
            </header>
        )
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"}`}
        >
            <div className="container flex h-16 items-center justify-between px-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2"
                >
                    <div className="flex items-center gap-2">
                        <Image className="font-bold text-xl bg-gradient-to-r from-happy-hearts to-golden-nugget text-transparent bg-clip-text" src="/images/yazilim.png" alt="yazilim" width={20} height={20} />
                        <div className="hidden md:block">
                            <div className="font-bold">IYTE Yazilim Society</div>
                            <div className="text-xs text-muted-foreground">Software for Everyone</div>
                        </div>
                    </div>
                </motion.div>

                <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm">
                    {navItems.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <div className="
                                relative transition-colors hover:text-primary,
                                after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                            >
                                <NavItem href={item.href} pathname={pathname}>
                                    {item.name}
                                </NavItem>
                            </div>
                        </motion.div>
                    ))}
                </nav>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                    >
                        <ThemeSwitcher />
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
                        className="md:hidden border-t overflow-hidden bg-background/95 backdrop-blur-md"
                    >
                        <div className="flex flex-col space-y-3 p-4">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <div className="
                                        relative transition-colors hover:text-primary,
                                        after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                                    >
                                        <NavItem href={item.href} pathname={pathname}>
                                            {item.name}
                                        </NavItem>
                                    </div>
                                </motion.div>
                            ))}
                            <div className="pt-2 border-t border-border">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Theme settings</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

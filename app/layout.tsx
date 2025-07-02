import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./admin/(dashboard)/globals.css";
import ResponsiveHeader from "@/components/responsive-header";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import ScrollProgress from "@/components/scroll-progress";
import FloatingNav from "@/components/floating-nav";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "600", "700"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "IZTECH Software Society",
    description: "Software for Everyone",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Preload critical resources */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

                {/* Add meta tags for better performance */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            </head>
            <body
                className={`${poppins.variable} antialiased selection:bg-bite-tongue selection:text-primary-foreground`}
                suppressHydrationWarning
            >
                {/* defaultTheme enableSystem */}
                <ThemeProvider defaultTheme="system" enableSystem={true}>
                    <ResponsiveHeader />
                    <ScrollProgress />
                    <FloatingNav />
                    {/* <FloatingThemeSwitcher /> */}

                    {children}

                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}

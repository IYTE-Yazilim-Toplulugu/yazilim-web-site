import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ResponsiveHeader from "@/components/responsive-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ClientDiagnosticWrapper from "@/components/client-diagnostic-wrapper";
import ScrollProgress from "@/components/scroll-progress";
import FloatingNav from "@/components/floating-nav";
// import { FloatingThemeSwitcher } from "@/components/floating-theme-switcher";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "600", "700"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "IYTE Yazilim Society",
    description: "Software for Everyone",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Preload critical resources */}
                <link rel="preload" href="/placeholder.svg?height=400&width=400" as="image" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

                {/* Add preload hints for critical JavaScript */}
                <link rel="preload" href="/_next/static/chunks/framework.js" as="script" />

                {/* Add meta tags for better performance */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            </head>
            <body
                className={`${poppins.variable} antialiased`}
            >
                {/* defaultTheme enableSystem */}
                <ThemeProvider attribute="class" >
                    <ResponsiveHeader />
                    <ScrollProgress />
                    <FloatingNav />
                    {/* <FloatingThemeSwitcher /> */}

                    {children}

                    {/* For Test */}
                    <Toaster />
                    <ClientDiagnosticWrapper />
                </ThemeProvider>
            </body>
        </html>
    );
}

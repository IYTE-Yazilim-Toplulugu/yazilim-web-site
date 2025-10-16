import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
// import "./admin/(dashboard)/globals.css";
import ResponsiveHeader from "@/components/responsive-header";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import ScrollProgress from "@/components/scroll-progress";
import FloatingNav from "@/components/floating-nav";
import { NextIntlClientProvider } from "next-intl";
import ClientProviders from "./ClientProviders";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "600", "700"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "İYTE Yazılım Topluluğu",
    description: "İYTE Yazılım Topluluğu, yazılım konularında bir araya gelen bir okul topluluğudur. İYTE Yazılım Kulübü olarak, öğrenciler arası iletişimi artırmayı, projeler geliştirmeyi ve yazılım konularında birbirimizden öğrenmeyi amaçlıyoruz.",
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
                <link rel="icon" href="./favicon.ico" sizes="any" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                {/* <meta */}
                {/*     name="google-site-verification" */}
                {/*     content="KuBGjSO_RU-NqkzTVBRPsasuRdG5J30kkffXQdosHSc" */}
                {/* /> */}
                {/* <meta charSet="utf-8" /> */}
                {/* <meta name="keywords" content="iyte, Yazılım Topluluğu, İYTE Yazılım Kulübü, İYTE Yazılım, Okul Topluluğu"></meta> */}

            </head>
            <body
                className={`${poppins.variable} antialiased selection:bg-bite-tongue selection:text-primary-foreground`}
                suppressHydrationWarning
            >
                <ClientProviders>
                    <NextIntlClientProvider>
                        {/* defaultTheme enableSystem */}
                        <ThemeProvider defaultTheme="light" enableSystem={false}>
                            <ResponsiveHeader />
                            <ScrollProgress />
                            <FloatingNav />
                            {/* <FloatingThemeSwitcher /> */}

                            {children}

                            <Toaster />
                        </ThemeProvider>
                    </NextIntlClientProvider>
                </ClientProviders>
            </body>
        </html>
    );
}

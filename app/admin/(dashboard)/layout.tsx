import { Outfit } from 'next/font/google';
import '@/app/globals.css';

import { SidebarProvider } from '@/components/admin/context/SidebarContext';
import { ThemeProvider } from "next-themes"

const outfit = Outfit({
    subsets: ["latin"],
});

export default function AdminPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${outfit.className}`}>
            <ThemeProvider>
                <SidebarProvider>{children}</SidebarProvider>
            </ThemeProvider>
        </div>
    );
}

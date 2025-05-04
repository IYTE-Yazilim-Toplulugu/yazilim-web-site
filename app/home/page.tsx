"use client";
import Image from 'next/image';
import { ErrorBoundary } from '@/components/error-boundary';
import RedesignedHero from '@/components/redesigned-hero';
import { SectionFallback } from '@/components/section-fallback';
import EnhancedFooter from '@/components/enhanced-footer';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

// Simple loading component
function LoadingSection({ name }: { name: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading {name} section...</p>
        </div>
    )
}

export default function Home() {
    return (
        <main className="min-h-screen pt-16">

            <h1>Home Page for IYTE Yazilim Society Website</h1>
            <section className='flex flex-row mx-8 space-x-8 items-center'>
                <Image src="/images/yazilim.png" alt="IYTE Logo" width={200} height={200} />
                <p>Software for everyone.</p>
            </section>

            <ErrorBoundary fallback={<SectionFallback title="Hero" />}>
                <Suspense fallback={<LoadingSection name="Hero" />}>
                    <RedesignedHero />
                </Suspense>
            </ErrorBoundary>


            <EnhancedFooter />

        </main>
    )
}

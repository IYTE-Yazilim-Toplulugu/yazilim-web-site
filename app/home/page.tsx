"use client";
import Image from 'next/image';
// import ScrollProgress from '@/components/scroll-progress';
// import FloatingNav from '@/components/floating-nav';
// import { FloatingThemeSwitcher } from '@/components/floating-theme-switcher';
// import AboutSection from '@/components/about-section';
import { ErrorBoundary } from '@/components/error-boundary';
import RedesignedHero from '@/components/redesigned-hero';
import { SectionFallback } from '@/components/section-fallback';
// import RedesignedExperience from '@/components/redesigned-experience';
// import RedesignedProjects from '@/components/redesigned-projects';
// import CaseStudies from '@/components/case-studies';
// import Education from '@/components/education';
// import Publications from '@/components/publications';
// import Testimonials from '@/components/testimonials';
// import BlogPreview from '@/components/blog-preview';
// import ContactForm from '@/components/contact-form';
import EnhancedFooter from '@/components/enhanced-footer';
// import SkillsSectionWrapper from '@/components/skills-section-wrapper';
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
                <Image className='' src="/images/yazilim.png" alt="IYTE Logo" width={200} height={200} />
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

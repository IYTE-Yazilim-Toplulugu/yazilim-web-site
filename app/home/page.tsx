"use client";
import Image from 'next/image';
import LogoCanvas from '@/app/components/logo';

export default function Home() {
    return (
        <div className="fixed flex flex-col h-full align-middle self-center justify-center">
            <h1>Home Page for IYTE Yazilim Society Website</h1>
            <section className='items-center'>
                <LogoCanvas />
                <p>Software for everyone.</p>

            </section>

        </div>
    )
}

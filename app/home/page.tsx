"use client";
import Image from 'next/image';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
            <h1>Home Page for IYTE Yazilim Society Website</h1>
            <section className='flex flex-row mx-8 space-x-8 items-center'>
                <Image className='' src="/images/yazilim.png" alt="IYTE Logo" width={200} height={200} />
                <p>Software for everyone.</p>

            </section>

        </div>
    )
}

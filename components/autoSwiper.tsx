"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import Link from "next/link";


// This component will be responsive
export default function AutoSwiper({ spaceBetween = 20, slidesToShow = 1, roundedImage = "rounded-2xl", delayTime = 3000, height = "h-32" }: { spaceBetween?: number, slidesToShow?: number, roundedImage?: string, delayTime?: number, height?: string }) {

    const [imageData, setImageData] = useState([
        {
            "image": "/images/yazilim.png",
            "slug": "131ahduo81",
            "href": "/products/131ahduo81"
        },
        {
            "image": "/images/yazilim.png",
            "slug": "x82kdla91s",
            "href": "/products/x82kdla91s"
        },
        {
            "image": "/images/yazilim.png",
            "slug": "pqo29fdl20",
            "href": "/products/pqo29fdl20"
        },
        {
            "image": "/images/yazilim.png",
            "slug": "u48dnsle99",
            "href": "/products/u48dnsle99"
        },
        {
            "image": "/images/yazilim.png",
            "slug": "sld92wmd13",
            "href": "/products/sld92wmd13"
        },
        {
            "image": "/images/yazilim.png",
            "slug": "mvnd02fl48",
            "href": "/products/mvnd02fl48"
        },
        {
            "image": "/images/yazilim.png",
            "slug": "kkd20dfk99",
            "href": "/products/kkd20dfk99"
        },
        {
            "image": "/images/yazilim.png",
            "slug": "aopq39sd09",
            "href": "/products/aopq39sd09"
        },
        {
            "image": "/images/yazilim.png",
            "slug": "znb83mds10",
            "href": "/products/znb83mds10"
        },
        {
            "image": "/images/yazilim.png",
            "slug": "weo49dkp45",
            "href": "/products/weo49dkp45"
        }
    ])

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get("/api/announcements");
                setImageData(response.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    });

    return (
        <div className="flex justify-center items-center w-screen">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesToShow}
                loop={true}
                autoplay={{ delay: delayTime }}

                // --use for arrows and dots components--
                // pagination={{ clickable: true }}
                // navigation={true}

                className="w-screen"

            >
                {imageData.map((item, index) => (
                    <SwiperSlide key={index} className="flex justify-center items-center">
                        <Link href={item.href} className={`relative w-screen ${height} overflow-hidden flex justify-center`}>
                            <Image
                                src={item.image}
                                alt={`Slide ${index + 1}`}
                                fill
                                className={`object-cover ${roundedImage}`}
                                priority
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

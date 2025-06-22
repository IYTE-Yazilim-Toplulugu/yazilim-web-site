import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    allowedDevOrigins: [
        "10.8.34.199",
    ],
    async redirects() {
        return [
            {
                source: "/",
                destination: "/home",
                permanent: true,
            },
        ];
    },
    images: {
        domains: [
            "hwzvfnnxidvvtqwbetrm.supabase.co"
        ]
    }
};

export default nextConfig;

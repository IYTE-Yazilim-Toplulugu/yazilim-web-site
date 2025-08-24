import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */

    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
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
        remotePatterns: [
            {
                protocol: "https",
                hostname: "uhgnowwcngxkeryhuwdx.supabase.co",
            },
            {
                protocol: "https",
                hostname: "a-static.besthdwallpaper.com",
            }
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true
    },
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule: any) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )

        config.ignoreWarnings = [
            {
                module: /node_modules\/@supabase\/realtime-js\/.*/,
                message: /Critical dependency: the request of a dependency is an expression/,
            },
        ];

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
};

export default nextConfig;

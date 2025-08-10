import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'grxdvpjrcjozr7ce.public.blob.vercel-storage.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};
export default nextConfig;
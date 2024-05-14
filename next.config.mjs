/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.technodom.kz',
            },
        ],
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */

const nextConfig = {
    // output: "standalone",
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s3.ap-northeast-2.amazonaws.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    basePath: process.env.NEXT_PUBLIC_LOCAL_SERVER_PREFIX,
    async rewrites() {
        return [
            {
                source: '/swagger-json',
                destination: 'http://localhost:3000/swagger-json', // NestJS API URL
            },
            {
                source: `${process.env.NEXT_PUBLIC_LOCAL_SERVER_PREFIX}/:path*`,
                destination: `/:path*`
            },
            {
                source: `/:path*`,
                destination: `/login-after/:path*`
            }
        ]
    }
}

export default nextConfig;

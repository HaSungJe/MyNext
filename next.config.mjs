/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "standalone",
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
    async rewrites() { // 이 기능 사용시, Linux의 Nginx에서 up stream을 사용해야한다.
        const result = [
            {
                source: `/:path*`,
                destination: `/login-after/:path*`
            }
        ]

        if (process.env.NEXT_PUBLIC_LOCAL_SERVER_PREFIX) {
            result = [
                {
                    source: `${process.env.NEXT_PUBLIC_LOCAL_SERVER_PREFIX}/:path*`,
                    destination: `/:path*`
                },
                ...result
            ]
        }

        return result;
    }
}

export default nextConfig;

'use server';
import Import from '@/component/custom/import';
import NextTopLoader from 'nextjs-toploader';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <head>
                <link rel="icon" href={`${process.env.NEXT_PUBLIC_LOCAL_SERVER_PREFIX}/favicon.ico`} sizes="any" />
                <meta charSet="UTF-8" />
                <title>{process.env.SERVER_NAME}</title>
                <Import />
            </head>
            <body>
                <NextTopLoader showSpinner={false} />
                {children}
            </body>
        </html>
    )
}
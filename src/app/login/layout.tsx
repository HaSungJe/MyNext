'use client';
import { checkAuth } from '@/api/auth';
import Loading from '@/component/loading';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth().then((response) => {
            if (response) {
                router.push('/dashboard');
            } else {
                setLoading(false);
            }
        });
    }, []);

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <body>
                {children}
            </body>
        )
    }
}
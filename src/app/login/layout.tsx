'use client';
import { checkAuth } from '@/util/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import '@style/globals.css';
import Loading from '@/component/common/loading';

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
            <>
                {children}
            </>
        )
    }
}
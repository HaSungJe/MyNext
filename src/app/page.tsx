'use client';
import { useRouter } from "next/navigation";
import { checkAuth } from '@/util/auth';
import { useEffect } from "react";

export default function MainPage() {
    const router = useRouter();
    
    useEffect(() => {
        const fetch = async () => {
            const auth = await checkAuth();
            if (auth) {
                router.push('/dashboard');
            } else {
                router.push('/login');
            }
        }

        fetch();
    });
}
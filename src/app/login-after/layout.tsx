'use client'
import { checkAuth, getUserInfo } from '@/api/auth';
import { useRouter } from "next/navigation";
import { Info } from '@/component/info';
import { useEffect, useState } from 'react';
import MenuBar from '@/component/menu';
import Loading from '@/component/loading';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    
    useEffect(() => {
        checkAuth().then((response) => {
            if (response) {
                getUserInfo().then((response2) => {
                    setUserInfo(response2);
                    setAuth(response);
                    setLoading(false);
                })
            } else {
                router.push(`/login`);
            }
        });
    }, []);

    if (loading) {
        return (
            <Loading />
        )
    } else {
        if (auth) {
            return (
                <div id="wrap">
                    <Info info={userInfo}/>

                    <MenuBar info={userInfo}/>
                
                    {children}
                </div>
            )
        } else {
            router.push(`/login`);
        }
    }
}
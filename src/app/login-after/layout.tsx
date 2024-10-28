'use client'
import { useRouter } from "next/navigation";
import { Info } from '@/component/info';
import { useEffect, useState } from 'react';
import MenuBar from '@/component/menu';
import Loading from '@/component/loading';
import { axiosGet } from '@/util/axios';
import { axiosErrorHandle } from '@/util/util';
import '@style/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axiosGet(router, `${process.env.NEXT_PUBLIC_API_URL}/api/user/info`);
                setUserInfo(response.data.info)
                setLoading(false);
            } catch (error) {
                await axiosErrorHandle(error, router);
                setLoading(false);
            }
        }

        fetch();
    }, []);

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <div id="wrap">
                <Info info={userInfo}/>

                <MenuBar info={userInfo}/>
            
                {children}
            </div>
        )
    }
}
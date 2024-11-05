'use client'
import { useRouter } from "next/navigation";
import { Info } from '@/component/info';
import { useEffect, useState } from 'react';
import MenuBar from '@/component/menu';
import Loading from '@/component/loading';
import { axiosGet } from '@/util/axios';
import { axiosErrorHandle } from '@/util/util';
import '@style/globals.css';
import Footer from "@/component/footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    
    useEffect(() => {
        const fetch = async () => {
            try {
                // const response = await axiosGet(router, `${process.env.NEXT_PUBLIC_API_URL}/api/user/info`);
                // setUserInfo(response.data.info)
                setUserInfo({
                    user_nickname: '김멍멍'
                })

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

                <MenuBar />
            
                {children}
            </div>
        )
    }
}
'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loading from "@/component/loading";
import { axiosErrorHandle } from '@/util/util';
import { axiosGet } from '@/util/axios';
import Image from "next/image";

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const queryStr = "?" + useSearchParams().toString();
    const { user_seq } = useParams();
    const [user, setUser] = useState({
        user_email: '',
        user_nickname: '',
        user_mobile: '',
        provider_name: '',
        reg_dt: ''
    });

    useEffect(() => {
        const fetch = async () => {
            try {
                // const response = await axiosGet(router, `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/view/${user_seq}`);
                // setUser(response.data.info);

                setUser({
                    user_email: 'test@naver.com',
                    user_nickname: '김멍멍',
                    user_mobile: '010-1234-1234',
                    provider_name: '네이버',
                    reg_dt: '2024-11-05 09:34:00'
                });

                setLoading(false);
            } catch (error: any) {
                await axiosErrorHandle(error, router);
                router.push(`/user/list${queryStr}`);
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
            <div>
                <table className="">
                    <colgroup>
                        <col style={{width: '15%'}}/>
                        <col style={{width: '35%'}}/>
                        <col style={{width: '15%'}}/>
                        <col style={{width: '35%'}}/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>이메일</th>
                            <td>{user['user_email']}</td>
                            <th>대화명</th>
                            <td>{user['user_nickname']}</td>
                        </tr>
                        <tr>
                            <th>연락처</th>
                            <td>{user['user_mobile']}</td>
                            <th>가입일</th>
                            <td>{user['reg_dt']}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="">
                    <Link href={`/user/list${queryStr}`} className="">목록</Link> 
                    <Link href={`/user/modify/${user_seq}${queryStr}`} className="">수정</Link>
                </div>
            </div>
        )
    }
}
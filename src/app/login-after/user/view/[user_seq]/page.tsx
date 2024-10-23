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
                const response = await axiosGet(router, `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/view/${user_seq}`);
                setUser(response.data.info);
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
            <div id="container">
                <div id="contents">
                    <div className="inner">
                        <h2>회원정보</h2>
                        <div className="col-box">
                            <div className="card">
                                <div className="col info_area">
                                    <table className="board_write mb20">
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
    
                                    <div className="btn_area t_center">
                                        <Link href={`/user/list${queryStr}`} className="n-btn btn-gray">목록</Link> 
                                        <Link href={`/user/modify/${user_seq}${queryStr}`} className="n-btn btn-blue">수정</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
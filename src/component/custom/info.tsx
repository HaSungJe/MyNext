'use client';
import { deleteToken } from '@/util/auth';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';

type InfoProps = {
    info: any;
}

/**
 * 관리자 정보
 * 
 * @param param0 
 * @returns 
 */
export function Info( {info}: InfoProps ) {
    const router = useRouter();

    // 로그아웃
    const logout = async () => {
        const result = await deleteToken();
        if (result) {
            router.push('/user/sign-in')
        }
    }

    return (
        <div id="header">
            <h1>
                <Link href="/dashboard">
                    <div style={{ width: '131px', height: '20px', position: 'relative' }}>

                    </div>
                </Link>
            </h1>
            <div className=""> 
                <p className="">{info?.user_nickname}</p>
                <p className=""><Link href={`/myroom`}>정보수정</Link></p>
                <p className=""><button type="button" onClick={logout}>로그아웃</button></p>
            </div>
        </div>
    )
}
'use client';
import { useEffect } from 'react';
import Loading from '@/component/common/loading';
import { useRouter } from 'next/navigation';
import { deleteSNSAccessToken, getSNSAccessToken, setAccessToken, setRefreshToken } from '@/util/cookie';
import { axiosErrorHandle } from '@/util/util';
import { SignInDTO, SignUpDTO } from '../dto';
import { axiosPost, axiosPut } from '@/util/axios';

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            const data = await getSNSAccessToken();
            if (data) {
                await deleteSNSAccessToken(); // 세션 삭제
                
                try { // 소셜정보 확인
                    const response = await axiosPost(router, `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/sns/exist`, {sns_code: data.sns_code, sns_id: data.sns_id});
                    if (response.data.info) { // 로그인
                        try {
                            const dto = new SignInDTO({sns_code: data.sns_code, sns_id: data.sns_id});
                            const response = await axiosPost(router, `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/sign-in`, dto);
                            await setRefreshToken(response.data.refresh_token);
                            await setAccessToken(response.data.access_token, response.data.access_token_end_dt);
                            router.push('/');
                        } catch (error) {
                            await axiosErrorHandle(error, router);
                        }  
                    } else { // 회원가입
                        const dto = new SignUpDTO({sns_code: data.sns_code, sns_id: data.sns_id, user_name: data.name, user_email: data.email});
                        console.log("회원가입시도")
                        try {
                            const response = await axiosPut(router, `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/sign-up`, dto);
                            await setRefreshToken(response.data.refresh_token);
                            await setAccessToken(response.data.access_token, response.data.access_token_end_dt);
                            router.push('/');
                        } catch (error) {
                            await axiosErrorHandle(error, router);
                        }  
                    }
                } catch (error: any) {
                    alert(error.response.data.message);
                    router.push('/');
                }
            } else {
                // 소셜정보 확인불가
                alert('인증에 실패하였습니다.');
                router.push('/');
            }
        }

        fetch();
    }, []);

    return (
        <Loading />
    )
}
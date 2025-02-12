'use server';
import { setSNSAccessToken } from "@/util/cookie";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import NextAuth from "next-auth";

const handler = NextAuth({
    providers: [
        NaverProvider({
            clientId: process.env.NAVER_LOGIN_CLIENT_ID,
            clientSecret: process.env.NAVER_LOGIN_SECRET_ID,
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_LOGIN_CLIENT_ID,
            clientSecret: process.env.KAKAO_LOGIN_SECRET_ID
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async signIn({ account, profile }) {
            const profileData: any = profile;
            const body = {
                sns_code: '',
                sns_id: ''
            }

            // 세션 생성
            if (account.provider === 'naver') {
                body.sns_code = 'NAVER';
                body.sns_id = account.providerAccountId;
                await setSNSAccessToken({ 
                    ...body, 
                    access_token: account.access_token, 
                    name: profileData.response.name, 
                    email: profileData.response.email 
                });
            } else if (account.provider === 'kakao') {
                // TODO:: 카카오 동의항목 추가 후 작업필요
                body.sns_code = 'KAKAO';
                body.sns_id = account.providerAccountId;
                await setSNSAccessToken({ 
                    ...body, 
                    access_token: account.access_token, 
                    name: '김테스트',
                    email: 'test@naver.com'
                });
            }

            return true;
        },
        async redirect({ url, baseUrl }) {
            return '/user/sign-up/sns';
        },
    }
});

export { handler as GET, handler as POST };
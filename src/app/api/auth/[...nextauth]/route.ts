'use server';
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import NextAuth from "next-auth";
import { cookies } from "next/headers";
import * as jwt from 'jsonwebtoken';

const handler = NextAuth({
    providers: [
        NaverProvider({
            clientId: process.env.NAVER_LOGIN_CLIENT_ID,
            clientSecret: process.env.NAVER_LOGIN_SECRET_ID,
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_LOGIN_CLIENT_ID,
            clientSecret: process.env.KAKAO_LOGIN_SECRET_ID
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_LOGIN_CLIENT_ID,
            clientSecret: process.env.GOOGLE_LOGIN_SECRET_ID
        }),
        AppleProvider({
            clientId: process.env.APPLE_LOGIN_CLIENT_ID,
            clientSecret: process.env.APPLE_LOGIN_SECRET_ID
        }),        
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async signIn({ account, profile }) {
            const profileData: any = profile;
            let data = {};

            // 세션 생성
            if (account.provider === 'naver') {
                data = { 
                    sns_code: 'NAVER',
                    sns_id: account.providerAccountId,
                    access_token: account.access_token, 
                    name: profileData.response.name, 
                    email: profileData.response.email 
                }
            } else if (account.provider === 'kakao') {

            } else if (account.provider === 'google') {

            } else if (account.provider === 'apple') {

            }

            // SNS 로그인정보 쿠키에 저장
            const setTime = new Date().getTime() + (60 * 60 * 1000); // 1시간 유지
            const token = jwt.sign(data, process.env.NEXT_PUBLIC_JWT_CODE, {expiresIn: `1d`})
            cookies().set('sns', token, {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === 'development' ? false : true, 
                expires: setTime
            })

            return '/user/sign/up/sns';
        }
    }
});

export { handler as GET, handler as POST };
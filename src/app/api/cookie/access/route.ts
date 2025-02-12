'use server';
import axios from "axios";
import { cookies } from "next/headers";
import * as jwt from 'jsonwebtoken';

const headers = {
    'Content-Type': 'application/json'
}

// AccessToken 얻기
export async function GET(request: Request) {
    const url = new URL(request.url);
    const option = url.searchParams.get('option') || '';
    const accessToken = cookies().get('accessToken');

    if (accessToken) {
        if (option) {
            const result = jwt.verify(accessToken.value, process.env.NEXT_PUBLIC_JWT_CODE);
            return new Response(JSON.stringify(result), { status: 200, headers });
        } else {
            return new Response(accessToken.value, { status: 200, headers });
        }
    } else {
        // AccessToken이 존재하지 않는경우, Refresh
        const refreshToken = cookies().get('refreshToken');
        if (refreshToken) {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/refresh`, {headers: {refresh_token: refreshToken.value}});
                if (response.data.refresh_token) {
                    cookies().set('refreshToken', response.data.refresh_token, {
                        path: "/",
                        httpOnly: true,
                        sameSite: "strict",
                        secure: process.env.NODE_ENV === 'development' ? false : true, 
                    });
                }

                // 유지시간보다 1분 빨리 끝나도록해서 가능한 재발급받도록
                const setTime = new Date(new Date(response.data.access_token_end_dt).getTime() - (60 * 1000)); 
                cookies().set('accessToken', response.data.access_token, {
                    path: "/",
                    httpOnly: true,
                    sameSite: "strict",
                    secure: process.env.NODE_ENV === 'development' ? false : true,
                    expires: setTime
                });

                if (option) {
                    const result = jwt.verify(response.data.access_token, process.env.NEXT_PUBLIC_JWT_CODE);
                    return new Response(JSON.stringify(result), { status: 200, headers });
                } else {
                    return new Response(response.data.access_token, { status: 200, headers });
                }
            } catch (error) {
                cookies().delete('accessToken');
                cookies().delete('refreshToken');
                return new Response(null, { status: 400,headers });
            }
        } else { // RefreshToken 미존재시, 로그인 정보 없음.
            return new Response(null, { status: 400, headers });
        }
    }
}

// AccessToken 생성
export async function POST(request: Request) {
    const { setTime, data } = await request.json();

    try {
        const endTime = new Date(new Date(setTime).getTime() - (60 * 1000)); // 유지시간보다 1분 빨리 끝나도록해서 가능한 재발급받도록
        
        cookies().set('accessToken', data, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'development' ? false : true, 
            expires: endTime
        });
    
        return new Response(null, { status: 200, headers });
    } catch (error) {
        return new Response(null, { status: 400, headers });
    }
}
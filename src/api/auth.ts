"use server";
import { cookies } from "next/headers";
import axios from 'axios';

/**
 * AccessToken 얻기
 * 
 * @returns 
 */
export async function getAccessToken(): Promise<string | null> {
    const accessToken = cookies().get('accessToken');
    if (accessToken) { // AccessToken 존재시
        return accessToken.value;
    } else { // AcessToken 없는경우, Refresh
        const refresh = await checkRefreshToken();
        if (refresh) { // Refresh 성공시, AccessToken 다시 얻기
            const refreshAccessToken = cookies().get('accessToken');
            return refreshAccessToken.value;
        } else { // Refresh 실패시, 완전 로그아웃처리
            return null;
        }
    }
}

/**
 * AccessToken 존재여부 확인
 * 
 * @returns 
 */
export async function checkAuth(): Promise<boolean> {    
    const accessToken = cookies().get('accessToken');
    if (accessToken) {
        return true;
    } else {
        return await checkRefreshToken();
    }
}

/**
 * RefreshToken으로 AccessToken 재발급받기
 * 
 * @returns 
 */
export async function checkRefreshToken(): Promise<boolean> {
    const refreshToken = cookies().get('refreshToken');

    if (refreshToken && refreshToken.value) {
        // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/refresh`, {headers: {token: refreshToken?.value}});

        // if (response.data.statusCode === 200) {
        //     return await setAccessToken(response.data.access_token, response.data.access_token_end_dt);
        // } else {
        //     deleteToken();
        //     return false;
        // }

        return await setAccessToken(`access_${new Date().getTime()}`, null);
    } else {
        return false;
    }
}

/**
 * RefreshToken 저장
 * 
 * @param refreshToken 
 * @return
 */
export async function setRefreshToken(refreshToken: string): Promise<boolean> {
    try {
        cookies().set('refreshToken', refreshToken, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'development' ? false : true, 
        });
    
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * AccessToken 저장
 * 
 * @param accessToken 
 * @param endTime 
 * @returns 
 */
export async function setAccessToken(accessToken: string, endTime: string): Promise<boolean> {
    try {
        // const setTime = new Date(new Date(endTime).getTime() - (60 * 1000)); // 유지시간보다 1분 빨리 끝나도록해서 가능한 재발급받도록
        const setTime = new Date(new Date().getTime() + (60 * 1000 * 19)); // 현재시간 + 19분

        cookies().set('accessToken', accessToken, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'development' ? false : true,
            expires: setTime
        });

        return true;
    } catch (error) {
        return false;
    }
}

/**
 * 토큰 삭제
 * 
 * @returns 
 */
export async function deleteToken(): Promise<boolean> {
    try {
        cookies().delete('accessToken');
        cookies().delete('refreshToken');
        return true;
    } catch (error) {
        return false;
    }
}
"use server";
import { cookies } from "next/headers";
import * as jwt from 'jsonwebtoken';

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

export async function checkRefreshToken(): Promise<boolean> {
    const refreshToken = cookies().get('refreshToken');
    if (refreshToken && refreshToken.value) {
        return await setAccessToken(`access_${new Date().getTime()}`, null);

        // try {
        //     const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/refresh`, {headers: {token: refreshToken?.value}});
        //     await setRefreshToken(response.data.refresh_token);
        //     return await setAccessToken(response.data.access_token, response.data.access_token_end_dt);
        // } catch (error) {
        //     deleteToken();
        //     return false;
        // }
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

/**
 * 소셜 로그인 정보 저장
 * 
 * @param value 
 * @returns 
 */
export async function setSNSAccessToken(data: object): Promise<boolean> {
    try {
        const setTime = new Date().getTime() + (60 * 60 * 1000); // 1시간 유지
        const token = jwt.sign(data, process.env.JWT_CODE, {expiresIn: `1d`})
        cookies().set('sns', token, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'development' ? false : true, 
            expires: setTime
        })
    
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * 소셜 로그인 정보 얻기
 * 
 * @returns 
 */
export async function getSNSAccessToken(): Promise<any> {
    const data = cookies().get('sns');
    if (data) {
        return jwt.verify(data.value, process.env.JWT_CODE);
    } else {
        return null;
    }
}

/**
 * 소셜 로그인 정보 삭제
 * 
 * @returns 
 */
export async function deleteSNSAccessToken(): Promise<boolean> {
    try {
        const list = cookies().getAll();
        for (let i=0; i<list.length; i++) {
            const data = list[i];
            if (data.name.indexOf('next-auth') !== -1) {
                cookies().delete(data.name);
            }
        }

        cookies().delete('sns');
        return true;
    } catch (error) {
        return false;
    }
}
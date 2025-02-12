'use client';
import axios from 'axios';

/**
 * 소셜 로그인 정보 얻기
 * 
 * @returns 
 */
export async function getSNSAccessToken(): Promise<any> {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cookie/sns`);
        return response.data;
    } catch (error) {
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
        await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cookie/sns`);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * AccessToken 얻기
 * 
 * @returns 
 */
export async function getAccessToken(): Promise<string | null> {
    try {
        // AccessToken 존재시
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cookie/access`);
        return response.data;
    } catch (error) {        
        return null;
    }
}

/**
 * AccessToken를 복호화해서 얻기
 * 
 * @returns 
 */
export async function getAccessTokenData(): Promise<any> {
    try {
        // AccessToken 존재시
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cookie/access?option=1`);
        return response.data;
    } catch (error) {        
        return null;
    }
}

/**
 * AccessToken 존재여부 확인
 * 
 * @returns 
 */
export async function checkAuth(): Promise<boolean> {    
    try {
        await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cookie/access?option=1`);
        return true;
    } catch (error) {        
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
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cookie/refresh`, {data: refreshToken});
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * AccessToken 저장
 * 
 * @param accessToken 
 * @param setTime 
 * @returns 
 */
export async function setAccessToken(accessToken: string, setTime: string): Promise<boolean> {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cookie/access`, {setTime, data: accessToken});
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
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cookie/logout`, {});
        return true
    } catch (error) {
        return false;
    }
}
'use client';
import { deleteToken, getAccessToken } from '@/util/cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { axiosErrorHandle } from './util';

type AppRouterInstance = ReturnType<typeof useRouter>;

/**
 * Get
 * 
 * @param router
 * @param url 
 */
export async function axiosGet(router: AppRouterInstance, url: string) {
    try {
        const accessToken = await getAccessToken();
        return await axios.get(url, {headers: {accessToken: accessToken}});
    } catch (error: any) {
        if (error.response.data.statusCode === 401) {
            await deleteToken();
            await axiosErrorHandle(error, router);
        } else {
            throw error;
        }
    }
}

/**
 * Post 
 * 
 * @param router
 * @param url 
 * @param body 
 * @returns 
 */
export async function axiosPost(router: AppRouterInstance, url: string, body: any) {
    try {
        const accessToken = await getAccessToken();
        return await axios.post(url, body, {headers: {accessToken: accessToken}});
    } catch (error: any) {
        if (error.response.data.statusCode === 401) {
            await deleteToken();
            await axiosErrorHandle(error, router);
        } else {
            throw error;
        }
    }
}

/**
 * Put
 * 
 * @param router
 * @param url 
 * @param body 
 * @returns 
 */
export async function axiosPut(router: AppRouterInstance, url: string, body: any) {
    try {
        const accessToken = await getAccessToken();
        return await axios.put(url, body, {headers: {accessToken: accessToken}});
    } catch (error: any) {
        if (error.response.data.statusCode === 401) {
            await deleteToken();
            await axiosErrorHandle(error, router);
        } else {
            throw error;
        }
    }
}

/**
 * Patch
 * 
 * @param router
 * @param url 
 * @param body 
 * @param reload 
 * @returns 
 */
export async function axiosPatch(router: AppRouterInstance, url: string, body: any) {
    try {
        const accessToken = await getAccessToken();
        return await axios.patch(url, body, {headers: {accessToken: accessToken}});
    } catch (error: any) {
        if (error.response.data.statusCode === 401) {
            await deleteToken();
            await axiosErrorHandle(error, router);
        } else {
            throw error;
        }
    }
}

/**
 * Delete
 * 
 * @param router
 * @param url 
 * @param body 
 */
export async function axiosDelete(router: AppRouterInstance, url: string, body: any) {
    try {
        const accessToken = await getAccessToken();
        if (body && body !== null) {
            await axios.delete(url, { data: body, headers: {accessToken: accessToken}});
        } else {
            await axios.delete(url, { headers: {token: accessToken}});
        }
    } catch (error: any) {
        if (error.response.data.statusCode === 401) {
            await deleteToken();
            await axiosErrorHandle(error, router);
        } else {
            throw error;
        }
    }
}
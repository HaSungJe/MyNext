'use client';
import axios from 'axios';
import { checkRefreshToken, deleteToken, getAccessToken } from '@/util/auth';
import { useRouter } from 'next/navigation';
import { axiosErrorHandle } from './axiosError';

type AppRouterInstance = ReturnType<typeof useRouter>;

/**
 * 엑셀 다운로드
 * 
 * @param router 
 * @param fileName 
 * @param url 
 * @param reload 
 */
export async function axiosExcelDown(router: AppRouterInstance, fileName: string, url: string, reload: boolean = false) {
    try {
        const accessToken = await getAccessToken();
        const response = await axios.get(url, {responseType: 'blob', headers: {token: accessToken}});
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `${fileName}.xlsx`);
        link.style.cssText = "display:none";
        link.click();
        link.remove();
    } catch (error: any) {
        console.log(error)
        if (error.response.data.statusCode === 401) {
            if (reload) {
                await deleteToken();
                await axiosErrorHandle(error, router);
            } else {
                const refresh = await checkRefreshToken();
                if (refresh) {
                    axiosGet(router, url, true);
                } else {
                    await deleteToken();
                    await axiosErrorHandle(error, router);
                }
            }
        } else {
            throw error;
        }
    }
}

/**
 * Get
 * 
 * @param router
 * @param url 
 * @param reload
 */
export async function axiosGet(router: AppRouterInstance, url: string, reload: boolean = false) {
    try {
        const accessToken = await getAccessToken();
        return await axios.get(url, {headers: {token: accessToken}});
    } catch (error: any) {
        if (error.response.data.statusCode === 401) {
            if (reload) {
                await deleteToken();
                await axiosErrorHandle(error, router);
            } else {
                const refresh = await checkRefreshToken();
                if (refresh) {
                    axiosGet(router, url, true);
                } else {
                    await deleteToken();
                    await axiosErrorHandle(error, router);
                }
            }
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
 * @param reload
 * @returns 
 */
export async function axiosPost(router: AppRouterInstance, url: string, body: any, reload: boolean = false) {
    try {
        const accessToken = await getAccessToken();
        return await axios.post(url, body, {headers: {token: accessToken}});
    } catch (error: any) {
        if (error.response.data.statusCode === 401) {
            if (reload) {
                await deleteToken();
                await axiosErrorHandle(error, router);
            } else {
                const refresh = await checkRefreshToken();
                if (refresh) {
                    axiosPost(router, url, body, true);
                } else {
                    await deleteToken();
                    await axiosErrorHandle(error, router);
                }
            }
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
 * @param reload 
 * @returns 
 */
export async function axiosPut(router: AppRouterInstance, url: string, body: any, reload: boolean = false) {
    try {
        const accessToken = await getAccessToken();
        return await axios.put(url, body, {headers: {token: accessToken}});
    } catch (error: any) {
        if (error.response.data.statusCode === 401) {
            if (reload) {
                await deleteToken();
                await axiosErrorHandle(error, router);
            } else {
                const refresh = await checkRefreshToken();
                if (refresh) {
                    axiosPut(router, url, body, true);
                } else {
                    await deleteToken();
                    await axiosErrorHandle(error, router);
                }
            }
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
export async function axiosPatch(router: AppRouterInstance, url: string, body: any, reload: boolean = false) {
    try {
        const accessToken = await getAccessToken();
        return await axios.patch(url, body, {headers: {token: accessToken}});
    } catch (error: any) {
        if (error.response.data.statusCode === 401) {
            if (reload) {
                await deleteToken();
                await axiosErrorHandle(error, router);
            } else {
                const refresh = await checkRefreshToken();
                if (refresh) {
                    axiosPatch(router, url, body, true);
                } else {
                    await deleteToken();
                    await axiosErrorHandle(error, router);
                }
            }
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
 * @param reload 
 */
export async function axiosDelete(router: AppRouterInstance, url: string, body: any, reload: boolean = false) {
    try {
        const accessToken = await getAccessToken();
        if (body && body !== null) {
            await axios.delete(url, { data: body, headers: {token: accessToken}});
        } else {
            await axios.delete(url, { headers: {token: accessToken}});
        }
    } catch (error: any) {
        if (error.response.data.statusCode === 401) {
            if (reload) {
                await deleteToken();
                await axiosErrorHandle(error, router);
            } else {
                const refresh = await checkRefreshToken();
                if (refresh) {
                    axiosDelete(router, url, body, true);
                } else {
                    await deleteToken();
                    await axiosErrorHandle(error, router);
                }
            }
        } else {
            throw error;
        }
    }
}
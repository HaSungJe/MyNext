'use client';

/**
 * URL의 쿼리정보 얻기
 * - next/script로 jquery 등의 기능 사용시, useSearchParam 기능을 사용할 수 없으므로 해당 기능으로 대체함.
 * 
 * @returns 
 */
export function createQueryJSONForURL(pathname: string, url: string): Object {
    const result: any = {};
    const cutUrl = url.substring(url.indexOf(pathname) + pathname.length + 1);
    if (cutUrl) {
        const list = cutUrl.split("&");
        for (let i=0; i<list.length; i++) {
            const list2 = list[i].split('=');
            result[list2[0]] = decodeURIComponent(list2[1]);
        }
    }

    return result;
}

/**
 * QueryString 만들기
 * 
 * @param obj 
 * @returns 
 */
export function createQueryString(obj: any): string {
    let str = '';
    const keys = Object.keys(obj);
    for (let i=0; i<keys.length; i++) {
        const key = keys[i];
        const value = obj[key];
        str += i === 0 ? `?${key}=${value}` : `&${key}=${value}`;
    }

    return str;
}
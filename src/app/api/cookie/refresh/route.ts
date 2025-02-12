'use server';
import { cookies } from "next/headers";
import * as jwt from 'jsonwebtoken';

const headers = {
    'content-type': 'application/json'
}

// 소셜 로그인정보 쿠키 얻기
export async function GET() {
    const data = cookies().get('sns');

    try {
        if (data) {
            const data = cookies().get('sns');
            const result = jwt.verify(data.value, process.env.NEXT_PUBLIC_JWT_CODE);

            return new Response(JSON.stringify({ success: true, data: result }), { headers });
        } else {
            return new Response(JSON.stringify({ success: false }), { headers });
        }
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), { headers });
    }
}

// 소셜 로그인정보 쿠키 삭제
export async function DELETE() {
    try {
        // 소셜 로그인정보 쿠키 삭제
        cookies().delete('sns');

        // next-auth 쿠키 삭제
        const cookieList = cookies().getAll();
        for (let i=0; i<cookieList.length; i++) {
            if (cookieList[i].name.indexOf('next-auth') !== -1) {
                cookies().delete(cookieList[i].name);
            }
        }

        return new Response(JSON.stringify({ success: true }), { headers });
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), { headers });
    }
}

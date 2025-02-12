'use server';
import { cookies } from "next/headers";

const headers = {
    'Content-Type': 'application/json'
}

// 로그아웃 생성
export async function POST(request: Request) {
    try {
        cookies().delete('accessToken');
        cookies().delete('refreshToken');
        return new Response(null, { status: 200, headers });
    } catch (error) {
        return new Response(null, { status: 400, headers });
    }
}
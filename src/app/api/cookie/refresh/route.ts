'use server';
import { cookies } from "next/headers";

const headers = {
    'Content-Type': 'application/json'
}

// refreshToken 얻기
export async function GET() {
    const data = cookies().get('refreshToken');

    if (data) {
        return new Response(data.value, { status: 200, headers });
    } else {
        return new Response(null, { status: 400, headers });
    }
}

// refreshToken 생성
export async function POST(request: Request) {
    const { data } = await request.json();

    try {
        cookies().set('refreshToken', data, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'development' ? false : true, 
        });
    
        return new Response(null, { status: 200, headers });
    } catch (error) {
        return new Response(null, { status: 400, headers });
    }
}
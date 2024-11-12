'use server';
import { NextRequest, NextResponse } from "next/server";
import * as db from '@/database/db';

/**
 * 로그인
 * 
 * @param req 
 * @returns 
 */
export async function POST(req: NextRequest) {
    const {user_id, user_pw} = await req.json();

    const result = await db.selectOne(`select * from t_user where user_id = ? and user_pw = ?`, [user_id, user_pw]);
    if (result) {
        // 로그인 성공
        return NextResponse.json({ message: 'ok' }, { status: 200 });
    } else {
        // 로그인 실패
        return NextResponse.json({ message: '회원 정보를 찾을 수 없습니다.' }, { status: 400 });
    }
}

// const conn = await mysql2.getConnection();
// await conn.beginTransaction();
// await conn.commit();
// await conn.rollback();
// conn.release();
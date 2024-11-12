import { NextRequest, NextResponse } from "next/server";
 
export async function POST(req: NextRequest) {


    console.log(`--------------------`)


    return NextResponse.json({ message: 'Hello from Next.js!' }, { status: 200 })
}
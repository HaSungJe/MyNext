'use client'
import { useEffect, useState } from "react";
import { setRefreshToken, setAccessToken } from '@/api/auth';
import { useRouter } from "next/navigation";
import { changeFunction } from "@/util/function";
import { axiosPost } from "@/util/axios";
import Link from "next/link";
import Image from "next/image";


export default function Login() {
    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');

    // 로그인
    async function submit() {
        try {
            const response = await axiosPost(router, `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/login`, {
                user_email: userId,
                user_pw: userPw
            })

            const checkbox: HTMLInputElement | null = document.getElementById('saveCheckbox') as HTMLInputElement | null;
            if (checkbox.checked) {
                localStorage.setItem('saveId', userId);
            } else {
                localStorage.removeItem('saveId');
            }

            await setRefreshToken(response.data.refresh_token);
            await setAccessToken(response.data.access_token, response.data.access_token_end_dt);
            router.push("/dashboard");
        } catch (error: any) {
            alert(error.response.data.message || '실패했습니다.')
        }
    }

    useEffect(() => {
        setUserId(userId);
    }, [userId]);

    useEffect(() => {
        setUserPw(userPw);
    }, [userPw])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saveId = localStorage.getItem('saveId');
            if (saveId) {
                const checkbox: HTMLInputElement | null = document.getElementById('saveCheckbox') as HTMLInputElement | null;
                checkbox.checked = true;
                setUserId(saveId);
            }
        }
    }, [])

    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key === 'Enter') {
                const fetch = async () => {
                    await submit();
                }
                fetch();
            }
        }

        document.addEventListener('keypress', handleKeyPress);
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        }
    })

    return (
        <div className="font-sans">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-blue-600 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                    <div className="card bg-red-600 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                    <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                        <label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">로그인</label>
                        <form className="mt-10"> 
                            <div>
                                <input type="email" placeholder="이메일을 입력하세요." value={userId} onChange={() => changeFunction(event, setUserId)} className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                            </div>
                
                            <div className="mt-7">                
                                <input type="password" placeholder="비밀번호를 입력하세요." value={userPw} onChange={() => changeFunction(event, setUserPw)} className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />                           
                            </div>
 
                            <div className="mt-7">
                                <button type="button" onClick={() => submit()} className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105" >
                                    로그인
                                </button>
                            </div>

                            <div className="mt-7 flex">
                                <label htmlFor="remember_me" className="inline-flex items-center w-full cursor-pointer">
                                    <input id="saveCheckbox" type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember" />
                                    <span className="ml-2 text-sm text-gray-600">아이디 저장하기</span>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
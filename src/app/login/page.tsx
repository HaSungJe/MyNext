'use client'
import { useEffect, useState } from "react";
import { setRefreshToken, setAccessToken } from '@/api/auth';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { changeFunction } from "@/util/function";
import { axiosPost } from "@/util/axios";

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
        <div className="div.login_area_top">
            <form>
                <div id="wrap">
                    <div className="login_bg_area">
                        <div className="bg_overlay" />
                    </div>
                    
                    <div className="login_area">
                        <h1><span>MyNext</span></h1>

                        <div className="login_box">
                            <div className="login">
                                <h2>Welcome !</h2>
                                <p>Sign in</p>
                            </div>
                            <div className="in_box">
                                <ul>
                                    <li>
                                        <input type="text" autoComplete="userId" placeholder="이메일을 입력하세요." value={userId} onChange={() => changeFunction(event, setUserId)}/>
                                        <i className="bar"></i>
                                    </li>
                                    <li>
                                        <input type="password" autoComplete="userPw" placeholder="비밀번호를 입력하세요." value={userPw} onChange={() => changeFunction(event, setUserPw)}/>
                                        <i className="bar"></i>
                                    </li>
                                </ul>
                            </div>
                            <p className="btn_login">
                                <button className="btn2" type="button" id="loginBtn" onClick={() => submit()}>로그인</button>
                            </p>
                            <div className="check_info">
                                <p className="id_check">
                                    <span className="input">
                                        <input id="saveCheckbox" type="checkbox" className="checkbox"/>
                                        <label htmlFor="saveCheckbox">아이디 저장하기</label>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
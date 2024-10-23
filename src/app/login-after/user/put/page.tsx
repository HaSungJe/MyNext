'use client'
import { changeFunction } from "@/util/function";
import { useEffect, useState } from "react";
import { AdminUserPutDTO } from "../dto";
import { axiosErrorHandle, resetValidationError, validateAction } from "@/util/util";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/component/loading";
import { axiosPut } from "@/util/axios";

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const queryStr = "?" + useSearchParams().toString();
    const [user_email, setUserEmail] = useState('');
    const [user_name, setUserName] = useState('');
    const [user_pw, setUserPw] = useState('');
    const [user_pw2, setUserPw2] = useState('');
    const [user_nickname, setUserNickname] = useState('');
    const [user_birth, setUserBirth] = useState('');
    const [user_mobile, setUserMobile] = useState('');
    const [mobile1, setMobile1] = useState('');
    const [mobile2, setMobile2] = useState('');
    const [mobile3, setMobile3] = useState('');
    const [user_gender, setUserGender] = useState('M');

    // 등록
    async function action() {
        resetValidationError();
        const dto = new AdminUserPutDTO({
            user_email, user_name, user_pw, user_pw2, user_nickname,
            user_birth, user_mobile, user_gender
        });

        const check = await validateAction(dto);
        if (check) {
            try {
                await axiosPut(router, `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user`, dto);
                
                alert('등록되었습니다.');
                router.push(`/user/list`);
            } catch (error) {
                await axiosErrorHandle(error, router);
            }
        }
    }

    useEffect(() => {
        const fetch = async () => {
            setLoading(false);
        }
    
        fetch();
    }, [])

    useEffect(() => {
        setMobile1(mobile1);
        setMobile2(mobile2);
        setMobile3(mobile3);

        let tel = mobile1;
        if (mobile2) {
            tel = tel ? `${tel}-${mobile2}` : mobile2;
        }
        if (mobile3) {
            tel = tel ? `${tel}-${mobile3}` : mobile3;
        }
        
        setUserMobile(tel);
    }, [mobile1, mobile2, mobile3])

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <div id="container">
                <div id="contents">
                    <div className="inner">
                        <h2>회원등록</h2>
                        <div className="col-box">
                            <div className="card">
                                <div className="col info_area">
                                    <form>
                                        <table className="board_write mb20">
                                            <colgroup>
                                                <col style={{width: '15%'}} />
                                                <col style={{width: '35%'}} />
                                                <col style={{width: '15%'}} />
                                                <col style={{width: '35%'}} />
                                            </colgroup>
                                            <tbody>
                                                <tr>
                                                    <th><span className="ip_ico">필수입력</span>이메일</th>
                                                    <td>
                                                        <input type="text" autoComplete="one-time-code" className="text w_64" value={user_email} onChange={() => changeFunction(event, setUserEmail)}/>
                                                        <span data-type="alert_span" data-val="user_email" className="" />
                                                    </td>
                                                    <th>이름</th>
                                                    <td>
                                                        <input type="text" autoComplete="one-time-code" className="text w_64" value={user_name} onChange={() => changeFunction(event, setUserName)}/>
                                                        <span data-type="alert_span" data-val="user_name" className="" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th><span className="ip_ico">필수입력</span>대화명</th>
                                                    <td>
                                                        <input type="text" autoComplete="one-time-code" className="text w_64" value={user_nickname} onChange={() => changeFunction(event, setUserNickname)}/>
                                                        <span data-type="alert_span" data-val="user_nickname" className="" />
                                                    </td>
                                                    <th>연락처</th>
                                                    <td className="phone">
                                                        <input type="number" autoComplete="one-time-code" className="text" value={mobile1} onChange={() => changeFunction(event, setMobile1)}/>
                                                        <span>-</span> 
                                                        <input type="number" autoComplete="one-time-code" className="text" value={mobile2} onChange={() => changeFunction(event, setMobile2)}/>
                                                        <span>-</span>
                                                        <input type="number" autoComplete="one-time-code" className="text" value={mobile3} onChange={() => changeFunction(event, setMobile3)}/>
                                                        <span data-type="alert_span" data-val="user_mobile" className="" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th><span className="ip_ico">필수입력</span>비밀번호</th>
                                                    <td>
                                                        <input type="password" autoComplete="one-time-code" className="text w_64" value={user_pw} onChange={() => changeFunction(event, setUserPw)}/>
                                                        <span data-type="alert_span" data-val="user_pw" className="" />
                                                    </td>
                                                    <th><span className="ip_ico">필수입력</span>비밀번호확인</th>
                                                    <td>
                                                        <input type="password" autoComplete="one-time-code" className="text w_64" value={user_pw2} onChange={() => changeFunction(event, setUserPw2)}/>
                                                        <span data-type="alert_span" data-val="user_pw2" className="" />
                                                    </td>
                                                </tr>  
                                                <tr>
                                                    <th>생년월일</th>
                                                    <td>
                                                        <input type="date" autoComplete="one-time-code" className="text" value={user_birth} onChange={() => changeFunction(event, setUserBirth)}/>
                                                        <span data-type="alert_span" data-val="user_birth" className="" />
                                                    </td>
                                                    <th>성별</th>
                                                    <td>
                                                        <select className="select small" value={user_gender} onChange={() => changeFunction(event, setUserGender)}>
                                                            <option value="M">남성</option>
                                                            <option value="F">여성</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </form>
    
                                    <div className="btn_area t_center">
                                        <Link href={`/user/list${queryStr}`} className="n-btn btn-gray">취소</Link> 
                                        <button className="n-btn btn-blue" onClick={action}>등록</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
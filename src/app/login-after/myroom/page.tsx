'use client';
import { changeFunction } from "@/util/function";
import { axiosErrorHandle, resetValidationError, validateAction } from "@/util/util";
import { useEffect, useState } from "react";
import { AdminPatchMyInfoDTO } from "./dto";
import { useRouter } from "next/navigation";
import Loading from "@/component/loading";
import { axiosGet, axiosPatch } from "@/util/axios";

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user_email, setUserEmail] = useState('');
    const [user_name, setUserName] = useState('');
    const [user_nickname, setUserNickname] = useState('');
    const [user_pw, setUserPw] = useState('');
    const [user_pw2, setUserPw2] = useState('');
    const [user_mobile, setUserMobile] = useState('')
    const [mobile1, setMobile1] = useState('');
    const [mobile2, setMobile2] = useState('');
    const [mobile3, setMobile3] = useState('');

    // 정보수정
    async function action() {
        resetValidationError();
        const dto = new AdminPatchMyInfoDTO({
            user_name, user_nickname, user_pw, user_pw2, user_mobile
        });
        const check = await validateAction(dto);
        if (check) {
            try {
                await axiosPatch(router, `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/myinfo`, dto);
                
                alert('수정되었습니다.');
                router.push(`/dashboard`);
            } catch (error) {
                await axiosErrorHandle(error, router);
            }
        }
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axiosGet(router, `${process.env.NEXT_PUBLIC_API_URL}/api/user/info`);
                const userInfo = response.data.info;
                setUserName(userInfo ? userInfo['user_name'] : '');
                setUserEmail(userInfo ? userInfo['user_email'] : '');
                setUserNickname(userInfo ? userInfo['user_nickname'] : '');

                const mobile_split = userInfo ? userInfo['user_mobile'].split('-') : [];
                if (mobile_split && mobile_split[0]) {
                    setMobile1(mobile_split[0]);
                }
                if (mobile_split && mobile_split[1]) {
                    setMobile2(mobile_split[1]);
                }
                if (mobile_split && mobile_split[2]) {
                    setMobile3(mobile_split[2]);
                }

                setLoading(false);
            } catch (error) {
                await axiosErrorHandle(error, router);
                setLoading(false);
            }
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
                        <h2>정보수정</h2>
                        <div className="col-box">
                            <div className="card">
                                <div className="col info_area">
                                    <table className="board_write mb20">
                                        <colgroup>
                                            <col style={{width: '200px'}}/>
                                            <col style={{width: 'auto'}}/>
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th>이메일</th>
                                                <td>{user_email}</td>
                                            </tr>
                                            <tr>
                                                <th>이름</th>
                                                <td>
                                                    <input type="text" autoComplete="one-time-code" className="text" size={40} value={user_name} onChange={() => changeFunction(event, setUserName)}/>
                                                    <span data-type="alert_span" data-val="user_name" className="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th><span className="ip_ico">필수입력</span>대화명</th>
                                                <td>
                                                    <input type="text" autoComplete="one-time-code" className="text" size={40} value={user_nickname} onChange={() => changeFunction(event, setUserNickname)}/>
                                                    <span data-type="alert_span" data-val="user_nickname" className="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>비밀번호</th>
                                                <td>
                                                    <input type="password" autoComplete="one-time-code" className="text" size={40} value={user_pw} onChange={() => changeFunction(event, setUserPw)}/>
                                                    <span data-type="alert_span" data-val="user_pw" className="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>비밀번호 확인</th>
                                                <td>
                                                    <input type="password" autoComplete="one-time-code" className="text" size={40} value={user_pw2} onChange={() => changeFunction(event, setUserPw2)}/>
                                                    <span data-type="alert_span" data-val="user_pw2" className="" />
                                                </td>
                                            </tr>
                                            <tr>
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
                                        </tbody>
                                    </table>
    
                                    <div className="btn_area t_center">
                                        <button className="n-btn btn-blue" onClick={action}>수정</button>
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
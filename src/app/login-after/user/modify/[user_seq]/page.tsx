'use client'
import { changeFunction } from "@/util/function";
import { useEffect, useState } from "react";
import { AdminUserPatchDTO } from "../../dto";
import { axiosErrorHandle, resetValidationError, validateAction } from "@/util/util";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/component/loading";
import { axiosGet, axiosPatch } from "@/util/axios";

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const queryStr = "?" + useSearchParams().toString();
    const { user_seq } = useParams();
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
    const [region_code, setRegionCode] = useState('');

    // 수정
    async function action() {
        resetValidationError();
        const dto = new AdminUserPatchDTO({
            user_seq, user_name, user_pw, user_pw2, user_nickname,
            user_birth, user_mobile, user_gender
        });

        const check = await validateAction(dto);
        if (check) {
            try {
                // await axiosPatch(router, `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user`, dto);
                
                alert('수정되었습니다.');
                router.push(`/user/view/${user_seq}${queryStr}`);
            } catch (error) {
                await axiosErrorHandle(error, router);
            }
        }
    }

    useEffect(() => {
        setUserName(user_name);
        setUserPw(user_pw);
        setUserPw2(user_pw2);
        setUserNickname(user_nickname);
        setUserBirth(user_birth);
        setUserGender(user_gender);
        setRegionCode(region_code);

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
    }, [user_name, user_pw, user_pw2, user_nickname, user_birth, mobile1, mobile2, mobile3, user_gender, region_code]);

    useEffect(() => {
        const fetch = async () => {
            // 회원정보
            try {
                // const response = await axiosGet(router, `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/view/${user_seq}`);
                // setUserEmail(response.data.info['user_email'] ? response.data.info['user_email'] : '');
                // setUserName(response.data.info['user_name'] ? response.data.info['user_name'] : '');
                // setUserNickname(response.data.info['user_nickname'] ? response.data.info['user_nickname'] : '');
                // setUserBirth(response.data.info['user_birth'] ? response.data.info['user_birth'] : '');
                // setUserMobile(response.data.info['user_mobile'] ? response.data.info['user_mobile'] : '');
                // setUserGender(response.data.info['user_gender'] ? response.data.info['user_gender'] : 'M');
                // setRegionCode(response.data.info['region_code'] ? response.data.info['region_code'] : '');


                setUserEmail('test@naver.com');
                setUserName('김멍멍');
                setUserNickname('김멍멍');
                setUserBirth('199-05-09');
                setUserMobile('010-1234-1234');
                setUserGender('M');
                setRegionCode('26010');

                setLoading(false);
            } catch (error: any) {
                await axiosErrorHandle(error, router);
                router.push(`/user/list${queryStr}`);
            }
        }

        fetch();
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <div>
                <form>
                    <table className="">
                        <colgroup>
                            <col style={{width: '200px'}} />
                            <col style={{width: 'auto'}} />
                            <col style={{width: '200px'}} />
                            <col style={{width: 'auto'}} />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>이메일</th>
                                <td>{user_email}</td>
                                <th>이름</th>
                                <td>
                                    <input type="text" autoComplete="one-time-code" className="" value={user_name} onChange={() => changeFunction(event, setUserName)}/>
                                    <span data-type="alert_span" data-val="user_name" className="" />
                                </td>
                            </tr>
                            <tr>
                                <th><span className="ip_ico">필수입력</span>대화명</th>
                                <td>
                                    <input type="text" autoComplete="one-time-code" className="" value={user_nickname} onChange={() => changeFunction(event, setUserNickname)}/>
                                    <span data-type="alert_span" data-val="user_nickname" className="" />
                                </td>
                                <th>연락처</th>
                                <td className="phone">
                                    <input type="number" autoComplete="one-time-code" className="" value={mobile1} onChange={() => changeFunction(event, setMobile1)}/>
                                    <span>-</span> 
                                    <input type="number" autoComplete="one-time-code" className="" value={mobile2} onChange={() => changeFunction(event, setMobile2)}/>
                                    <span>-</span>
                                    <input type="number" autoComplete="one-time-code" className="" value={mobile3} onChange={() => changeFunction(event, setMobile3)}/>
                                    <span data-type="alert_span" data-val="user_mobile" className="" />
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호</th>
                                <td>
                                    <input type="password" autoComplete="one-time-code" className="" value={user_pw} onChange={() => changeFunction(event, setUserPw)}/>
                                    <span data-type="alert_span" data-val="user_pw" className="" />
                                </td>
                                <th>비밀번호확인</th>
                                <td>
                                    <input type="password" autoComplete="one-time-code" className="" value={user_pw2} onChange={() => changeFunction(event, setUserPw2)}/>
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
                                    <select className="" value={user_gender} onChange={() => changeFunction(event, setUserGender)}>
                                        <option value="M">남성</option>
                                        <option value="F">여성</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>

                <div className="">
                    <Link href={`/user/view/${user_seq}${queryStr}`} className="">취소</Link> 
                    <button className="" onClick={action}>수정</button>
                </div>
            </div>    
        )
    }
}
'use client';

import { changeFunction } from "@/util/function";
import { useEffect, useState } from "react";

export default function Page() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    // 등록
    async function put() {
        try {
            // 변수
            const data = {id, pw};

        } catch (error) {
            // 에러처리
        }
    }

    // 첫 실행시
    useEffect(() => {
        alert('test')
    }, []);

    // 아이디 변경
    useEffect(() => {
        if (id && id.length > 5) {
            alert("아이디 김")
            setId(id.substring(0, 5));
        }
    }, [id]);

    return (
        <>
            아이디: <input type="text" value={id} onChange={() => changeFunction(event, setId)}/>
            <br />

            비밀번호<br /> 
            <input type="text" value={pw} onChange={() => changeFunction(event, setPw)}/>

            <br />
            <button type="button" onClick={() => put()}>등록</button>
        </>
    )
}
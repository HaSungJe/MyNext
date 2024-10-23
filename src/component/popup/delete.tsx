'use client';
import { getAccessToken } from '@/api/auth';
import { ReactElement, useState } from "react";
import axios from 'axios';
import { axiosErrorHandle } from '@/util/util';
import { axiosDelete } from '@/util/axios';
import { useRouter } from 'next/navigation';

let keys: any = [];
type DeletePopupProps = {
    title: string;
    apiUrl: string;
    searchFunction: Function;
    router: ReturnType<typeof useRouter>;
}

/**
 * 삭제 버튼 클릭
 * 
 * @param key 
 */
export function deleteData(key: any): void {
    const list = [];
    if (key) {
        list.push(key);
    } else {
        const checkboxs = document.querySelectorAll('input[data-type=checkbox]');
        for (let i=0; i<checkboxs.length; i++) {
            const checkbox: any = checkboxs[i];
            if (checkbox.dataset.value && checkbox.checked) {
                list.push(checkbox.dataset.value);
            }
        }
    }

    if (list.length > 0) {
        keys = list;
        toggleDeletePopup();
    } else {
        alert('대상을 선택해주세요.');
    }
}

/**
 * 삭제팝업
 * 
 * @param param0 
 * @returns 
 */
export function DeletePopup( {title, apiUrl, searchFunction, router}: DeletePopupProps ): ReactElement {
    const [password, setPassword] = useState('');
    function onChangePassword(event: any) {
        setPassword(event.target.value);
    }

    // 삭제버튼
    async function deleteAction(): Promise<void> {
        if (keys.length <= 0) {
            alert('대상을 선택해주세요.');
            setPassword('');
            toggleDeletePopup();
        } else if (!password) {
            alert('비밀번호를 입력해주세요.')
        } else if (keys.length > 1) {
            try {
                for (let i=0; i<keys.length; i++) {
                    await axiosDelete(router, `${apiUrl}/${keys[i]}`, {user_pw: password});
                }
            } catch (error) {
                await axiosErrorHandle(error, router);
            }

            toggleDeletePopup();
            setPassword('');
            searchFunction('1');
        } else {
            try {
                await axiosDelete(router, `${apiUrl}/${keys[0]}`, {user_pw: password});
            } catch (error: any) {
                await axiosErrorHandle(error, router);
            }

            setPassword('');
            searchFunction('1');
            toggleDeletePopup();
        }
    }

    return (
        <div id="st_delete" className="layer_overlay close">
            <div className="delete_wrap">
                <p className="tit">{title}</p>
                <div className="area">
                    <dl>
                        <dt>비밀번호를 입력하여 주십시오.</dt>
                        <dd>
                            <form>
                                <input type="password" autoComplete="one-time-code" id="popup_password" className="text" size={50} value={password} onChange={onChangePassword} placeholder="비밀번호 입력" style={{zIndex: 9999, position: 'relative'}} />
                            </form>
                        </dd>
                    </dl>
                    <p className="btn_area">
                        <button className="n-btn btn-red" onClick={deleteAction} style={{zIndex: 9999}}>삭제</button>
                        <button className="n-btn x-cancel" onClick={toggleDeletePopup} style={{zIndex: 9999}}>취소</button>
                    </p>
                </div>
                <button type="button" className="btn_close" onClick={toggleDeletePopup} style={{zIndex: 9999}}><span className="blind">닫기</span></button>
            </div>
            <div className="mask"></div>
        </div>
    )
}

/**
 * 팝업 열기/닫기
 */
function toggleDeletePopup(): void {
    const popupElement = document.querySelector('div[id=st_delete]');
    if (popupElement) {
        const toggle = document.querySelector('div[id="st_delete"]').classList.contains('close');
        if (toggle) {
            document.querySelector('div[id="st_delete"]').classList.remove('close');
            document.querySelector('html').classList.add('overflow');
            document.querySelector('div[id="wrap"]').classList.add('blur');
        } else {
            document.querySelector('div[id="st_delete"]').classList.add('close');
            document.querySelector('html').classList.remove('overflow');
            document.querySelector('div[id="wrap"]').classList.remove('blur');
        }
    }
}
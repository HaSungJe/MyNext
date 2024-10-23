'use client';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { useEffect } from 'react';

type MenuBarProps = {
    info: any
}

export default function MenuBar( {info}: MenuBarProps ) {
    const pathname = usePathname();
    useEffect(() => {
        const menu1 = document.querySelectorAll('li[data-type=MENU]');
        const menu2 = document.querySelectorAll('li[data-type=SUB_MENU]');
        for (let i=0; i<menu1.length; i++) {
            menu1[i].classList.remove('on');
        }

        for (let i=0; i<menu2.length; i++) {
            menu2[i].classList.remove('on');
        }

        if (pathname.indexOf('/dashboard') !== -1) {
            document.querySelector('li[data-type=MENU][data-value=DASHBOARD]')?.classList.add('on');
        } else if (pathname.indexOf('/user') !== -1) {
            document.querySelector('li[data-type=MENU][data-value=USER]')?.classList.add('on');
        }
    }, [pathname]);

    return (
        <div id="aside">
            <div id="gnb">
                <ul>
                    <li className="bg" data-type="MENU" data-value="DASHBOARD"><Link href="/dashboard">대시보드</Link></li>
                    
                    <li className="bg" data-type="MENU" data-value="USER"><Link href="/user/list">회원관리</Link>
                        <ul>
                            <li data-type="SUB_MENU" data-value="USER_LIST"><Link href="/user/list">회원목록</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}
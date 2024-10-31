'use client';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { useEffect } from 'react';
import { Home, People } from '@mui/icons-material';
import Image from 'next/image';

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
        <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
            <div className="relative border-b border-white/20">
                <a className="flex items-center gap-4 py-6 px-8" href="#/">
                    <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">My Next</h6>
                </a>
                <button className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden" type="button">
                    <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 text-white">
                            <Home />
                        </svg>
                    </span>
                </button>
            </div>
            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1">
                    <li>
                        <a aria-current="page" className="active" href="#">
                            <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize" type="button">
                                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                                </svg>
                                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">대시보드</p>
                            </button>
                        </a>
                    </li>
                    <li>
                        <a className="" href="#">
                            <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                    <People />
                                </svg>
                                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">회원관리</p>
                            </button>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    )


    return (
        <div id="aside">
            <div id="gnb">
                <ul>
                    <li className="" data-type="MENU" data-value="DASHBOARD"><Link href="/dashboard">대시보드</Link></li>
                    
                    <li className="" data-type="MENU" data-value="USER"><Link href="/user/list">회원관리</Link>
                        <ul>
                            <li data-type="SUB_MENU" data-value="USER_LIST"><Link href="/user/list">회원목록</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}
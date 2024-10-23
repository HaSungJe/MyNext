'use client'
import React, {useEffect, useState} from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { List } from './component';
import { axiosErrorHandle, createQueryString } from '@util/util';
import { CountInfo, PageNation } from '@/component/pagenation';
import { selectboxAllCheck, changeFunction } from '@util/function';
import { DeletePopup, deleteData } from '@component/popup/delete';
import Loading from "@/component/loading";
import { axiosExcelDown, axiosGet } from '@/util/axios';

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [pageInfo, setPageInfo] = useState({});
    const [userList, setUserList] = useState([]);
    const [queryStr, setQueryStr] = useState('');
    const [page, setPage] = useState(searchParams.get('page') || '1');
    const [size, setSize] = useState(searchParams.get('size') || '20');
    const [search_type, setSearchType] = useState(searchParams.get('page') || 'ALL');
    const [search_val, setSearchVal] = useState(searchParams.get('search_val') || '');
    const [sort_type, setSortType] = useState(searchParams.get('sort_type') || 'NEW');

    // 페이지 정보 변경시, 검색정보 변경
    useEffect(() => {
        setQueryStr(createQueryString({page, size, search_type, search_val, sort_type }));
    }, [page]);

    // 검색 개수 및 정렬값 변경시, 검색정보 변경
    useEffect(() => {
        setQueryStr(createQueryString({page: 1, size, search_type, search_val, sort_type }));
    }, [size, sort_type]);

    // 검색버튼 클릭
    function action() {
        setQueryStr(createQueryString({page: 1, size, search_type, search_val, sort_type }));
    }

    // 검색정보 변경시, 데이터 새로고침
    useEffect(() => {
        search();
    }, [queryStr]);
    
    // 지역정보, 병원정보
    useEffect(() => {
        const setData = async () => {
            try {

            } catch (error: any) {
                console.log(error)
            }
        }

        setData();
    }, []);

    // 엑셀 다운로드
    async function excel(): Promise<void> {
        await axiosExcelDown(router, `회원 목록`, `${process.env.NEXT_PUBLIC_API_URL}/api/admin/excel/download/user/list${queryStr}`);
    }

    // 등록페이지
    function put(): void {
        router.push(`/user/put${queryStr}`);
    }

    // 검색
    function search(): void {
        const fetch = async () => {
            try {
                // 목록, 페이지
                const response = await axiosGet(router, `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/list${queryStr}`);
                setUserList(response.data.list);
                response.data.pageInfo.original_total_count = response.data.totalCount;
                setPageInfo(response.data.pageInfo);
                setLoading(false);
            } catch (error: any) {
                await axiosErrorHandle(error, router);
            }
        }
        
        fetch();
    }

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <div id="container">
                <div id="contents">
                    <div className="inner">
                        <h2>회원관리</h2>
                        <div className="col-box">
                            <div className="card mb20">
                                <div className="search-box search-boxtop">
                                    <p>
                                        <label htmlFor="search_type">기본검색</label>
                                        <select id="search_type" className="select small ml10" value={search_type} onChange={() => changeFunction(event, setSearchType)} >
                                            <option value="ALL">전체</option>
                                            <option value="EMAIL">이메일</option>
                                            <option value="NAME" >이름</option>
                                            <option value="NICKNAME" >대화명</option>
                                        </select>
                                        
                                        <label htmlFor="search_val" className="ml30">검색어 입력</label>
                                        <input id="search_val" autoComplete="one-time-code" type="text" className="text" size={50} placeholder="검색어를 입력하세요." value={search_val} onChange={() => changeFunction(event, setSearchVal)}/>
                                        
                                        <button type="button" className="n-btn btn-blue ml10" onClick={() => action()}>검색</button>
                                    </p>
                                    <p>
                                        <select className="select small" value={size} onChange={() => changeFunction(event, setSize)}>
                                            <option value="20">20개 보기</option>
                                            <option value="50">50개 보기</option>
                                            <option value="100">100개 보기</option>
                                        </select>
                                        <select className="select small" value={sort_type} onChange={() => changeFunction(event, setSortType)}>
                                            <option value="NEW">등록일순</option>
                                            <option value="EMAIL">이메일순</option>
                                            <option value="NICKNAME">대화명순</option>
                                        </select>
                                    </p>
                                </div> 
                            </div>
    
                            <div className="card">
                                <div className="board_h">
                                    <p className="al_l">
                                        <CountInfo pageInfo={pageInfo}/>
                                    </p>
                                    <p className="al_r">
                                        <button type="button" className="n-btn btn-excel-down" onClick={excel}>엑셀 다운로드</button>
                                        <button className="n-btn x-regi" onClick={put}>등록</button>
                                    </p>
                                </div>
    
                                <table className="board_list">
                                    <colgroup>
                                        <col style={{width: '70px'}}/>
                                        <col style={{width: '70px'}}/>
                                        <col style={{width: '100px'}}/>
                                        <col style={{width: 'auto'}}/>
                                        <col style={{width: '300px'}} />
                                        <col style={{width: '120px'}} />
                                        <col style={{width: '70px'}} />
                                        <col style={{width: '70px'}} />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col">
                                                <span className="input">
                                                    <input id="all_select" type="checkbox" className="checkbox" data-type="checkbox" onChange={selectboxAllCheck}/>
                                                    <label htmlFor="all_select">
                                                        <span className="blind">선택</span>
                                                    </label>
                                                </span>
                                            </th>
                                            <th scope="col">번호</th>
                                            <th scope="col">가입유형</th>
                                            <th scope="col">이메일</th>
                                            <th scope="col">대화명</th>
                                            <th scope="col">가입일</th>
                                            <th scope="col">수정</th>
                                            <th scope="col">삭제</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <List list={userList} pageInfo={pageInfo} queryStr={queryStr} deleteFunction={deleteData}/>
                                    </tbody>
                                </table>
                                <div className="board_f">
                                    <p className="btn-a-left">
                                        {
                                            userList && userList.length > 0 ?
                                            <button type="button" className="n-btn btn-delete" onClick={() => deleteData(null)}>선택삭제</button> 
                                            :
                                            ''
                                        }
                                    </p>
    
                                    <PageNation pageInfo={pageInfo} pageFunc={setPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <DeletePopup title={'회원정보 삭제'} apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/admin/user`} searchFunction={search} router={router}/>
            </div>
        )
    }
}
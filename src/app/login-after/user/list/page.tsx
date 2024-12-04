'use client'
import React, {useEffect, useState} from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { List } from './component';
import { createQueryString } from '@util/util';
import { axiosErrorHandle } from '@/util/axiosError';
import { CountInfo, PageNation } from '@/component/custom/pagenation';
import { selectboxAllCheck, changeFunction } from '@util/function';
import { axiosExcelDown, axiosGet } from '@/util/axios';
import { deleteData } from '@/component/custom/popup/delete';
import Loading from '@/component/common/loading';

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(true);
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
    
    // 엑셀 다운로드
    async function excel(): Promise<void> {
        // await axiosExcelDown(router, `회원 목록`, `${process.env.NEXT_PUBLIC_API_URL}/api/admin/excel/download/user/list${queryStr}`);
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
                setSearching(true);
                // const response = await axiosGet(router, `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/list${queryStr}`);
                // setUserList(response.data.list);
                // response.data.pageInfo.original_total_count = response.data.totalCount;
                // setPageInfo(response.data.pageInfo);

                const response = {
                    statusCode: 200,
                    pageInfo: {
                        totalCount: 6938,
                        page: 1,
                        maxPage: 347,
                        pageRange: {
                            start: 1,
                            end: 10
                        },
                    }
                }

                const list = [];
                for (let i=0; i<20; i++) {
                    list.push(
                        {
                            "user_seq": 7147,
                            "level_code": "COLORLESS",
                            "level_name": "ColorLess",
                            "user_email": "NAVER20241104142442",
                            "auth_code": "USER",
                            "auth_name": "일반",
                            "provider_name": "네이버",
                            "user_nickname": null,
                            "user_mobile": null,
                            "user_birth": null,
                            "age": null,
                            "hos_name": null,
                            "region": "인천광역시 연수구",
                            "child_birth": null,
                            "date_of_due": null,
                            "child_name": null,
                            "reg_dt": "2024-11-04 14:24"
                        },
                    )
                }
                setUserList(list);
                setPageInfo(response.pageInfo);


                setLoading(false);
                setSearching(false);
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
            <div>
                <List searching={searching} list={userList} pageInfo={pageInfo} queryStr={queryStr} deleteFunction={deleteData}/>
                <PageNation pageInfo={pageInfo} pageFunc={setPage} />
                <button type="button" className="" onClick={() => deleteData(null)}>선택삭제</button> 
            </div>
        )
    }
}
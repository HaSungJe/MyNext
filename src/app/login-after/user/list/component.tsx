'use client'
import Link from "next/link";

type ListProps = {
    list: Array<any>;
    pageInfo: any;
    queryStr: string;
    deleteFunction: Function
};

/**
 * 회원 목록
 * 
 * @param param0 
 * @returns 
 */
export function List({list, pageInfo, queryStr, deleteFunction}: ListProps) {
    if (list && list.length > 0) {
        const number = pageInfo.content_start_number;
        return list.map((data: any, index: number) => {
            const user_email = data['user_email'] && data['user_email'].length > 15 ? `${data['user_email'].substring(0, 15)}...` : data['user_email'];
            const user_nickname = data['user_nickname'] && data['user_nickname'].length > 15 ? `${data['user_nickname'].substring(0, 15)}...` : data['user_nickname'];

            return (
                <tr key={`list_${index}`}>
                    <td>
                        <span className="input">
                            <input id={`select_${data.user_seq}`} type="checkbox" className="checkbox" data-type="checkbox" data-value={data.user_seq}/>
                            <label htmlFor={`select_${data.user_seq}`}>
                                <span className="blind">선택</span>
                            </label>
                        </span>
                    </td>
                    <td>{number-index}</td>
                    <td>{data.provider_name}</td>
                    <td style={{textAlign: 'left'}}><Link href={`/user/view/${data.user_seq}${queryStr}`}>{user_email}</Link></td>
                    <td style={{textAlign: 'left'}}><Link href={`/user/view/${data.user_seq}${queryStr}`}>{user_nickname}</Link></td>
                    <td>{data.reg_dt}</td>
                    <td><Link href={`/user/modify/${data.user_seq}${queryStr}`} className="s-modify"><span>수정</span></Link></td>
                    <td><button type="button" className="s-delete" onClick={() => deleteFunction(data.user_seq)}/></td>
                </tr>
            )
        });
    } else {
        return (
            <tr>
                <td colSpan={8}>검색 결과가 없습니다.</td> 
            </tr>
        )
    }
}
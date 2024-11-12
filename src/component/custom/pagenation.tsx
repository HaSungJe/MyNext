type PageNationProps = {
    pageInfo: any;
    pageFunc: Function
}

type CountInfoProps = {
    pageInfo: any;
}

/**
 * 페이지
 * 
 * @param param0 
 * @returns 
 */
export function PageNation( {pageInfo, pageFunc}: PageNationProps ) {
    if (pageInfo && pageInfo.totalCount) {
        const before_page = pageInfo.page > 1 ? pageInfo.page - 1 : pageInfo.page;
        const after_page = pageInfo.page < pageInfo.maxPage ? pageInfo.page + 1 : pageInfo.page;
    
        return (
            <>
                <div className="">
                    <button key={`page_first`} type="button" className="" onClick={() => movePage(1, pageFunc)}>처음페이지로</button>
                    <button key={`page_prev`} type="button" className="" onClick={() => movePage(before_page, pageFunc)}>이전페이지로</button>
                    <PageItem pageInfo={pageInfo} pageFunc={pageFunc}/>
                    <button key={`page_next`} type="button" className="" onClick={() => movePage(after_page, pageFunc)}>다음페이지로</button>
                    <button key={`page_last`} type="button" className="" onClick={() => movePage(pageInfo.maxPage, pageFunc)}>마지막페이지로</button>
                </div>
            </>
        );
    } else {
        return (
            <>
            </>
        )
    }
}

/**
 * 페이지 요소
 * 
 * @param param0 
 * @returns 
 */
function PageItem( {pageInfo, pageFunc}: PageNationProps ) {
    if (pageInfo && pageInfo.totalCount) {
        const pageList = [];
        for (let i = pageInfo.pageRange.start; i <= pageInfo.pageRange.end; i++) {
            pageList.push(i);
        }
    
        return (
            <>
                {
                    pageList.map((page) => {
                        if (page === pageInfo.page) {
                            return (
                                <span key={page} className="btn active">{page}</span>
                            );
                        } else {
                            return (
                                <button key={page} className="btn" onClick={() => movePage(page, pageFunc)}>{page}</button>
                            );
                        }
                    })
                }
            </>
        );
    } else {
        return (
            <>
            </>
        )
    }
}

/**
 * 페이지 이동
 * 
 * @param {*} page 
 * @param {*} pageFunc 
*/
function movePage(page: number, pageFunc: Function) {
    pageFunc(page.toString());
}

/**
 * 목록 개수 정보
 * 
 * @param param0 
 * @returns 
 */
export function CountInfo( {pageInfo}: CountInfoProps ) {
    return (
        <span className="total">전체 : {pageInfo.original_total_count} / 검색 : {pageInfo.totalCount}</span>
    )
}
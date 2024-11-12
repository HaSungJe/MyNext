import mysql2 from '@/database/mysql2';
import { PoolConnection } from 'mysql2/promise';

/**
    -- 현재 접속 수
    SHOW STATUS LIKE 'Threads_connected';

    -- 최대 접속 수
    SHOW VARIABLES LIKE '%max_connection%';
*/

/**
 * DB 데이터베이스 스키마명
 */
export const table_schema = process.env.MYSQL_DATABASE;

/**
 * Select
 * 
 * @param sql 
 * @param params 
 * @returns 
 */
export async function select(sql: string, params: Array<string | number> = null) {
    let conn = null;

    if ((params !== null && params !== undefined) && (params.length !== sql.split('?').length - 1)) {
        console.log("Query Binding Length Error !");
        return [];
    }

    try {    
        conn = await mysql2.getConnection();

        // params가 null일 경우
        if (params !== null && params !== undefined && params.length > 0) {
            let query = await execute(conn, sql, params);
            return query.result;
        } else {
            let query = await execute(conn, sql);
            return query.result;
        }
    } catch (error) {
        return await errorMessageFilter(error);
    } finally {
        if (null !== conn) {
            conn.release();
        }
    }
}

/**
 * SelectOne
 * 
 * @param sql 
 * @param params 
 * @returns 
 */
export async function selectOne(sql: string, params: Array<string | number> = null) {
    let rt = null;
    let conn = null;

    if ((params !== null && params !== undefined) && (params.length !== sql.split('?').length - 1)) {
        console.log("Query Binding Length Error !");
        return null;
    }

    try {    
        conn = await mysql2.getConnection();

        // params가 null일 경우
        if (params !== null && params !== undefined && params.length > 0) {
            let query: any = await execute(conn, sql, params);
            return query.result[0] ? query.result[0] : null;
        } else {
            let query: any = await execute(conn, sql);
            return query.result[0] ? query.result[0] : null;
        }
    } catch (error) {
        return await errorMessageFilter(error);
    } finally {
        if (null !== conn) {
            conn.release();
        }
    }
}

/**
 * insert, update, delete
 * Parameter Binding
 * 트렌젝션 사용을 위해 커넥션은 호출하는 곳에서 생성한 후 받아 사용한다.
 * 
 * @param conn 
 * @param sql 
 * @param params 
 * @returns 
 */
export async function execute(conn: PoolConnection, sql: string, params: Array<string | number> = null) {
    let rt = null;

    if ((params !== null && params !== undefined ) && (params.length !== sql.split('?').length - 1)) {
        conn.rollback();
        console.log("Query Binding Length Error !");
        return {
            success: false,
            err: 'Query Binding Length Error !'
        };
    }

    try {    
        // params가 null일 경우
        if (params !== null && params !== undefined && params.length > 0) {
            const [ result ] = await conn.query(sql, params);
            rt = result;
        } else {
            const [ result ] = await conn.query(sql);
            rt = result;
        }

        rt = {
            success: true,
            result: rt
        }
    } catch (error: any) {
        conn.rollback();
        rt = {
            success: false,
            errno: error.errno,
            error: await errorMessageFilter(error)
        }
    }

    return rt;
}

/**
 * 에러메시지 필터
 * 
 * @param err 
 * @returns 
 */
export async function errorMessageFilter(error: any) {
    let msg = error.toString();

    if (error.errno === 1062) { // 값이 중복될 경우
        let index1 = msg.indexOf("entry") + 7;
        let index2 = msg.indexOf("for") - 2;
        msg = `${msg.substring(index1, index2)}(은)는 이미 등록되어 있는 값입니다.`;
    } else if (error.errno === 1406) { // 데이터 길이가 긴 경우
        let index1 = msg.indexOf("column") + 8;
        let index2 = msg.indexOf("at row") - 2;
        msg = `${await getColumnMemo(msg.substring(index1, index2))}의 길이가 너무 깁니다.`
    } else if (error.errno === 1452) { // 올바르지 않은 외래키 입력
        let index1 = msg.indexOf("FOREIGN KEY") + 14;
        let index2 = msg.indexOf("REFERENCES") - 3  ;
        msg = `${await getColumnMemo(msg.substring(index1, index2))}의 값이 올바르지 않습니다.`;
    } else {
        msg = `${error.code}(${error.errno})`;
    }

    return msg;
}

/**
 * 컬럼 메모 얻기
 * 
 * @param column 
 * @returns 
 */
export async function getColumnMemo(column: string) {
    const sql = `
        select
            case
                when count(*) > 0 then a.memo
                else ?
                end as memo
        from (
                select 
                    column_comment as memo
                from 
                    INFORMATION_SCHEMA.COLUMNS
                where 
                    COLUMN_NAME = ?
                    and TABLE_SCHEMA = ?
                    and column_comment is not null
                    and column_comment != ''
                    limit 0, 1
        ) a
    `;
    return (await selectOne(sql, [column, column, table_schema]))['memo'];
}

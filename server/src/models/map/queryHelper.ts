import db from '../../config/db.js';
import type { ResultSetHeader } from 'mysql2';

export async function queryRows<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const [rows] = await db.query(sql, params);
    return rows as T[];
}

export async function queryExec(sql: string, params?: any[]): Promise<ResultSetHeader> {
    const [result] = await db.query(sql, params);
    return result as ResultSetHeader;
}

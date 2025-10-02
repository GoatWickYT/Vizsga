import db from '../../config/db.js';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function queryRows<T = RowDataPacket>(sql: string, params?: unknown[]): Promise<T[]> {
    const [rows] = await db.query(sql, params);
    return rows as T[];
}

export async function queryExec(sql: string, params?: unknown[]): Promise<ResultSetHeader> {
    const [result] = await db.query(sql, params);
    return result as ResultSetHeader;
}

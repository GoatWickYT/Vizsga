import db from '../../config/db.js';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

function toCamelCase<T extends Record<string, unknown>>(row: T): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(row)) {
        const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
        result[camelKey] = value;
    }
    return result;
}

export async function queryRows<T = RowDataPacket>(sql: string, params?: unknown[]): Promise<T[]> {
    const [rows] = await db.query<RowDataPacket[]>(sql, params);
    return rows.map((r) => toCamelCase(r) as T);
}

export async function queryExec(sql: string, params?: unknown[]): Promise<ResultSetHeader> {
    const [result] = await db.query<ResultSetHeader>(sql, params);
    return result;
}

import { queryExec, queryRows } from './util/queryHelper.js';

export interface RefreshToken {
    id?: number;
    userId?: number;
    token: string;
    device: string;
    revoked: boolean;
    expiry: Date;
    created: Date;
}
export const getAllTokens = async () => {
    return await queryRows<RefreshToken>('SELECT * FROM refresh_tokens');
};

export const getAllDevicesRefreshTokens = async (userId: number): Promise<string[]> => {
    return await queryRows<string>('SELECT device FROM refresh_tokens WHERE user_id = ?;', [
        userId,
    ]);
};

export const getRefreshTokenByToken = async (token: string): Promise<RefreshToken | null> => {
    const rows = await queryRows<RefreshToken>(
        'SELECT * FROM refresh_tokens WHERE token = ? AND revoked = FALSE AND expiry > NOW();',
        [token],
    );
    return rows[0] || null;
};

export const createRefreshToken = async (refreshToken: RefreshToken): Promise<number> => {
    const result = await queryExec(
        'INSERT INTO refresh_tokens (user_id, token, device, expiry) VALUES (?, ?, ?, ?);',
        [refreshToken.userId, refreshToken.token, refreshToken.device, refreshToken.expiry],
    );
    return result.insertId;
};

export const revokeRefreshToken = async (id: number): Promise<boolean> => {
    const result = await queryExec('UPDATE refresh_tokens SET revoked = TRUE WHERE id = ?;', [id]);
    return result.affectedRows > 0;
};

export const revokeDeviceRefreshToken = async (device: string): Promise<boolean> => {
    const result = await queryExec('UPDATE refresh_tokens SET revoked = TRUE WHERE device = ?;', [
        device,
    ]);
    return result.affectedRows > 0;
};

export const revokeAllTokensForUser = async (userId: number): Promise<number> => {
    const result = await queryExec('UPDATE refresh_tokens SET revoked = TRUE WHERE user_id = ?;', [
        userId,
    ]);
    return result.affectedRows;
};

export const cleanRefreshToken = async (): Promise<number> => {
    const result = await queryExec(
        'DELETE FROM refresh_tokens WHERE revoked = TRUE OR expiry < NOW();',
    );
    return result.affectedRows;
};

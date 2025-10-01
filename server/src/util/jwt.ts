import jwt from 'jsonwebtoken';
import { Roles } from '../types/roles.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = '1h';

interface JwtPayload {
    id: number;
    userName: string;
    role: Roles;
}

/**
 * Sign a JWT token from user info
 */
export const signJwt = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verify a JWT and return payload if valid
 */
export const verifyJwt = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (err) {
        return null;
    }
};

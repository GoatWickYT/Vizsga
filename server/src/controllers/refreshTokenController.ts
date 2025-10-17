import { Request, Response, NextFunction } from 'express';
import * as RefreshTokenService from '../models/refreshTokenModel.js';
import { compare, hash } from '../util/hash.js';

RefreshTokenService.getAllDevicesRefreshTokens;
RefreshTokenService.getRefreshTokenByToken;
RefreshTokenService.revokeAllTokensForUser;
RefreshTokenService.revokeRefreshToken;

export const cleanRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: number = await RefreshTokenService.cleanRefreshToken();
        res.status(200).json({ message: `Deleted ${result} rows` });
    } catch (err) {
        next(err);
    }
};

export const createRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken: RefreshTokenService.RefreshToken = req.body;
        const hashedToken: string = await hash(refreshToken.token);
        refreshToken.token = hashedToken;
        const result: number = await RefreshTokenService.createRefreshToken(refreshToken);
        res.status(201).json({ message: `Created new token with id: ${result}` });
    } catch (err) {
        next(err);
    }
};

export const getAllDevicesRefreshTokens = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userId: number = Number(req.params.userId);
        const result: string[] = await RefreshTokenService.getAllDevicesRefreshTokens(userId);
        res.status(200).json({ result });
    } catch (err) {
        next(err);
    }
};

export const getRefreshTokenByToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken: RefreshTokenService.RefreshToken = req.body;
        const tokens = await RefreshTokenService.getAllTokens();

        const result = tokens.find((rt) => compare(refreshToken.token, rt.token));
        if (!result) return res.status(404).json({ message: 'Token not found or expired' });
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export const revokeAllTokensForUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: number = req.body;
        const revokedCount: number = await RefreshTokenService.revokeAllTokensForUser(userId);
        res.status(200).json({ message: `Revoked ${revokedCount} token(s)` });
    } catch (err) {
        next(err);
    }
};

export const revokeRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = req.body;
        const result = await RefreshTokenService.revokeRefreshToken(id);
        if (result) return res.status(200).json({ message: 'Token revoked successfully' });
        res.status(404).json({ message: 'Token not found' });
    } catch (err) {
        next(err);
    }
};

export const revokeDeviceRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const device: string = req.body;
        const result: boolean = await RefreshTokenService.revokeDeviceRefreshToken(device);
        if (result) return res.status(200).json({ message: 'Device signed out succesfully' });
        res.status(404).json({ message: "Couldn't sign out device" });
    } catch (err) {
        next(err);
    }
};

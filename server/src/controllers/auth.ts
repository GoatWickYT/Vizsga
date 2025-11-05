import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { Roles } from '../types/roles.js';
import { compare, hash } from '../util/hash.js';
import { signJwt } from '../util/jwt.js';
import {
    getAllPeople,
    getPersonById,
    Person,
    getPersonByEmail,
    getPersonByUsername,
    createPerson,
    updatePerson,
} from '../models/ticket/personModel.js';
import {
    getAllTokens,
    createRefreshToken,
    RefreshToken,
    revokeAllTokensForUser,
    getRefreshTokenForDevice,
} from '../models/refreshTokenModel.js';

interface SafeUser {
    id: number;
    name: string;
    role: Roles;
}

const toSafeUser = (person: Person): SafeUser => ({
    id: person.id!,
    name: person.name,
    role: person.role,
});

export const getPeople = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const people = await getAllPeople();
        res.status(200).json(people.forEach((x) => toSafeUser(x)));
    } catch (err) {
        next(err);
    }
};

export const getPerson = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const person = await getPersonById(id);
        if (person) {
            res.status(200).json(toSafeUser(person));
        } else {
            res.status(404).json({ error: 'Person not found' });
        }
    } catch (err) {
        next(err);
    }
};

export const getMe = (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const safeUser = {
        id: req.user.id,
        username: req.user.username,
        role: req.user.role,
    };

    res.status(200).json(safeUser);
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { oldPassword, newPassword, username } = req.body;
        if (!oldPassword || !newPassword || !username)
            return res.status(400).json({ error: 'Both passwords and username are required' });

        let user = await getPersonByUsername(username);
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const passwordMatch = await compare(oldPassword, user.password);
        if (!passwordMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const hashedPassword = await hash(newPassword);

        await updatePerson(user.id!, { password: hashedPassword });
        await revokeAllTokensForUser(user.id!);
        res.status(200).json({ message: 'Password changed successfully, all sessions revoked' });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { usernameOrEmail, password, keepLoggedIn, device } = req.body;

        if (!usernameOrEmail || !password) {
            return res.status(400).json({ error: 'Username/email and password are required' });
        }

        let user: Person | null = await getPersonByEmail(usernameOrEmail);
        if (!user) user = await getPersonByUsername(usernameOrEmail);
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = signJwt({
            id: user.id!,
            role: user.role as Roles,
            username: user.username,
        });

        const deviceName: string = device || 'Default Device';

        let refreshTokenPlain: string;
        const existing = await getRefreshTokenForDevice(user.id!, deviceName);

        if (existing) {
            refreshTokenPlain = existing.token;
        } else {
            refreshTokenPlain = crypto.randomBytes(32).toString('hex');
            const hashedRefreshToken = await hash(refreshTokenPlain);

            const expiry = keepLoggedIn
                ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
                : new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

            await createRefreshToken({
                userId: user.id!,
                token: hashedRefreshToken,
                device: deviceName,
                expiry,
                revoked: false,
                created: new Date(),
            });
        }

        res.status(200).json({
            token,
            refreshToken: refreshTokenPlain,
            user: {
                id: user.id!,
                username: user.username,
                role: user.role,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, name } = req.body;

        if (!username || !email || !password || !name) {
            return res
                .status(400)
                .json({ error: 'Username, email, password, and name are required' });
        }

        let user = await getPersonByEmail(email);
        if (user) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        user = await getPersonByUsername(username);
        if (user) {
            return res.status(409).json({ error: 'Username already taken' });
        }

        const hashedPassword = await hash(password);

        await createPerson({
            username: username,
            name,
            email,
            password: hashedPassword,
            role: Roles.User,
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        next(err);
    }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokens = await getAllTokens();
        const refreshToken: string = req.body.refreshToken;

        let tokenRecord: RefreshToken | undefined;

        for (const token of tokens) {
            if (await compare(refreshToken, token.token)) {
                tokenRecord = token;
                break;
            }
        }

        if (!tokenRecord) return res.status(401).json({ message: 'Unauthorized' });
        if (tokenRecord.revoked) return res.status(401).json({ message: 'Unauthorized' });
        const user = await getPersonById(Number(tokenRecord.userId));
        console.log(user);
        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        res.status(200).json({
            token: signJwt({
                id: user.id!,
                role: user.role as Roles,
                username: user.username,
            }),
        });
    } catch (err) {
        next(err);
    }
};

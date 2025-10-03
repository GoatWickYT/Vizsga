import { Request, Response, NextFunction } from 'express';
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
} from '../models/ticket/personModel.js';

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
            res.status(404).json({ message: 'Person not found' });
        }
    } catch (err) {
        next(err);
    }
};

export const getMe = (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    const safeUser = {
        id: req.user.id,
        username: req.user.username,
        role: req.user.role,
    };

    res.status(200).json(safeUser);
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { usernameOrEmail, password } = req.body;

        if (!usernameOrEmail || !password)
            return res.status(400).json({ message: 'Username/email and password are required' });
        let user = await getPersonByEmail(usernameOrEmail);
        if (!user) user = await getPersonByUsername(usernameOrEmail);
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = signJwt({
            id: user.id!,
            role: user.role as Roles,
            username: user.username,
        });

        res.status(200).json({
            token,
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
                .json({ message: 'Username, email, password, and name are required' });
        }

        let user = await getPersonByEmail(email);
        if (user) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        user = await getPersonByUsername(username);
        if (user) {
            return res.status(409).json({ message: 'Username already taken' });
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

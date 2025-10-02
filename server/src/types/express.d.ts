import { Role } from './roles';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                role: Role;
                username: string;
            };
            validId?: number;
        }
    }
}

export {};

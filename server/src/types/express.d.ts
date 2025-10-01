import { Role } from './roles';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                role: Role;
                userName: string;
            };
            validId?: number;
        }
    }
}

export {};

import { Request } from 'express';

export interface RequestWithId extends Request {
    validId: number;
}

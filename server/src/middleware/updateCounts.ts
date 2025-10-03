import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

export interface UpdateCounts {
    map: number;
    ticket: number;
    news: number;
}
const filePath = path.join(process.cwd(), 'updateCounts.json');
let updateCounts: UpdateCounts = { map: 0, ticket: 0, news: 0 };
let writeInProgress: boolean = false;
let pendingWrite: boolean = false;

const saveCounts = async () => {
    if (writeInProgress) {
        pendingWrite = true;
        return;
    }

    writeInProgress = true;
    try {
        await fs.promises.writeFile(filePath, JSON.stringify(updateCounts, null, 2), 'utf-8');
    } catch (err) {
        console.error('Failed to save update counts:', err);
    } finally {
        writeInProgress = false;
        if (pendingWrite) {
            pendingWrite = false;
            saveCounts();
        }
    }
};
const incrementUpdateCount = (category: keyof UpdateCounts) => {
    if (Object.prototype.hasOwnProperty.call(updateCounts, category)) {
        updateCounts[category]++;
        saveCounts();
    } else {
        console.warn(`Invalid update count category: ${category}`);
    }
};
const loadCounts = async () => {
    try {
        const data: string = await fs.promises.readFile(filePath, 'utf-8');
        const parsed: Partial<UpdateCounts> = JSON.parse(data) as Partial<UpdateCounts>;
        updateCounts = { ...updateCounts, ...parsed };
    } catch {
        throw new Error('No existing updateCounts file');
    }
};
loadCounts();
export const updateCount = (category: keyof UpdateCounts) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(req.method)) {
            incrementUpdateCount(category);
        }
        next();
    };
};
export const getUpdateCounts = (): UpdateCounts => {
    return { ...updateCounts };
};

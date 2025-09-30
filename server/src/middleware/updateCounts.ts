import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

export const updateCount = (category: 'map' | 'ticket' | 'news') => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Only count if modifying the data
        if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(req.method)) {
            incrementUpdateCount(category);
        }
        next();
    };
};

const filePath = path.join(process.cwd(), 'updateCounts.json');

export interface UpdateCounts {
    map: number;
    ticket: number;
    news: number;
}

let updateCounts: UpdateCounts = { map: 0, ticket: 0, news: 0 };

// Load counts from file on server start
try {
    const data = fs.readFileSync(filePath, 'utf-8');
    updateCounts = JSON.parse(data);
    console.log('Loaded update counts:', updateCounts);
} catch {
    console.log('No existing updateCounts file, starting fresh');
}

// Save counts to file (async to avoid blocking)
const saveCounts = () => {
    fs.writeFile(filePath, JSON.stringify(updateCounts, null, 2), (err) => {
        if (err) console.error('Failed to save update counts:', err);
    });
};

const incrementUpdateCount = (category: keyof UpdateCounts) => {
    if (updateCounts.hasOwnProperty(category)) {
        updateCounts[category]++;
        saveCounts();
    } else {
        console.warn(`Invalid update count category: ${category}`);
    }
};

export const getUpdateCounts = (): UpdateCounts => {
    return updateCounts;
};

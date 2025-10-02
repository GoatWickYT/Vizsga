import { Request, Response } from 'express';
import { UpdateCounts } from '../middleware/updateCounts.js';
import { getUpdateCounts } from '../middleware/updateCounts.js';

export const getAllUpdates = (req: Request, res: Response) => {
    const results = getUpdateCounts();
    res.status(200).json({ map: results.map, news: results.news, ticket: results.ticket });
};

export const getUpdateFor = (req: Request, res: Response) => {
    const updateCounts = getUpdateCounts();
    const type: keyof UpdateCounts = req.params.type as keyof UpdateCounts;
    if (type == 'map') return res.status(200).json({ map: updateCounts.map });
    else if (type == 'ticket') return res.status(200).json({ ticket: updateCounts.ticket });
    return res.status(200).json({ news: updateCounts.news });
};

import { Request, Response, NextFunction } from 'express';
import {
    getAllPeople,
    createPerson,
    getPersonById,
    updatePerson,
    deletePerson,
    Person,
} from '../../models/ticket/personModel.js';

export const getPeople = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const people = await getAllPeople();
        res.status(200).json(people);
    } catch (err) {
        next(err);
    }
};

export const addPeople = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const person: Person = req.body;
        await createPerson(person);
        res.status(201).json({ message: 'Person created' });
    } catch (err) {
        next(err);
    }
};

export const getPerson = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const person = await getPersonById(id);
        if (person) {
            res.status(200).json(person);
        } else {
            res.status(404).json({ message: 'Person not found' });
        }
    } catch (err) {
        next(err);
    }
};

export const updatePeople = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const person: Person = req.body;
        await updatePerson(id, person);
        res.status(200).json({ message: 'Person updated' });
    } catch (err) {
        next(err);
    }
};

export const deletePeople = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        await deletePerson(id);
        res.status(200).json({ message: 'Person deleted' });
    } catch (err) {
        next(err);
    }
};

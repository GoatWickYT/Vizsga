import { Request, Response, NextFunction } from 'express';
import * as personService from '../../models/ticket/personModel.js';

export const getPeople = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const people: personService.Person[] = await personService.getAllPeople();
        res.status(200).json(people);
    } catch (err) {
        next(err);
    }
};

export const getPerson = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const person: personService.Person | null = await personService.getPersonById(id);
        if (person) return res.status(200).json(person);
        res.status(404).json({ error: 'Person not found' });
    } catch (err) {
        next(err);
    }
};

export const getPersonWithName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name: string = req.params.name;
        const person: personService.Person | null = await personService.getPersonByUsername(name);
        if (person) return res.status(200).json(person);
        res.status(404).json({ error: 'Person not found' });
    } catch (err) {
        next(err);
    }
};

export const getPersonWithEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email: string = req.params.email;
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            return res.status(403).json({ error: 'Email not correct form' });
        const person: personService.Person | null = await personService.getPersonByEmail(email);
        if (!person) return res.status(404).json({ error: 'Person not found' });
        res.status(200).json(person);
    } catch (err) {
        next(err);
    }
};

export const addPeople = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const person: personService.Person = req.body;
        const insertId: number = await personService.createPerson(person);
        res.status(201).json({ message: 'Person created', id: insertId });
    } catch (err) {
        next(err);
    }
};

export const updatePeople = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const person: personService.Person = req.body;
        const updated: boolean = await personService.updatePerson(id, person);
        if (!updated) return res.status(404).json({ error: 'Person not found or not updated' });
        res.status(200).json({ message: 'Person updated' });
    } catch (err) {
        next(err);
    }
};

export const deletePeople = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = Number(req.params.id);
        const deleted: boolean = await personService.deletePerson(id);
        if (!deleted) return res.status(404).json({ error: 'Person not found or not deleted' });
        res.status(200).json({ message: 'Person deleted' });
    } catch (err) {
        next(err);
    }
};

/*

//////////////////////////////////

This file is for to connect controllers with models.
Import models used by controllers from ../model/*.js always has to end with .js

//////////////////////////////////



import { Request, Response } from 'express';
import { getAllUsers, createUser, User } from '../models/userModel.js';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const addUser = async (req: Request, res: Response) => {
    try {
        const user: User = req.body;
        await createUser(user);
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
*/
import { Request, Response } from 'express';
import {
    getAllPeople,
    createPerson,
    getPersonById,
    updatePerson,
    deletePerson,
    Person,
} from '../models/personModel.js';

export const getPeople = async (req: Request, res: Response) => {
    try {
        const people = await getAllPeople();
        res.json(people);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const addPeople = async (req: Request, res: Response) => {
    try {
        const person: Person = req.body;
        await createPerson(person);
        res.status(201).json({ message: 'Person created' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const getPerson = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const person = await getPersonById(id);
        if (person) {
            res.json(person);
        } else {
            res.status(404).json({ message: 'Person not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const updatePeople = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const person: Person = req.body;
        await updatePerson(id, person);
        res.json({ message: 'Person updated' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

export const deletePeople = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10); 
        await deletePerson(id);
        res.json({ message: 'Person deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

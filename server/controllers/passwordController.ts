import { Request, Response } from "express";
import PasswordService from '../services/passwordService';
import { IRequestAuth } from "../types";


export default {
    getAll: async (req: IRequestAuth, res: Response) => {  // GET ALL BY USER ID  - GET /api/groups
        try {
            if (req?.user?._id) {
                const passwords = await PasswordService.getAll(req?.user?._id);
                res.status(200).json(passwords);
            } else {
                res.status(401).json({ message: 'Unauthorized, no user to get all passwords.' });
            }

        } catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const password = await PasswordService.getOne(req.params.id);
            res.status(200).json(password);
        } catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    },
    createOne: async (req: IRequestAuth, res: Response) => {
        try {
            console.log(req.body)
            if (req?.user?._id) {
                const password = await PasswordService.createOne({ passwordData: req.body, userId: req.user._id });
                res.status(200).json(password);
            } else {
                res.status(401).json({ message: 'Unauthorized, no user to create password.' });
            }
        } catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    },
    updateOne: async (req: Request, res: Response) => {
        try {
            // const group = await GroupService.updateOne(req.body);
            // res.status(200).json(group);
        } catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    },
    deleteOne: async (req: Request, res: Response) => {
        try {
            console.log('deleteOne')
            console.log(req.params)
            await PasswordService.deleteOne(req.params.id);
            res.status(200).json({ message: 'Password deleted.' });
        } catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    },
}
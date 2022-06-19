import { Request, Response } from "express";
import GroupService from '../services/groupService';
import { IRequestAuth } from "../interfaces";


export default {
    getAll: async (req: IRequestAuth, res: Response) => {  // GET ALL BY USER ID  - GET /api/groups
        try {
            if (req?.user?._id) {
                const groups = await GroupService.getAll(req?.user?._id);
                res.status(200).json(groups);
            } else {
                res.status(401).json({ message: 'Unauthorized, no user to create group.' });
            }

        } catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const group = await GroupService.getOne(req.params.id);
            res.status(200).json(group);
        } catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    },
    createOne: async (req: IRequestAuth, res: Response) => {
        try {
            if (req?.user?._id) {
                const group = await GroupService.createOne({ title: req.body.title, userId: req.user._id });
                res.status(200).json(group);
            } else {
                res.status(401).json({ message: 'Unauthorized, no user to create group.' });
            }
        } catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    },
    updateOne: async (req: Request, res: Response) => {
        try {
            const group = await GroupService.updateOne(req.body);
            res.status(200).json(group);
        } catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    },
    deleteOne: async (req: Request, res: Response) => {
        try {
            await GroupService.deleteOne(req.params.id);
            res.status(200);
        } catch (err) {
            res.status(500).json({ message: `${err}` });
        }
    },
}
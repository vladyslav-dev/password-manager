import { IGroup } from './../types/index';
import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add title"]
    }
}, {collection: 'group'});

export default mongoose.model<IGroup>('group', groupSchema)
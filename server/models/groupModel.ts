import { IGroup } from '../interfaces/index';
import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add title"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
}, {collection: 'group'});

export default mongoose.model<IGroup>('group', groupSchema)
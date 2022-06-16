import { IPassword } from './../types/index';
import mongoose from 'mongoose'

const passwordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
     },
    service: {
        type: String,
        required: [true, "Please add your service name"]
    },
    username: {
        type: String,
        required: [true, "Please add your username"]
    },
    password: {
        type: String,
        required: [true, "Please add your password"]
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
     }
}, {collection: 'password'});

export default mongoose.model<IPassword>('password', passwordSchema)
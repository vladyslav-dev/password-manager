import mongoose from 'mongoose'
import { IUser } from '../types';

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: [true, "Please add your login"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add your password"]
    },
    password_storage: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'password'
    }]
}, {collection: 'user'});

export default mongoose.model<IUser>('user', userSchema)
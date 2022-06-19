import { IToken } from '../interfaces/index';
import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    refresh_token: {
        type: String,
        required: true
    }
}, {collection: 'token'});

export default mongoose.model<IToken>('token', tokenSchema);
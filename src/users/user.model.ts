import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    seller: { type: Boolean, default: false },
    address: {
        addr1: String,
        addr2: String,
        city: String,
        state: String,
        country: String,
        zip: Number
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export interface Address {
    addr1: string;
    addr2: string;
    city: string;
    state: string;
    country: string;
    zip: number;
}

export interface User extends mongoose.Document {
    username: string;
    readonly password: string;
    seller: boolean;
    address: Address;
    created: Date;
}

UserSchema.pre('save', async function(next: mongoose.HookDoneFunction) {
    try {
        if(!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
})
import * as mongoose from 'mongoose';

export const ImageListSchema = new mongoose.Schema({
    url: { type: String, required: true },
    description: { type: String, required: false }
});

export const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    images: { type: [ImageListSchema], required: true},
    code: { type: String, required: true}
});

export interface ImageList extends mongoose.Document {
    url: string;
    description: string;
}

export interface Product extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    price: number;
    images: ImageList[];
    code: string;
}
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Product, ImageList } from "./product.model";

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async insertProduct(title: string, description: string, price: number, images: ImageList[], code: string) {
        const newProduct = new this.productModel({
            title,
            description,
            price,
            images,
            code
        });
        const result = await newProduct.save();
        return result;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map( product => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            images: product.images,
            code: product.code
        }));
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            images: product.images,
            code: product.code
        };
    }

    async updateProduct (productId: string, title: string, description: string, price: number, images: ImageList[], code: string) {
        const updatedProduct = await this.findProduct(productId);
        if (title) {
            updatedProduct.title = title;
        }
        if (description) {
            updatedProduct.description = description;
        }
        if (price) {
            updatedProduct.price = price;
        }
        if (images) {
            updatedProduct.images = images;
        }
        if (code) {
            updatedProduct.code = code;
        }
        updatedProduct.save();
        return updatedProduct;
    }

    async deleteProduct(productId: string) {
        this.productModel.deleteOne({_id: productId}).exec();
    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Product not found');
        }
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }
}
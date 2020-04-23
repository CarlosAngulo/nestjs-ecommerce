import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from '../users/user.model';
import { Product, ImageList, ProductDTO } from "./product.model";

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

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

    async create(productDTO: Product, user: User): Promise<Product> {
        const product = await this.productModel.create({
            ...productDTO,
            owner: user
        });
        await product.save();
        return product;
    }

    async update(id:string, productDTO: ProductDTO, user: User): Promise<Product> {
        const product = await this.productModel.findById(id);
        await product.update(productDTO);
        return product;
    }

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

    async findProduct(id: string): Promise<Product> {
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

import {
    Controller,
    Body,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product, ImageList } from "./product.model";

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) {}

    @Post()
    async addProduct(
        @Body('title') prodTitle: string, 
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number, 
        @Body('images') prodImages: ImageList[], 
        @Body('code') prodCode: string, 
    ): Promise<Product> {
        const addedProduct = await this.productService.insertProduct(prodTitle, prodDesc, prodPrice, prodImages, prodCode);
        return addedProduct; 
    }

    @Get()
    async getAllProducts() {
        const products = await this.productService.getProducts();
        return products;
    }

    @Get(':id')
    getProduct(@Param('id') productId: string) {
        return this.productService.getSingleProduct(productId);
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') productId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number, 
        @Body('images') prodImages: ImageList[], 
        @Body('code') prodCode: string, 
    ) {
        const updatedProduct = await this.productService.updateProduct(productId, prodTitle, prodDescription, prodPrice, prodImages, prodCode);
        return updatedProduct;
    }

    @Delete(':id')
    async deleteProduct(@Param('id') productId: string) {
        await this.productService.deleteProduct(productId);
        return null;
    }

}
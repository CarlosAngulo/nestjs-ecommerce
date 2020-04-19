import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./product.model";

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) {}

    @Post()
    async addProduct(
        @Body('title') prodTitle: string, 
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number, 
    ): Promise<Product> {
        const addedProduct = await this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
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
    ) {
        const updatedProduct = await this.productService.updateProduct(productId, prodTitle, prodDescription, prodPrice);
        return updatedProduct;
    }

    @Delete(':id')
    async deleteProduct(@Param('id') productId: string) {
        await this.productService.deleteProduct(productId);
        return null;
    }
}
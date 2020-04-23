import {
    Controller,
    Body,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product, ImageList, ProductDTO } from "./product.model";
import { AuthGuard } from "@nestjs/passport";
import { SellerGuard } from "../guards/seller.guard";
import { ClientGuard } from "../guards/client.guard";
import { User } from "../utils/user.decorator";
import { User as UserDocument } from '../users/user.model';

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'), ClientGuard)
    async getAllProducts() {
        const products = await this.productService.getProducts();
        return products;
    }

    @Get(':id')
    getProduct(@Param('id') productId: string) {
        return this.productService.getSingleProduct(productId);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async addProduct(
        @Body() product: Product,
        @User() user: UserDocument
    ): Promise<Product> {
        console.log(product, user)
        const addedProduct = this.productService.create(product, user);
        return addedProduct; 
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'), SellerGuard)
    async updateProduct(
        @Param('id') id: string,
        @Body() product: ProductDTO,
        @User() user: UserDocument
    ) {
        const {id: userId} = user;
        return this.productService.update(id, product, userId);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') productId: string) {
        await this.productService.deleteProduct(productId);
        return null;
    }

}

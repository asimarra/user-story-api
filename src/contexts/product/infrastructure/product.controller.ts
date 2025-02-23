import { Controller, Get, HttpStatus, Inject, Query } from '@nestjs/common';
import { FindProductByIdUseCase } from '../application/find-product-by-id.usecase';
import { FindAllProductUseCase } from '../application/find-all-products.usecase';
import { CreateProductUseCase } from '../application/create-product.usecase';
import { UpdateProductUseCase } from '../application/update-product.usecase';
import {
  FindAllProductsHttpDto,
  FindAllProductsHttpResponseDto,
} from './dto/find-all-products.http.dto';
import { ProductEntity } from '../domain/product.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductController {
  constructor(
    @Inject() private readonly findProductByIdUseCase: FindProductByIdUseCase,
    @Inject() private readonly findAllProductUseCase: FindAllProductUseCase,
    @Inject() private readonly createProductUseCase: CreateProductUseCase,
    @Inject() private readonly updateProductUseCase: UpdateProductUseCase,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all products',
    type: [FindAllProductsHttpResponseDto],
  })
  @Get()
  async findAll(
    @Query() query: FindAllProductsHttpDto,
  ): Promise<FindAllProductsHttpResponseDto[]> {
    const { limit = 10, offset = 0 } = query;
    return this.findAllProductUseCase.execute(+limit, +offset);
  }
}

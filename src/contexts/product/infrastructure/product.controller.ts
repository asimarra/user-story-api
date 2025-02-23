import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { FindProductByIdUseCase } from '../application/find-product-by-id.usecase';
import { FindAllProductUseCase } from '../application/find-all-products.usecase';
import {
  FindAllProductsHttpDto,
  FindAllProductsHttpResponseDto,
} from './dto/find-all-products.http.dto';
import { PrimitiveProduct } from '../domain/product.entity';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import {
  FindProductByIdHttpDto,
  FindProductByIdHttpResponseDto,
} from './dto/find-product-by-id.http.dto';
import errors from '@src/config/errors.config';

@Controller('products')
export class ProductController {
  constructor(
    @Inject() private readonly findAllProductUseCase: FindAllProductUseCase,
    @Inject() private readonly findProductByIdUseCase: FindProductByIdUseCase,
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

  @ApiOkResponse({
    description: 'Get a product',
    type: FindProductByIdHttpResponseDto,
  })
  @Get(':productId')
  async findProductById(
    @Param() param: FindProductByIdHttpDto,
  ): Promise<PrimitiveProduct | NotFoundException> {
    const product = await this.findProductByIdUseCase.execute(param.productId);

    if (!product) {
      throw new NotFoundException(errors.notFound);
    }

    return product;
  }
}

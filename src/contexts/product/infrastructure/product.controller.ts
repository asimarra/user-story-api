import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FindProductByIdUseCase } from '../application/find-product-by-id.usecase';
import { FindAllProductUseCase } from '../application/find-all-products.usecase';
import {
  FindAllProductsHttpDto,
  FindAllProductsHttpResponseDto,
} from './dto/find-all-products.http.dto';
import { PrimitiveProduct, ProductEntity } from '../domain/product.entity';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import {
  FindProductByIdHttpDto,
  FindProductByIdHttpResponseDto,
} from './dto/find-product-by-id.http.dto';
import errors from '@src/config/errors.config';
import { CreateProductHttpDto } from './dto/create-product.http.dto';
import {
  CreateProductResponse,
  CreateProductUseCase,
} from '../application/create-product.usecase';
import {
  UpdateProductResponse,
  UpdateProductUseCase,
} from '../application/update-product.usecase';
import { UpdateProductHttpDto } from './dto/update-product.http.dto';

@Controller('products')
export class ProductController {
  constructor(
    @Inject() private readonly findAllProductUseCase: FindAllProductUseCase,
    @Inject() private readonly findProductByIdUseCase: FindProductByIdUseCase,
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

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductHttpDto,
  ): Promise<CreateProductResponse> {
    const { name, description, price, stock, status } = createProductDto;

    const createProductResponse = await this.createProductUseCase.execute(
      new ProductEntity('', name, description, price, stock, status),
    );

    if (createProductResponse.error) {
      throw new UnprocessableEntityException(createProductResponse.error);
    }

    return createProductResponse;
  }

  @Patch(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body()
    updateProductDto: UpdateProductHttpDto,
  ): Promise<UpdateProductResponse | NotFoundException> {
    const { name, description, price, stock, status } = updateProductDto;

    const updatedProductResponse = await this.updateProductUseCase.execute(
      productId,
      new ProductEntity('', name, description, price, stock, status),
    );

    if (updatedProductResponse.error) {
      throw new NotFoundException(updatedProductResponse.data);
    }

    return updatedProductResponse;
  }
}

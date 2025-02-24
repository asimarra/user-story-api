import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  CreateInvoiceResponse,
  CreateInvoiceUseCase,
} from '../application/create-invoice.usecase';
import { CreateInvoiceHttpDto } from './dto/create-invoice.http.dto';
import { AuthGuard } from '@src/shared/infrastructure/guards/auth.guard';
import { AuthorizationGuard } from '@src/shared/infrastructure/guards/authorization.guard';
import { Permissions } from '@src/shared/infrastructure/decorators/permissions.decorator';
import { Resource } from '@src/shared/domain/resources.enum';
import { Action } from '@src/shared/domain/action.enum';
import { ApiOkResponse } from '@nestjs/swagger';
import { FindInvoiceByIdHttpDto } from './dto/find-invoice-by-id.http.dto';
import errors from '@src/config/errors.config';
import { FindInvoiceByIdUseCase } from '../application/find-invoice-by-id.usecase';
import { InvoiceEntity } from '../domain/invoice.entity';
import { UserInvoiceLastMonthUseCase } from '../application/user-invoice-last-month.usecase';
import { UserInvoiceLastMonthHttpDto } from './dto/user-invoice-last-month.http.dto';

@UseGuards(AuthGuard, AuthorizationGuard)
@Controller('invoices')
export class InvoiceController {
  constructor(
    @Inject() private readonly createProductUseCase: CreateInvoiceUseCase,
    @Inject() private readonly findInvoiceByIdUseCase: FindInvoiceByIdUseCase,
    @Inject()
    private readonly userInvoiceLastMonthUseCase: UserInvoiceLastMonthUseCase,
  ) {}

  @Permissions([{ resource: Resource.INVOICES, actions: [Action.CREATE] }])
  @Post()
  @Post()
  async create(
    @Req() req: { userId: string },
    @Body() createInvoiceDto: CreateInvoiceHttpDto,
  ): Promise<CreateInvoiceResponse | BadRequestException> {
    const saveInvoice = await this.createProductUseCase.execute(
      req.userId,
      createInvoiceDto.products,
    );

    if (saveInvoice.error) {
      throw new BadRequestException(saveInvoice.data);
    }

    return saveInvoice;
  }

  @Permissions([{ resource: Resource.INVOICES, actions: [Action.READ] }])
  @ApiOkResponse({
    description: 'Get an invoice detail',
  })
  @Get(':invoiceId')
  async findInvoiceById(
    @Param() param: FindInvoiceByIdHttpDto,
  ): Promise<InvoiceEntity | NotFoundException> {
    const invoice = await this.findInvoiceByIdUseCase.execute(param.invoiceId);

    if (!invoice) {
      throw new NotFoundException(errors.notFound);
    }

    return invoice;
  }

  @Permissions([{ resource: Resource.INVOICES, actions: [Action.READ] }])
  @Get('user/:userId/last-month')
  async getUserPurchasesInLastMonth(
    @Param() params: UserInvoiceLastMonthHttpDto,
  ): Promise<{ noPurchases: number }> {
    return this.userInvoiceLastMonthUseCase.execute(params.userId);
  }
}

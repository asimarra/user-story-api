import {
  BadRequestException,
  Body,
  Controller,
  Inject,
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

@UseGuards(AuthGuard, AuthorizationGuard)
@Controller('invoices')
export class InvoiceController {
  constructor(
    @Inject() private readonly createProductUseCase: CreateInvoiceUseCase,
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
}

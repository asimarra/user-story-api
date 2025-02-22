import { IsOptional } from 'class-validator';

export class FindAllHttpDto {
  @IsOptional()
  limit?: string;

  @IsOptional()
  offset?: string;
}

import { Injectable as NestJsInjectable } from '@nestjs/common';

export function MyInjectable() {
  return NestJsInjectable();
}

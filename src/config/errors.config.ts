import { HttpStatus } from '@nestjs/common';

const errors = {
  failedValidation: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Validation failed',
    error: 'Bad Request',
    code: 'BAD_REQUEST',
  },
  notFound: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Resource not found',
    error: 'Not Found',
    code: 'NOT_FOUND',
  },
  forbidden: {
    statusCode: HttpStatus.FORBIDDEN,
    message: 'Forbidden resource',
    error: 'Forbidden',
    code: 'FORBIDDEN',
  },
  unauthorized: {
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Invalid Token',
    error: 'Unauthorized',
    code: 'UNAUTHORIZED',
  },
};

export default errors;

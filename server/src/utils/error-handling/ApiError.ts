import ValidationErrorDetail from '@/types/ValidationErrorDetail';

export default class ApiError extends Error {
  statusCode: number;
  errorCode: string;
  isOperational: boolean = true;
  details: ValidationErrorDetail[];

  constructor(
    statusCode: number,
    errorCode: string,
    isOperational: boolean,
    message: string,
    details?: ValidationErrorDetail[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.details = details ?? [];
  }
}

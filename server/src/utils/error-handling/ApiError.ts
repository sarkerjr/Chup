import ValidationErrorDetail from '@/types/ValidationErrorDetail';

export default class ApiError extends Error {
  statusCode: number;
  errorCode: string;
  details: ValidationErrorDetail[];

  constructor(
    statusCode: number,
    errorCode: string,
    message: string,
    details?: ValidationErrorDetail[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details ?? [];
  }
}

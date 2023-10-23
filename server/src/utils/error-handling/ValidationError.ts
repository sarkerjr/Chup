import ApiError from './ApiError';
import ValidationErrorDetail from '@/types/ValidationErrorDetail';

export default class ValidationError extends ApiError {
  constructor(details: ValidationErrorDetail[]) {
    super(400, 'ERR_INVALID_INPUT', 'Invalid input data.', details);
  }
}

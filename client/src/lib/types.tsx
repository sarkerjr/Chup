export type ErrorDetail = {
  field: string;
  message: string;
};

export type ErrorData = {
  code: string;
  status: number;
  message: string;
  details: ErrorDetail[];
};

export interface RegisterInputType {
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE' | 'OTHERS';
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

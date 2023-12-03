import { z } from 'zod';

export const RegisterSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHERS']),
    phoneNumber: z
      .string()
      .regex(/^\+?\s?\d{3}\s?\d{4,}$/, 'Invalid phone number!'),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long!'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function stringToBoolean(value: string | boolean) {
  if (value && typeof value === 'string') return value === 'true';
  return value;
}

// calculate the number of months between two dates
export const monthDiff = (d1: Date, d2: Date): number => {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

export const calculateFeesDue = (fees: any, accommodation: any) => {
  const currentDate = new Date();
  let monthsDue = 0;

  if (fees.length === 0 && accommodation.joiningDate) {
    // if there is no initial fee data for the student
    if (accommodation.leavingDate) {
      // if the student has left the accommodation, calculate the number of months between their joining date and leaving date
      monthsDue = monthDiff(
        new Date(accommodation.joiningDate),
        new Date(accommodation.leavingDate)
      );
    } else {
      // if the student is still at the accommodation, calculate the number of months since they joined
      monthsDue = monthDiff(new Date(accommodation.joiningDate), currentDate);
    }
  } else {
    fees.forEach((fee: any) => {
      const feeDate = new Date(fee.year, fee.month - 1);
      const diff = monthDiff(feeDate, currentDate);
      if (diff < monthsDue) {
        monthsDue = diff;
      }
    });
  }

  return monthsDue;
};

export function handleValidationErrors(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

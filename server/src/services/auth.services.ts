import { Prisma, prisma } from '@/utils/prisma';
import { compare } from 'bcrypt';

import ValidationError from '@/utils/error-handling/ValidationError';

const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      profile: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          gender: true,
        },
      },
    },
  });

  if (!user) {
    return new ValidationError([
      { field: 'email', message: 'Email does not exist' },
    ]);
  }

  if (!(await compare(password, user.password))) {
    return new ValidationError([
      { field: 'password', message: 'Incorrect password' },
    ]);
  }

  return user;
};

export default { login };

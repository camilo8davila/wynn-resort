'use server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { FormLogin } from '@/app/auth/login/ui/LoginForm';
import { PrismaClient, User } from '@/generated/prisma';
import { encrypt } from '@/utils/jwt';
import { COOKIE_REMEMBER_EMAIL } from '@/utils/constants';

const prisma = new PrismaClient();
const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export const login = async ({ email, password, rememberEmail = false }: FormLogin) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return {
      errors: {
        email: 'User not found'
      }
    }
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return {
      errors: {
        email: 'Incorrect email or password'
      }
    }
  };

  await createSession(user);
  if (rememberEmail) {
    (await cookies()).set(COOKIE_REMEMBER_EMAIL, email, {
      expires: expiresAt
    })
  }

  return {
    ok: true
  };
}

const createSession = async (user: User) => {
  const sessionUser = {
    userId: user.id,
    email: user.email,
    expiresAt
  }
  const session = await encrypt(sessionUser);
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt
  })
}

export const logout = async () => {
  (await cookies()).delete("session");
  redirect('/auth/login')
}
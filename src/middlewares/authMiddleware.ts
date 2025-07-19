import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';

import { decrypt } from '@/utils/jwt';
import * as constants from '@/utils/constants';

const publicRoute = [constants.PATH_REGISTER, constants.PATH_REGISTER_OTP_VERIFICATION, constants.PATH_REGISTER_SEND_CODE, constants.PATH_LOGIN]
const protectedRoute = [constants.PATH_HOME]

export async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie);
  const isProtectedRoute = protectedRoute.includes(pathname);
  const isPublicRoute = publicRoute.includes(pathname);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL(constants.PATH_LOGIN, request.url))
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL(constants.PATH_HOME, request.url))
  }

  return NextResponse.next();
}
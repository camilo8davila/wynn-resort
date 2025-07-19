import * as constants from '@/utils/constants';
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';

const registerPaths = [constants.PATH_REGISTER_OTP_VERIFICATION, constants.PATH_REGISTER_SEND_CODE]
const initialFormPath = constants.PATH_REGISTER

export async function registerMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (registerPaths.includes(pathname)) {
    const cookieStore = await cookies();
    if (pathname === constants.PATH_REGISTER_OTP_VERIFICATION) {
      const stepOfForm = cookieStore.get(constants.COOKIE_REGISTER_STEP_1);
      if (!stepOfForm) {
        return NextResponse.redirect(new URL(initialFormPath, request.url))
      }
    }

    if (pathname === constants.PATH_REGISTER_SEND_CODE) {
      const stepOfForm = cookieStore.get(constants.COOKIE_REGISTER_STEP_2);
      if (!stepOfForm) {
        return NextResponse.redirect(new URL(initialFormPath, request.url))
      }
    }
  }


  return NextResponse.next();
}
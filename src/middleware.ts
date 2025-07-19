import { type NextRequest } from 'next/server';

import { authMiddleware, registerMiddleware } from './middlewares';
import * as constant from './utils/constants';

const registerRoutes = [constant.PATH_REGISTER_SEND_CODE, constant.PATH_REGISTER_OTP_VERIFICATION]

export default async function middleware(request: NextRequest) {
  let response = await authMiddleware(request);

  if (registerRoutes.includes(request.nextUrl.pathname)) {
    response = await registerMiddleware(request);
  }

  return response;
}
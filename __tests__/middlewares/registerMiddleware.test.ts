import { registerMiddleware } from "@/middlewares";
import { NextRequest, NextResponse } from "next/server";


describe('registerMiddleware', () => {

  beforeEach(async () => {
    (NextRequest as jest.Mock).mockClear();
    (NextResponse.next as jest.Mock).mockClear();
    (NextResponse.redirect as jest.Mock).mockClear();
    (NextResponse.rewrite as jest.Mock).mockClear();
  })

  test('should return next NextResponse.next', async () => {
    const request = new NextRequest('http://localhost', {
      headers: new Headers(),
    });

    const response = await registerMiddleware(request)
    expect(response).toEqual({})
  });

  test('should return next redirect to /auth/register if cookie step1 doesn`t exist', async () => {
    const request = new NextRequest('/auth/register/otp-verification', {
      headers: new Headers(),
    });

    const response = await registerMiddleware(request);
    expect(response.status).toBe(307); // Temporary Redirect
    expect(response.headers.get('location')).toBe('http://localhost/auth/register');
  });

  test('should return next redirect to /auth/register if cookie step2 doesn`t exist', async () => {
    const request = new NextRequest('/auth/register/send-code', {
      headers: new Headers(),
    });

    const response = await registerMiddleware(request);
    expect(response.status).toBe(307); // Temporary Redirect
    expect(response.headers.get('location')).toBe('http://localhost/auth/register');
  });
});
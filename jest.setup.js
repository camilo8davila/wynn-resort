import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import mockRouter from 'next-router-mock';
import fetchMock from 'jest-fetch-mock';

import countries from './mocks/api/GET_200_countries.json';
import otpCode from './mocks/api/POST_200_otp.json';

Object.assign(global, { TextEncoder, TextDecoder });
fetchMock.enableMocks();

jest.mock("jose", () => ({
  jwtVerify: jest.fn(),
  SignJWT: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => mockRouter,
  usePathname: () => mockRouter.pathname,
  useSearchParams: () => new URLSearchParams(mockRouter.query),
}));

jest.mock('next/navigation', () => {
  const actualModule = jest.requireActual('next/navigation');
  const mockedExports = {
    ...actualModule,
    redirect: jest.fn(),
  };
  return mockedExports;
});

// Mock fetch call
global.fetch = jest.fn((url, options) => {
  if (url.includes('/miscelanium/countries')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(countries),
      text: () => Promise.resolve(JSON.stringify(countries)),
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    });
  }

  if (url.includes('/auth/otp/send-otp-code')) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(otpCode),
      text: () => Promise.resolve(JSON.stringify(otpCode)),
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    });
  }

  // --- Default / Fallback mock for unmatched URLs ---
  return Promise.resolve({
    ok: false,
    status: 404,
    json: () => Promise.resolve({ error: 'Endpoint no mockeado o no encontrado' }),
    text: () => Promise.resolve(JSON.stringify({ error: 'Endpoint no mockeado o no encontrado' })),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
  });
});


// Mockea la API URL para simular el entorno Edge
global.URL = jest.fn((input, base) => {
  try {
    return new (jest.requireActual('url').URL)(input, base);
  } catch (e) {
    // Proporciona un fallback si la URL real falla, útil para inputs básicos
    return {
      pathname: input,
      hostname: 'localhost',
      href: `http://localhost${input}`,
      searchParams: new URLSearchParams(),
      toString: () => `http://localhost${input}`,
    };
  }
});

jest.mock('next/server', () => {
  const actual = jest.requireActual('next/server');

  class NextRequestMock {
    constructor(input, init) {
      this.url = input;
      this.nextUrl = new URL(input);
      this.headers = new Headers(init?.headers);
      this.cookies = {
        get: jest.fn((name) => this.headers.get('cookie')?.split('; ').find(row => row.startsWith(name))?.split('=')[1]),
        set: jest.fn(),
        delete: jest.fn(),
        getAll: jest.fn(),
      };
      this.json = jest.fn(() => Promise.resolve(init?.json));
      this.text = jest.fn(() => Promise.resolve(init?.body));
      this.arrayBuffer = jest.fn(() => Promise.resolve(new ArrayBuffer(0)));
    }
  }

  return {
    ...actual,
    NextRequest: jest.fn((input, init) => new NextRequestMock(input, init)),

    NextResponse: {
      next: jest.fn(() => ({ /* mock de respuesta next() */ })),
      redirect: jest.fn((url) => ({ status: 307, headers: new Headers({ Location: url }) })),
      rewrite: jest.fn((url) => ({ status: 200, headers: new Headers({ 'x-rewrite-url': url }) })),
      json: jest.fn((body) => ({ status: 200, json: body })),
    },
  };
});

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => {
    return Promise.resolve({
      get: jest.fn((name) => {
        console.log(`MOCKED ASYNC COOKIES.get(${name}) called`);
        return (global).__MOCKED_COOKIES__?.[name] || undefined;
      }),
      has: jest.fn((name) => {
        console.log(`MOCKED ASYNC COOKIES.has(${name}) called`);
        return (global).__MOCKED_COOKIES__?.[name] !== undefined;
      }),
      set: jest.fn(),
      delete: jest.fn(),
    });
  }),
}));

// __mocks__/next/navigation.ts

// These are the actual Jest mock functions you will control and assert on.
export const mockPush = jest.fn();
export const mockReplace = jest.fn();
export const mockReload = jest.fn();
export const mockBack = jest.fn();
export const mockForward = jest.fn();
export const mockPrefetch = jest.fn();
export const mockRefresh = jest.fn();

// This is the useRouter hook mock. It returns an object containing your mock functions.
// Crucially, it always returns the SAME mock functions (mockPush, etc.)
export const useRouter = jest.fn(() => ({
  push: mockPush,
  replace: mockReplace,
  reload: mockReload,
  back: mockBack,
  forward: mockForward,
  prefetch: mockPrefetch,
  refresh: mockRefresh,
  // You might also need to mock properties like pathname, asPath, query
  pathname: '/', // Default value
  asPath: '/',
  query: {},
}));

// Also mock other hooks if your components use them
export const usePathname = jest.fn(() => '/');
export const useSearchParams = jest.fn(() => new URLSearchParams());
export const redirect = jest.fn(() => { throw new Error('redirect called in test') })
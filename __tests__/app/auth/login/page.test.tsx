import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import mockRouter from 'next-router-mock';

import LoginPage from '@/app/auth/login/page';
import * as constants from '@/utils'


// Mock complex components
jest.mock('../../../../src/app/auth/login/ui/LoginForm', () => ({
  LoginForm: jest.fn(() => (
    <div>LoginForm</div>
  ))
}));

describe('LoginPage', () => {

  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  test('Should render the LoginPage component', () => {
    const { container } = render(<LoginPage />);
    expect(container).toBeTruthy();
  })


  test('Should navigate to register when button is push', () => {
    render(<LoginPage />, { wrapper: MemoryRouterProvider });
    const btnRedirectRegister = screen.getByTestId('navigate-button');
    fireEvent.click(btnRedirectRegister);
    expect(mockRouter.pathname).toEqual(constants.PATH_REGISTER);
  });
});
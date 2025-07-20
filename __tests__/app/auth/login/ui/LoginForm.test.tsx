import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { LoginForm } from '@/app/auth/login/ui/LoginForm';
import * as actions from '../../../../../src/actions/auth/login'


jest.mock('../../../../../src/actions/auth/login', () => ({
  login: jest.fn()
}));

describe('LoginForm', () => {
  const mockedLoginAction = jest.mocked(actions.login);

  beforeEach(() => {
    mockedLoginAction.mockClear();
  });

  test('Should render the LoginForm component', () => {
    const { container } = render(<LoginForm />);
    expect(container).toBeTruthy();
  });

  test('Should render form with the inputs and buttons', () => {
    render(<LoginForm />);

    const [emailInput, remeberInput] = screen.getAllByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(remeberInput).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /NEXT/i })).toBeInTheDocument();
  });

  test('Should not call onSubmit if the form is wrong', async () => {
    render(<LoginForm />);

    // Fill the form
    const [emailInput, remeberInput] = screen.getAllByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'camilo davila' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123456' } });
    fireEvent.change(remeberInput, { target: { value: true } });

    const errorMessage = 'User not found'

    mockedLoginAction.mockResolvedValueOnce({ errors: { email: errorMessage } })
    // Click loginbutton
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /NEXT/i }));
    });

    expect(mockedLoginAction).not.toHaveBeenCalled();
  });

  test('Should call onSubmit if the form is correctly filled and show a error message', async () => {
    render(<LoginForm />);

    // Fill the form
    const [emailInput, remeberInput] = screen.getAllByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'camilo7davila@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123456' } });
    fireEvent.change(remeberInput, { target: { value: true } });

    const errorMessage = 'User not found'

    mockedLoginAction.mockResolvedValueOnce({ errors: { email: errorMessage } })
    // Click loginbutton
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /NEXT/i }));
    });

    expect(mockedLoginAction).toHaveBeenCalled();

    await act(async () => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
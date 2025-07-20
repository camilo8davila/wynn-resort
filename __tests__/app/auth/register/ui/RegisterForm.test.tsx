import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { redirect } from 'next/navigation';

import { RegisterForm } from "@/app/auth/register/ui/RegisterForm";
import * as constants from '@/utils/constants';

// Mock complex component
jest.mock('../../../../../src/components/ui/tooltip/Tooltip', () => ({
  Tooltip: jest.fn(() => (
    <></>
  ))
}));

describe('RegisterForm', () => {
  const mockedRedirect = jest.mocked(redirect);
  const mockFetch = jest.mocked(fetch);

  beforeEach(() => {
    mockedRedirect.mockClear();
    mockFetch.mockClear();
  });

  test('should render RegisterForm', async () => {
    const { container } = render(<RegisterForm />);

    await waitFor(() => {
      expect(container).toBeTruthy();
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8082/miscelanium/countries', expect.any(Object))
  });

  test('should render the form with inputs selects and buttons', async () => {
    render(<RegisterForm />);

    await waitFor(() => {
      expect(screen.getByLabelText(/First Name */i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Last Name */i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email */i)).toBeInTheDocument();
      expect(screen.getByLabelText(/I agree to the/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Phone Number */i)).toBeInTheDocument();
    });

    const [genderSelect, countrySelect] = screen.getAllByRole('select');
    expect(genderSelect).toBeInTheDocument();
    expect(countrySelect).toBeInTheDocument();
  });

  test('should redirect to /auth/register/otp-verification if form is valid', async () => {
    render(<RegisterForm />, { wrapper: MemoryRouterProvider });

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/First Name */i), { target: { value: 'Camilo' } });
      fireEvent.change(screen.getByLabelText(/Last Name */i), { target: { value: 'Davila' } });
      fireEvent.change(screen.getByLabelText(/Email */i), { target: { value: 'camilo7davila@gmail.com' } });
      fireEvent.click(screen.getByLabelText(/I agree to the/i));
    });

    fireEvent.change(screen.getByLabelText(/Phone Number */i), { target: { value: '321431462' } });

    const [genderSelect, countrySelect] = screen.getAllByRole('select');

    // Choose gender
    fireEvent.click(genderSelect);
    fireEvent.click(screen.getByRole('option', { name: /Female/i }));

    // Choose residence country
    fireEvent.click(countrySelect);
    fireEvent.click(screen.getByRole('option', { name: /Albania/i }));


    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /NEXT/i }));
    });

    await waitFor(() => {
      expect(mockedRedirect).toHaveBeenCalledTimes(1);
      expect(mockedRedirect).toHaveBeenCalledWith(constants.PATH_REGISTER_OTP_VERIFICATION );
    });
  });
});
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import mockRouter from 'next-router-mock';

import { SendCodeForm } from "@/app/auth/register/ui/SendCodeForm";
import * as actions from '@/actions/auth/register';
import * as constants from '@/utils';
import { useRouter } from "next/navigation";

const userMock = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "",
  countryNumber: "",
  countryIndicator: ""
}

jest.mock('../../../../../src/actions/auth/register', () => ({
  createUser: jest.fn()
}));

describe('SendCodeForm', () => {
  const mockFetch = jest.mocked(fetch);
  const mockedCreateUser = jest.mocked(actions.createUser);
  const mockUseRouter = jest.mocked(useRouter());

  beforeEach(() => {
    mockUseRouter.push.mockClear();
    mockFetch.mockClear();
    mockedCreateUser.mockClear();
  })

  test('should render SendCodeForm', async () => {
    const { container } = render(<SendCodeForm />)
    await waitFor(() => {
      expect(container).toBeTruthy();
    });

    expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:8082/auth/otp/send-otp-code', expect.any(Object))
  });

  test('should render the form with inputs selects and buttons', async () => {
    render(<SendCodeForm />);

    await waitFor(() => {
      expect(screen.getAllByRole('spinbutton').length).toBe(4);
      expect(screen.getByRole('button', { name: /NEXT/i }));
      expect(screen.getByRole('link', { name: /BACK/i }));
    });
  });

  test('should navigate to /auth/register/otp-verification if user click back button', async () => {
    render(<SendCodeForm />, { wrapper: MemoryRouterProvider });
    await waitFor(() => {
      fireEvent.click(screen.getByRole('link', { name: /BACK/i }));
      expect(mockRouter.pathname).toEqual(constants.PATH_REGISTER_OTP_VERIFICATION);
    })
  });

  test('should navigate if form is valid and user click next button', async () => {
    render(<SendCodeForm />);
    await waitFor(() => {
      const inputs = screen.getAllByRole('spinbutton');
      inputs.forEach((input: any, index: number) => {
        fireEvent.change(input, { target: { value: index + 1 } });
      });
    });

    mockedCreateUser.mockResolvedValueOnce({
      ok: true,
      message: '',
      user: userMock
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /NEXT/i }));
    });

    await waitFor(() => {
      expect(mockedCreateUser).toHaveBeenCalledTimes(1);
      expect(mockedCreateUser).toHaveBeenCalledTimes(1);
    });
  });

  test('should not navigate if code is invalid', async () => {
    render(<SendCodeForm />);
    await waitFor(() => {
      const inputs = screen.getAllByRole('spinbutton');
      inputs.forEach((input: any, index: number) => {
        fireEvent.change(input, { target: { value: index + 1 } });
      });
    });

    mockedCreateUser.mockRejectedValueOnce({
      ok: false,
      message: 'Email already exist'
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /NEXT/i }));
    });

    await waitFor(() => {
      expect(mockUseRouter.push).not.toHaveBeenCalled();
    });
  });
});
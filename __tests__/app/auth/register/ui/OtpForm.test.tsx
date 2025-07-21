import { useRouter } from 'next/navigation';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import mockRouter from 'next-router-mock';

import { OtpForm } from '@/app/auth/register/ui/OtpForm';
import * as constants from '@/utils';

describe('OtpForm', () => {
  const mockUseRouter = jest.mocked(useRouter());

  beforeEach(() => {
    mockUseRouter.push.mockClear();
    mockRouter.setCurrentUrl('/');
  })

  test('should render OtpForm', () => {
    const { container } = render(<OtpForm />);
    expect(container).toBeTruthy();
  });

  test('should render the form and buttons', async () => {
    render(<OtpForm />);
    expect(screen.getByLabelText(/Send to phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Send to email/i)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /BACK/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /NEXT/i })).toBeInTheDocument();
  });

  test('should navigate to /auth/register if user click back button', async () => {
    render(<OtpForm />, { wrapper: MemoryRouterProvider });
    fireEvent.click(screen.getByRole('link', { name: /BACK/i }));
    expect(mockRouter.pathname).toEqual(constants.PATH_REGISTER);
  });

  test('should navigate if form is valid and user click next button', async () => {
    render(<OtpForm />);
    fireEvent.click(screen.getByLabelText(/Send to phone/i));
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /NEXT/i }));
    });
    
    await waitFor(() => {
      expect(mockUseRouter.push).toHaveBeenCalled();
      expect(mockUseRouter.push).toHaveBeenCalledTimes(1);
    });
  });
});
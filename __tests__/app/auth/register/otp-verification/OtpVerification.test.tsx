import { render, screen } from '@testing-library/react';
import OtpVerificationPage from '@/app/auth/register/otp-verification/page';

// Mock complex components
jest.mock('../../../../../src/app/auth/register/ui/OtpForm', () => ({
  OtpForm: jest.fn(() => (
    <div>OtpForm</div>
  ))
}));

describe('OtpVerification', () => {
  test('should render OtpVerification', () => {
    const { container } = render(<OtpVerificationPage />);
    expect(container).toBeTruthy();

  })

  test('Should render RegisterPage with RegisterForm as a child', () => {
    render(<OtpVerificationPage />);
    expect(screen.getByText('OtpForm')).toBeInTheDocument();
  });
});
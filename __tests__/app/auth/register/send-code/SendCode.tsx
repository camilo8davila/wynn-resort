import { render, screen } from '@testing-library/react';
import SendCodePage from '@/app/auth/register/send-code/page';

// Mock complex components
jest.mock('../../../../../src/app/auth/register/ui/SendCodeForm', () => ({
  SendCodeForm: jest.fn(() => (
    <div>SendCodeForm</div>
  ))
}));

describe('OtpVerification', () => {
  test('should render OtpVerification', () => {
    const { container } = render(<SendCodePage />);
    expect(container).toBeTruthy();
  });

  test('Should render SendCodeForm with RegisterForm as a child', () => {
    render(<SendCodePage />);
    expect(screen.getByText('SendCodeForm')).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';

import RagisterPage from '@/app/auth/register/page';

jest.mock('../../../../src/app/auth/register/ui/RegisterForm', () => ({
  RegisterForm: jest.fn(() => (
    <div>RegisterForm</div>
  ))
}))

describe('RagisterPage', () => {

  test('Should render the RagisterPage component', () => {
    const { container } = render(<RagisterPage />);
    expect(container).toBeTruthy();
  });

  test('Should render RegisterPage with RegisterForm as a child', () => {
    render(<RagisterPage />);
    expect(screen.getByText('RegisterForm')).toBeInTheDocument();
  });
});
import { Logout } from "@/app/(home)/ui/Logout";
import { fireEvent, render, screen } from "@testing-library/react";

import * as actions from '../../../../src/actions/auth/login';

jest.mock('../../../../src/actions/auth/login', () => ({
  logout: jest.fn()
}));

describe('Logout', () => {
  const mockedLogout = jest.mocked(actions.logout);

  beforeEach(() => {
    mockedLogout.mockClear();
  })

  test('should render Logout', () => {
    const { container } = render(<Logout />);
    expect(container).toBeTruthy();
  });

  test('should call action.logout', () => {
    render(<Logout />);
    fireEvent.click(screen.getByRole('button', { name: /LOGOUT/i }));

    mockedLogout.mockResolvedValueOnce(null as never)

    expect(mockedLogout).toHaveBeenCalledTimes(1);
  });
});
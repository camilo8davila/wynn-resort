import HomePage from "@/app/(home)/page";
import { render, screen } from "@testing-library/react";

describe('HomePage', () => {
  test('should render HomePage', () => {
    const { container } = render(<HomePage />);
    expect(container).toBeTruthy();
  });

  test('should render LogoutComponent', () => {
    render(<HomePage />);
    expect(screen.getByRole('button', { name: /LOGOUT/i })).toBeInTheDocument();
  });
});
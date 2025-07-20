import { GridAuth, Title } from '@/components';
import { LoginForm } from './ui/LoginForm';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Login",
  description: "Luxury hotel in Dubai",
};

export default function LoginPage() {
  return (
    <GridAuth>
      <div className="block sm:flex w-full">
        <Title title="Login" subtitle="Please enter below information to go into the page." className="mb-10" />
      </div>

      <LoginForm />

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <div>
        <Link
          data-testid="navigate-button"
          href="/auth/register"
          className="text-center text-sm underline cursonr-pointer"
        >
          Crear una nueva cuenta
        </Link>
      </div>

    </GridAuth>
  );
}
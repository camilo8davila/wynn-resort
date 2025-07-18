import { GridAuth, Title } from '@/components';
import { RegisterForm } from './ui/RegisterForm';

export default function RegisterPage() {
  return (
    <GridAuth>
      <div className="flex w-full justify-between">
        <Title title="Registration" subtitle="Please enter below information to create your account." className="mb-10" />

        <p className="text-2xl font-caslo">Step 1 of 3</p>
      </div>

      <RegisterForm />
    </GridAuth>
  );
}
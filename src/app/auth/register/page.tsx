import { RegisterForm } from './ui/RegisterForm';
import { GridAuth, Title } from '@/components';
import { bigCaslo } from '@/config/fonts';

export default function RegisterPage() {
  return (
    <GridAuth>
      <div className="w-full justify-between block sm:flex ">
        <Title title="Registration" subtitle="Please enter below information to create your account." className="mb-8 sm:mb-10" />

        <p className={`${bigCaslo.className} text-2xl font-caslo text-center mb-8 sm:mb-0`}>Step 1 of 3</p>
      </div>

      <RegisterForm />
    </GridAuth>
  );
}
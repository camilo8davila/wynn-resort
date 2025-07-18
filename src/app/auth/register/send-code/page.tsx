import { GridAuth, Title } from '@/components';
import { SendCodeForm } from '../ui/SendCodeForm';

export default function SendCodePage() {
  return (
    <GridAuth>
      <div className="flex w-full justify-between">
        <Title title="Registration" subtitle="Please enter below information to create your account." className="mb-10" />

        <p className="text-2xl font-caslo">Step 3 of 3</p>
      </div>

      <SendCodeForm />
    </GridAuth>
  );
}
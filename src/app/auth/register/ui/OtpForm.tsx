'use client';
import { Fieldset, RadioGroup } from '@/components';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface FormInputs {
  sendTo: string;
}

const items = [
  { value: 'phone', label: 'Send to phone' },
  { value: 'email', label: 'Send to email' }
]

export const OtpForm = () => {
  const { handleSubmit, formState: { errors }, control } = useForm<FormInputs>({
    values: {
      sendTo: 'email'
    }
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    redirect('/auth/register/send-code')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className="mb-10" title='OTP Verification'>
        <div className="mt-3 w-full h-[206px] bg-white rounded p-6 text-center">
          <h3 className='text-black-dark text-xl mb-5'>Send Code</h3>
          <p className='text-black-soft text-base font-semibold mb-9'>How would you like to receive the code?</p>

          <Controller
            control={control}
            name="sendTo"
            rules={{ required: true }}
            render={
              ({ field: { onChange, value } }) => (
                <RadioGroup
                  name='send'
                  items={items}
                  value={value}
                  onChange={onChange}
                />
              )
            }
          />
        </div>
      </Fieldset>

      <div className='w-full flex items-center gap-10'>
        <Link href="/auth/register" className='btn-secondary w-full'>BACK</Link>
        <button className='btn-primary w-full'>NEXT</button>
      </div>
    </form>
  )
}

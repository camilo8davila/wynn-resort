'use client';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Fieldset, OtpNumber } from '@/components';
import Link from 'next/link';

interface FormInputs {
  code: number;
}

export const SendCodeForm = () => {
  const { handleSubmit, formState: { errors }, control } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log('TODO: do login', data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className="mb-10" title='OTP Verification'>
        <div className="mt-3 w-full bg-white rounded p-6 text-center">
          <h3 className='text-black-dark text-xl mb-5'>Please check your email.</h3>
          <p className='text-black-soft text-base font-semibold mb-9'>We've sent a code to anton@gmail.com</p>

          <Controller
            control={control}
            name="code"
            rules={{ required: true, minLength: 4 }}
            render={
              ({ field: { onChange, value } }) => (
                <OtpNumber
                  length={4}
                  onChange={onChange}
                  initValue={value}
                  error={!!errors.code}
                />
              )
            }
          />
          <p className='text-black-soft text-base font-semibold mt-4'>Didn’t get a code? <a href="" className='underline'>Click to resend.</a></p>
        </div>
      </Fieldset>


      <div className='w-full flex items-center gap-10'>
        <Link href="/auth/register/otp-verification" className='btn-secondary w-full'>BACK</Link>
        <button className='btn-primary w-full'>NEXT</button>
      </div>
    </form>
  )
}

'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { setCookie } from 'cookies-next';
import { bigCaslo } from '@/config/fonts';

import { useRegisterStore } from '@/store';
import { Fieldset, RadioGroup } from '@/components';
import * as contants from '@/utils/constants';

export interface FormInputsWayToSend {
  sendTo: 'phone' | 'email' | null;
}

const items = [
  { value: 'phone', label: 'Send to phone' },
  { value: 'email', label: 'Send to email' }
]

export const OtpForm = () => {
  const userRegisterCache = useRegisterStore(state => state.firstPage);
  const navigation = useRouter();
  const updateRegisterCache = useRegisterStore(state => state.updateRegisterCache);

  const { handleSubmit, formState: { errors }, control } = useForm<FormInputsWayToSend>({
    values: {
      sendTo: userRegisterCache.sendTo
    }
  });

  const onSubmit: SubmitHandler<FormInputsWayToSend> = (data) => {
    updateRegisterCache(data);
    setCookie(contants.COOKIE_REGISTER_STEP_2, 'true', { maxAge: 600 })
    navigation.push(contants.PATH_REGISTER_SEND_CODE)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className="mb-10" title='OTP Verification'>
        <div className="mt-3 w-full bg-white rounded p-6 text-center">
          <h3 className={`${bigCaslo.className} text-black-dark text-xl mb-5`}>Send Code</h3>
          <p className='text-black-soft text-base font-semibold mb-9'>How would you like to receive the code?</p>

          <Controller
            control={control}
            name="sendTo"
            rules={{ required: true }}
            render={
              ({ field: { onChange, value } }) => (
                <RadioGroup
                  name='send'
                  error={!!errors.sendTo}
                  items={items}
                  value={value}
                  onChange={onChange}
                />
              )
            }
          />
        </div>
      </Fieldset>

      <div className='w-full flex flex-col-reverse sm:flex-row items-center gap-10'>
        <Link href={contants.PATH_REGISTER} className='btn-secondary w-full block'>BACK</Link>
        <button className='btn-primary w-full'>NEXT</button>
      </div>
    </form>
  )
}

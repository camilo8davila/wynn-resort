'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { deleteCookie } from 'cookies-next';
import { bigCaslo } from '@/config/fonts';

import { useRegisterStore, useUiStore } from '@/store';
import { Fieldset, OtpNumber } from '@/components';
import * as actions from '@/actions';
import * as constants from '@/utils';
import { isActionError } from '@/utils';

interface FormInputs {
  code: string;
}

export const SendCodeForm = () => {
  const userRegisterCache = useRegisterStore(state => state.firstPage);
  const resetCache = useRegisterStore(state => state.resetStore);
  const showLoading = useUiStore(state => state.showLoading);
  const { handleSubmit, formState: { errors }, control } = useForm<FormInputs>();
  const [requestState, setRequestState] = useState({
    error: false,
    errorMessaje: ''
  });

  useEffect(() => {
    requestOtpCode();
  }, []);

  const requestOtpCode = async () => {
    setRequestState({ error: false, errorMessaje: '' });
    showLoading(true, 'Sending otp code');
    try {
      const dataToSend = {
        sendTo: userRegisterCache.sendTo,
        contact: userRegisterCache.sendTo === 'email' ? userRegisterCache.email : `${userRegisterCache.phone.indicator}${userRegisterCache.phone.number}`
      }
      const data = await actions.sendOtpCode(dataToSend);
      if (isActionError(data)) {
        setRequestState(state => ({ ...state, error: true, errorMessaje: 'we had an error generating otp code please resend it' }));
      }
      showLoading(false);
    } catch (error) {
      setRequestState(state => ({ ...state, error: true, errorMessaje: 'we had an error generating otp code please resend it' }));
      showLoading(false);
    }
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setRequestState({ error: false, errorMessaje: '' });
    showLoading(true, 'Creating user');
    let user
    try {
      const response = await actions.verifyCode({ otp: data.code });
      if (isActionError(response)) {
        setRequestState(state => ({ ...state, error: true, errorMessaje: response.error || 'Error creating user' }))
        showLoading(false);
        return;
      }
      user = await actions.createUser(userRegisterCache);
      showLoading(false);
    } catch (error: any) {
      setRequestState(state => ({ ...state, error: true, errorMessaje: error.message || 'Error creating user' }))
      showLoading(false);
    }
    if (user) {
      deleteCookie(constants.COOKIE_REGISTER_STEP_1);
      deleteCookie(constants.COOKIE_REGISTER_STEP_2);
      resetCache();
      redirect(constants.PATH_LOGIN);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='relative'>
      <Fieldset className="mb-10" title='OTP Verification'>
        <div className="mt-3 w-full bg-white rounded p-6 text-center">
          <h3 className={`${bigCaslo.className} text-black-dark text-xl mb-5`}>Please check your email.</h3>
          <p className='text-black-soft text-base font-semibold mb-9'>
            We've sent a code to {
              userRegisterCache.sendTo === 'email' ? (
                <>{userRegisterCache.email}</>
              ) : (
                <b>
                  {userRegisterCache.phone.indicator} - {userRegisterCache.phone.number} &nbsp; <span className={`fi fi-${userRegisterCache.phone.country} text-lg`}></span>
                </b>
              )
            }
          </p>

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
          <p className='text-black-soft text-base font-semibold mt-4'>Didn’t get a code? <button onClick={() => requestOtpCode()} type='button' className='underline'>Click to resend.</button></p>
        </div>
      </Fieldset>


      <div className='w-full flex flex-col-reverse sm:flex-row items-center gap-10'>
        <Link href={constants.PATH_REGISTER_OTP_VERIFICATION} className='btn-secondary w-full block'>BACK</Link>
        <button
          className="w-full btn-primary"
        >
          NEXT
        </button>
      </div>

      {
        requestState.error && (
          <div className='text-center mt-2'>
            <span className="helper-text text-error right-0">{requestState.errorMessaje}</span>
          </div>
        )
      }
    </form>
  )
}

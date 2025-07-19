'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { deleteCookie } from 'cookies-next';
import clsx from 'clsx';

import { useRegisterStore } from '@/store';
import { Fieldset, OtpNumber } from '@/components';
import * as actions from '@/actions';
import * as constants from '@/utils/constants';

interface FormInputs {
  code: string;
}

export const SendCodeForm = () => {
  const userRegisterCache = useRegisterStore(state => state.firstPage);
  const { handleSubmit, formState: { errors }, control } = useForm<FormInputs>();
  const [requestState, setRequestState] = useState({
    isLoading: false,
    error: false,
    errorMessaje: ''
  });

  useEffect(() => {
    requestOtpCode();
  }, []);

  const requestOtpCode = async () => {
    setRequestState({
      isLoading: true,
      error: false,
      errorMessaje: ''
    });
    try {
      const dataToSend = {
        sendTo: userRegisterCache.sendTo,
        contact: userRegisterCache.sendTo === 'email' ? userRegisterCache.email : `${userRegisterCache.phone.indicator}${userRegisterCache.phone.number}`
      }
      await actions.sendOtpCode(dataToSend);
      setRequestState(state => ({ ...state, isLoading: false }));
    } catch (error) {
      setRequestState(state => ({ ...state, isLoading: false, error: true, errorMessaje: 'Error to get otp code' }))
      console.log(error);
    }
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setRequestState({
      isLoading: true,
      error: false,
      errorMessaje: ''
    });
    let user
    try {
      await actions.verifyCode({ otp: data.code });
      user = await actions.createUser(userRegisterCache);
      deleteCookie(constants.COOKIE_REGISTER_STEP_1);
      deleteCookie(constants.COOKIE_REGISTER_STEP_2);
      setRequestState(state => ({ ...state, isLoading: false }));
    } catch (error: any) {
      setRequestState(state => ({ ...state, isLoading: false, error: true, errorMessaje: error.message }))
      console.log(error);
    }
    if (user) {
      redirect('/')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='relative'>
      <Fieldset className="mb-10" title='OTP Verification'>
        <div className="mt-3 w-full bg-white rounded p-6 text-center">
          <h3 className='text-black-dark text-xl mb-5'>Please check your email.</h3>
          <p className='text-black-soft text-base font-semibold mb-9'>
            We've sent a code to {
              userRegisterCache.sendTo === 'email' ? (
                <>anton@gmail.com</>
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
          <p className='text-black-soft text-base font-semibold mt-4'>Didn’t get a code? <a href="" className='underline'>Click to resend.</a></p>
        </div>
      </Fieldset>


      <div className='w-full flex flex-col-reverse sm:flex-row items-center gap-10'>
        <Link href={constants.PATH_REGISTER_OTP_VERIFICATION} className='btn-secondary w-full block'>BACK</Link>
        <button
          className={
            clsx(
              "w-full btn-primary",
              {
                "btn-disabled": requestState.isLoading,
              }
            )
          }
        >
          NEXT
        </button>
      </div>

      {
        requestState.error && (
          <span className="absolute text-error right-0">{requestState.errorMessaje}</span>
        )
      }
    </form>
  )
}

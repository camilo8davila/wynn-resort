'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCookie } from 'cookies-next';
import { redirect } from 'next/navigation';

import { useUiStore } from '@/store';
import { Checkbox, Field, Fieldset, Input, Label } from '@/components';
import { COOKIE_REMEMBER_EMAIL, PATH_HOME } from '@/utils';
import * as actions from '@/actions';

export interface FormLogin {
  email: string;
  password: string;
  rememberEmail: boolean;
};

const initialValueRequest = {
  error: false,
  errorMessaje: ''
}

export const LoginForm = () => {
  const setLoading = useUiStore(state => state.showLoading);
  const { setValue, register, handleSubmit, formState: { errors } } = useForm<FormLogin>({
    mode: 'onChange'
  });

  const [requestState, setRequestState] = useState(initialValueRequest);

  useEffect(() => {
    const saveEmail = getCookie(COOKIE_REMEMBER_EMAIL);
    if (saveEmail) {
      setValue('email', saveEmail as string)
    }
  }, [])


  const onSubmit = async ({ email, password, rememberEmail }: FormLogin) => {
    setLoading(true, `Looking for user ${email}`);
    setRequestState({ ...initialValueRequest });
    try {
      const response = await actions.login({ email, password, rememberEmail });
      setLoading(false);
      if (response.errors) {
        setRequestState(value => ({ ...value, error: true, errorMessaje: response.errors.email }));
        return;
      }
      setRequestState(initialValueRequest);
      redirect(PATH_HOME);
    } catch (error: any) {
      console.warn(error?.message);
      setLoading(false);
      setRequestState(value => ({ ...value, error: true, errorMessaje: error?.message || 'Error to get user' }));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className='mb-5' title="Credentials">
        <Field className="mb-6">
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder='Enter email...'
            type='text'
            id='email'
            error={!!errors.email}
            errorMessage={errors.email?.message}
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
        </Field>

        <Field className="mb-6">
          <Label htmlFor="password">Password</Label>
          <Input
            placeholder='Enter password...'
            type='password'
            id='password'
            error={!!errors.password}
            errorMessage={errors.password?.message}
            {...register('password', { required: true, minLength: 5 })}
          />
        </Field>

        <Checkbox
          id='rememberEmail'
          {...register('rememberEmail')}
        >
          <span className='font-semibold text-base'>
            remember email.
          </span>
        </Checkbox>
      </Fieldset>

      <div className='text-center md:text-left'>
        <button className='btn-primary w-[210px]' type='submit'>
          NEXT
        </button>
      </div>
      {
        requestState.error && (
          <div className='text-center'>
            <span className="text-error mb-3">{requestState.errorMessaje}</span>
          </div>
        )
      }
    </form>
  )
}

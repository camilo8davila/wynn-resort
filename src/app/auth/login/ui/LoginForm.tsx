'use client';
import { useForm } from 'react-hook-form';

import { Checkbox, Field, Fieldset, Input, Label } from '@/components';
import * as actions from '@/actions';
import { useState } from 'react';

export interface FormLogin {
  email: string;
  password: string;
  rememberEmail: boolean;
};

const initialValueRequest = {
  isLoading: false,
  error: false,
  errorMessaje: ''
}

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormLogin>({
    // values: {
    //   ...userRegisterCache
    // }
  });

  const [requestState, setRequestState] = useState(initialValueRequest);

  const onSubmit = async ({ email, password, rememberEmail }: FormLogin) => {
    setRequestState({ ...initialValueRequest, isLoading: true });
    const response = await actions.login({ email, password, rememberEmail });
    if (response.errors) {
      setRequestState(value => ({ ...value, isLoading: false, error: true, errorMessaje: response.errors.email }));
      return;
    }
    setRequestState(initialValueRequest);
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
            <span className="text-error mb-3">{requestState.errorMessaje} data</span>
          </div>
        )
      }
    </form>
  )
}

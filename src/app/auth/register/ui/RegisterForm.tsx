'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { setCookie } from 'cookies-next';

import { useRegisterStore } from '@/store';
import { getCountries } from '@/actions';
import { Checkbox, Field, Fieldset, Input, Label, Option, OptionCountry, PhoneInput, Select, SelectOption, Tooltip } from '@/components';
import { COOKIE_REGISTER_STEP_1 } from '@/utils/constants';

export interface FormInputsBasic {
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
  email: string;
  phone: {
    country: string;
    number: string;
    indicator: string;
  },
  terms: boolean;
}

const optionsGender: SelectOption[] = [
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  }
];

export const RegisterForm = () => {
  const userRegisterCache = useRegisterStore(state => state.firstPage);
  const updateRegisterCache = useRegisterStore(state => state.updateRegisterCache);
  const [countries, setCountries] = useState<SelectOption[]>([])

  const { register, handleSubmit, formState: { errors }, control } = useForm<FormInputsBasic>({
    values: {
      ...userRegisterCache
    }
  });

  useEffect(() => {
    fetchCountries()
  }, []);

  const fetchCountries = async () => {
    const countries = await getCountries();
    setCountries(countries)
  }

  const onSubmit: SubmitHandler<FormInputsBasic> = (data) => {
    updateRegisterCache(data);
    setCookie(COOKIE_REGISTER_STEP_1, 'true', { maxAge: 600 });
    redirect('/auth/register/otp-verification');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className='mb-5' title="Contact Details">
        <div className='block sm:flex gap-6 mb-6'>
          <Field className="mb-6 sm:mb-0">
            <Label htmlFor="firstName">First Name *</Label>
            <Tooltip content="First Name">
              <Image
                src="/icons/exclamation-mark.svg"
                alt='exclamation-mark'
                width={12}
                height={12}
              />
            </Tooltip>
            <Input
              placeholder='Enter first name...'
              type='text'
              id='firstName'
              error={!!errors.firstName}
              errorMessage={errors.firstName?.message}
              {...register('firstName', { required: true })}
            />
          </Field>

          <Field>
            <Label htmlFor="lastName">Last Name *</Label>
            <Tooltip content="Last Name">
              <Image
                src="/icons/exclamation-mark.svg"
                alt='exclamation-mark'
                width={12}
                height={12}
              />
            </Tooltip>
            <Input
              placeholder='Enter last name...'
              type='text'
              id='lastName'
              error={!!errors.lastName}
              errorMessage={errors.lastName?.message}
              {...register('lastName', { required: true })}
            />
          </Field>
        </div>

        <Field className="mb-6">
          <Label htmlFor="gender">Gender *</Label>
          <Tooltip content="Gender">
            <Image
              src="/icons/exclamation-mark.svg"
              alt='exclamation-mark'
              width={12}
              height={12}
            />
          </Tooltip>
          <Controller
            control={control}
            name="gender"
            rules={{ required: true }}
            render={
              ({ field: { onChange, value } }) => (
                <Select
                  options={optionsGender}
                  placeholder='Select gender...'
                  error={!!errors.gender}
                  onChange={onChange}
                  initialValue={value}
                  optionToRender={({ key, ...item }) => (
                    <Option
                      key={item.value}
                      {...item}
                    >
                      {item.label}
                    </Option>
                  )}
                />
              )
            }
          />
        </Field>

        <Field className="mb-6">
          <Label htmlFor="country">Your residence country *</Label>
          <Tooltip content="Country">
            <Image
              src="/icons/exclamation-mark.svg"
              alt='exclamation-mark'
              width={12}
              height={12}
            />
          </Tooltip>
          {
            countries.length !== 0 ? (
              <Controller
                control={control}
                name="country"
                rules={{ required: true }}
                render={
                  ({ field: { onChange, value } }) => (
                    <Select
                      options={countries}
                      placeholder='Select residence country...'
                      error={!!errors.country}
                      onChange={onChange}
                      initialValue={value}
                      selectedValueRender={(item) => (
                        <div className='w-full h-full flex items-center gap-3'>
                          <span className={`fi fi-${item.value} text-2xl`}></span> <p>{item.label}</p>
                        </div>
                      )}
                      optionToRender={({ key, ...item }) => (
                        <Option
                          key={item.value}
                          {...item}
                        >
                          <OptionCountry shortCountry={item.value! as string} label={item.label} />
                        </Option>
                      )}
                    />
                  )
                }
              />
            ) : (
              <div className='animate-pulse w-full h-[60px] bg-gray-200 rounded-sm' />
            )
          }
        </Field>
      </Fieldset>

      <Fieldset className="mb-8" title='Contact Details'>
        <Field className="mb-6">
          <Label htmlFor="email">Email *</Label>
          <Tooltip content="User email">
            <Image
              src="/icons/exclamation-mark.svg"
              alt='exclamation-mark'
              width={12}
              height={12}
            />
          </Tooltip>
          <Input
            placeholder='Enter email...'
            type='email'
            id='email'
            error={!!errors.email}
            errorMessage={errors.email?.message}
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
        </Field>


        <Field>
          <Label htmlFor="phone">Phone Number *</Label>
          <Tooltip content="Phone Number">
            <Image
              src="/icons/exclamation-mark.svg"
              alt='exclamation-mark'
              width={12}
              height={12}
            />
          </Tooltip>

          {
            countries.length !== 0 ? (
              <Controller
                control={control}
                name="phone"
                rules={{ required: true }}
                render={
                  ({ field: { onChange, value } }) => (
                    <PhoneInput
                      id="phone"
                      placeholder='(___) - ____'
                      optionCountries={countries}
                      onChange={onChange}
                      initValue={value}
                    />
                  )
                }
              />
            ) : (
              <div className='animate-pulse w-full h-[60px] bg-gray-200 rounded-sm' />
            )
          }
        </Field>
      </Fieldset>

      <Checkbox
        id='terms'
        {...register('terms', { required: true })}
      >
        <span className='font-semibold text-base'>
          I agree to the <a href="" className='underline'>terms and conditions</a> and <a href="" className='underline'>privacy policy</a>.
        </span>
      </Checkbox>

      <div className='text-center md:text-left'>
        <button className='btn-primary w-[210px] mt-8 bottom-[-40px]' type='submit'>
          NEXT
        </button>
      </div>

    </form>
  )
}

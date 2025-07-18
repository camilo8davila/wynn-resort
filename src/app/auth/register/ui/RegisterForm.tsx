'use client';
import Image from 'next/image';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Checkbox, Field, Fieldset, Input, Label, Option, OptionCountry, PhoneInput, Select, SelectOption, Tooltip } from '@/components';
import { redirect } from 'next/navigation';

interface FormInputs {
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
  email: string;
  phone: {
    country: string;
    number: string
  },
  terms: boolean;
}

const optionsCountries: SelectOption[] = [
  {
    value: 'al',
    label: 'Albania',
    extra: '+52'
  },
  {
    value: 'ae',
    label: 'UAE',
    extra: '+971'
  },
  {
    value: 'ad',
    label: 'Andorra',
    extra: '+34'
  },
  {
    value: 'ao',
    label: 'Angola',
    extra: '+1'
  },
  {
    value: 'ag',
    label: 'Antigua',
    extra: '+523'
  },
  {
    value: 'ar',
    label: 'Argentina',
    extra: '+36'
  },
];

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
  const { register, handleSubmit, formState: { errors }, control } = useForm<FormInputs>({
    values: {
      firstName: 'camilo',
      lastName: 'davila',
      gender: 'male',
      country: 'ae',
      email: 'camilo7davila@gmail.com',
      phone: {
        country: 'ag',
        number: '43122'
      },
      terms: true
    }
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log({ data });
    redirect('/auth/register/otp-verification')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className='mb-5' title="Contact Details">
        <div className='flex gap-6 mb-6'>
          <Field>
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
          <Controller
            control={control}
            name="country"
            rules={{ required: true }}
            render={
              ({ field: { onChange, value } }) => (
                <Select
                  options={optionsCountries}
                  placeholder='Select residence country...'
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

          <Controller
            control={control}
            name="phone"
            rules={{ required: true }}
            render={
              ({ field: { onChange, value } }) => (
                <PhoneInput
                  id="phone"
                  placeholder='(___) - ____'
                  optionCountries={optionsCountries}
                  onChange={onChange}
                  initValue={value}
                />
              )
            }
          />
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

      <button className='btn-primary w-[210px] mt-8' type='submit'>
        NEXT
      </button>

    </form>
  )
}

'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { setCookie } from 'cookies-next';

import { useRegisterStore } from '@/store';
import { Checkbox, Field, Fieldset, Input, Label, Option, OptionCountry, PhoneInput, Select, SelectOption, Tooltip } from '@/components';
import { COOKIE_REGISTER_STEP_1, PATH_REGISTER_OTP_VERIFICATION } from '@/utils/constants';

interface Props {
  countries: SelectOption[];
  genders: SelectOption[];
}

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

export const RegisterForm = ({ countries = [], genders = [] }: Props) => {
  const userRegisterCache = useRegisterStore(state => state.firstPage);
  const navigation = useRouter();
  const updateRegisterCache = useRegisterStore(state => state.updateRegisterCache);

  const { register, handleSubmit, formState: { errors }, control } = useForm<FormInputsBasic>({
    values: {
      ...userRegisterCache
    },
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<FormInputsBasic> = (data) => {
    updateRegisterCache(data);
    setCookie(COOKIE_REGISTER_STEP_1, 'true', { maxAge: 600 });
    navigation.push(PATH_REGISTER_OTP_VERIFICATION);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset className='mb-5' title="Personal Info">
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
              {...register('firstName', { required: { value: true, message: 'First Name is require' }, minLength: { value: 3, message: 'Too short 3' } })}
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
              {...register('lastName', { required: { value: true, message: 'Last Name is require' }, minLength: { value: 3, message: 'Too short 3' } })}
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
            rules={{ required: { value: true, message: 'Last Name is require' } }}
            render={
              ({ field: { onChange, value } }) => (
                <Select
                  id='gender'
                  options={genders}
                  placeholder='Select gender...'
                  error={!!errors.gender}
                  errorMessage={errors.gender?.message}
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
                rules={{ required: { value: true, message: 'Last Name is require' } }}
                render={
                  ({ field: { onChange, value } }) => (
                    <Select
                      id='country'
                      options={countries}
                      placeholder='Select residence country...'
                      error={!!errors.country}
                      errorMessage={errors.gender?.message}
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
            {...register('email', { required: { value: true, message: 'Email is require' }, pattern: { value: /^\S+@\S+$/i, message: 'Email no valid' } })}
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
                rules={{
                  validate: (value) => value.number.length !== 0 || 'Phone country in neccesary'
                }}
                render={
                  ({ field: { onChange, value } }) => (
                    <PhoneInput
                      id="phone"
                      error={!!errors.phone}
                      errorMessage={errors.phone?.message}
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
        error={!!errors.terms}
        {...register('terms', { required: true })}
      >
        <span>
          I agree to the <a href="" className='underline'>terms and conditions</a> and <a href="" className='underline'>privacy policy</a>.
        </span>
      </Checkbox>

      <div className='text-center md:text-left'>
        <button className={`btn-primary w-[210px] mt-8 bottom-[-40px]`} type='submit'>
          NEXT
        </button>
      </div>
    </form>
  )
}

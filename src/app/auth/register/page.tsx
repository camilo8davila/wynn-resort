import { getCountries, getGenders } from '@/actions';
import { GridAuth, SelectOption, Title } from '@/components';
import { Metadata } from 'next';

import { RegisterForm } from './ui/RegisterForm';
import { bigCaslo } from '@/config/fonts';
import { isActionError } from '@/utils/errot';

export const metadata: Metadata = {
  title: "Register 1/3",
  description: "Luxury hotel in Dubai",
};

export default async function RegisterPage() {
  const promiseCountries = getCountries();
  const promiseGenders = getGenders();
  let countries: SelectOption[] = [];
  let genders: SelectOption[] = [];

  const [countriesResponse, gendersResponse] = await Promise.all([
    promiseCountries,
    promiseGenders
  ])

  if (isActionError(countriesResponse) || isActionError(gendersResponse)) {
    return (
      <h3>Error en el servicio</h3>
    )
  }

  if (countriesResponse && 'data' in countriesResponse) {
    countries = countriesResponse.data;
  }

  if (gendersResponse && 'data' in gendersResponse) {
    genders = gendersResponse.data;
  }

  return (
    <GridAuth>
      <div className="w-full justify-between block sm:flex ">
        <Title title="Registration" subtitle="Please enter below information to create your account." className="mb-8 sm:mb-10" />

        <p className={`${bigCaslo.className} text-2xl font-caslo text-center mb-8 sm:mb-0`}>Step 1 of 3</p>
      </div>

      <RegisterForm countries={countries} genders={genders} />
    </GridAuth>
  );
}
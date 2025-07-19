'use server';

export const getCountries = async () => {
  const data = await fetch(`${'http://localhost:8082'}/miscelanium/countries`, {
    method: 'GET',
    cache: 'force-cache'
  });
  const countries = data.json();
  return countries;
}
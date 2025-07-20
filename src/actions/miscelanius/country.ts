'use server';

const url = process.env.URL_ENDPOINT;

export const getCountries = async () => {
  const data = await fetch(`${url}/miscelanium/countries`, {
    method: 'GET',
    cache: 'force-cache'
  });
  const countries = data.json();
  return countries;
}

export const subscribeNewsLetter = async (email: string) => {
  const data = await fetch(`${url}/miscelanium/subscribe-newsletter`, {
    method: 'POST',
    body: email,
    cache: 'no-cache'
  });
  const response = data.json();
  return response;
}
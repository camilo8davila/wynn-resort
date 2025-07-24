'use client';
import { ChangeEvent, useEffect, useId, useState } from 'react';

import './phone-input.css';
import clsx from 'clsx';
import { OptionCountry } from '../option-country/OptionCountry';
import { SelectOption } from '../select/Option';
import { IoCheckmarkOutline, IoChevronDownSharp, IoSearchOutline } from 'react-icons/io5';

interface State {
  country: string;
  number: string;
  indicator: string;
}

interface Props {
  id: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  containerClassName?: string;
  initValue: State;
  optionCountries: SelectOption[];
  onChange: (state: State) => void;
}

const DEFAULT_COUNTRY = {
  value: 'ae',
  label: 'UAE',
  extra: '+971'
}

export const PhoneInput = ({
  placeholder = '(___) - ____',
  helperText,
  error,
  errorMessage,
  containerClassName,
  id,
  optionCountries,
  initValue,
  onChange,
  ...props
}: Props) => {
  const uniqueId = useId();
  const inputId = id || `custom-input-${uniqueId}`;

  const [inputValue, setInputValue] = useState<string>('');
  const [countryChose, setCountryChose] = useState<SelectOption | null>();
  const [inputSearch, setInputSearch] = useState('');
  const [debouncedInputSearch, debouncedSetInputSearch] = useState('');
  const [filterCountriesList, setFilterCountriesList] = useState<SelectOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFilterCountriesList(optionCountries);
    const country = searchCountryById(initValue?.country || DEFAULT_COUNTRY.value);
    if (initValue.number) {
      setInputValue(initValue.number);
      onChangeElement(initValue.number, country!);
    };
  }, []);

  const onClickCountry = (country: SelectOption) => {
    setCountryChose(country);
    onChangeElement(inputValue, country);
    setIsOpen(false);
    resetStateWhenListIsClose()
  }

  const onChangeElement = (number: string, country: SelectOption) => {
    if (number && country) {
      onChange({ country: country.value as string, number, indicator: country.extra! })
    }
  }

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (isNaN(event.target.value as any)) return;
    setInputValue(event.target.value);
    onChangeElement(event.target.value, countryChose!);
  }

  const searchCountryById = (id: string): SelectOption | undefined => {
    const country = optionCountries.find(country => country.value === id);
    setCountryChose(country);
    return country;
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      debouncedSetInputSearch(inputSearch);
    }, 1000);

    return () => {
      clearTimeout(handler);
    }
  }, [inputSearch]);

  useEffect(() => {
    if (debouncedInputSearch) {
      console.log('Performing search for:', debouncedInputSearch);
      const countriesFinded = optionCountries.filter(country => country.label.toLowerCase().includes(debouncedInputSearch));
      setFilterCountriesList(countriesFinded);
    }
  }, [debouncedInputSearch]);


  const onInputSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value.toLowerCase();
    setInputSearch(value);
  }

  const resetStateWhenListIsClose = () => {
    setFilterCountriesList(optionCountries);
    setInputSearch('');
  }

  return (
    <>
      <div className={clsx(
        "custom-phone-container",
        {
          "border-error": error,
          "border-border-gray": !error
        }
      )}>
        <div role='select' onClick={() => setIsOpen(value => !value)} className="w-[100px] h-full flex items-center justify-between cursor-pointer">
          <div className='flex items-center gap-2'>
            <span className={`fi fi-${countryChose?.value} text-2xl`}></span>
            <IoChevronDownSharp width={10} height={5} />
          </div>
          <p>{countryChose?.extra}</p>
        </div>
        <div className="ml-2.5">
          <input
            id={inputId}
            type="text"
            className="custom-input-phone"
            placeholder={placeholder}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
            value={inputValue}
            onChange={(e) => onChangeInput(e)}
          />
        </div>
        {
          isOpen && (
            <div className="panel-container overflow-x-scroll">
              <div className='py-3 px-3.5 border-b-2 border-b-border-gray flex items-center gap-1' >
                <IoSearchOutline width={20} height={20} />
                <input
                  type="text"
                  className='w-full h-full outline-none'
                  placeholder='Search...'
                  value={inputSearch}
                  onChange={onInputSearchChange}
                />
              </div>
              {
                filterCountriesList.map(country => (
                  <div
                    key={country.value}
                    className={clsx(
                      "item py-3 px-3.5 flex items-center justify-between cursor-pointer",
                      {
                        "bg-[#F9FAFB]": countryChose?.value === country.value
                      }
                    )}
                    onClick={() => onClickCountry(country)}
                    role='option'
                  >
                    <OptionCountry shortCountry={country.value as string} label={country.label} />
                    {
                      countryChose?.value === country.value && (
                        <IoCheckmarkOutline width={20} height={20} className='text-[#7F56D9]' />
                      )
                    }
                  </div>
                ))
              }
            </div>
          )
        }

      </div>
      {/* Help or error Text */}
      {error && errorMessage && (
        <p id={`${id}-error`} className="helper-text custom-input-error-message error-input relative mb-2">
          {errorMessage}
        </p>
      )}
    </>
  )
}

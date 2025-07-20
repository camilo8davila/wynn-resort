'use client';
import { ReactElement, useEffect, useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';

import { PropsOption, SelectOption } from './Option';
import './select.css';
import clsx from 'clsx';

interface Props {
  id?: string;
  options: SelectOption[];
  placeholder?: string;
  initialValue: string | number | null;
  error: boolean,
  errorMessage?: string;
  onChange?: (args: string | number) => void;
  optionToRender: (option: PropsOption) => ReactElement<PropsOption>;
  selectedValueRender?: (option: SelectOption) => ReactElement<SelectOption>;
}

export const Select = ({
  id,
  options,
  placeholder,
  initialValue,
  error,
  selectedValueRender,
  optionToRender,
  onChange
}: Props) => {
  const [value, setValue] = useState<string | number | null>(initialValue || null);
  const [optionChose, setOptionChose] = useState<SelectOption | null>(null);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setValue(initialValue);
    getOptionByValue(initialValue);
  }, []);

  const onClick = (itemSelected: SelectOption) => {
    setValue(itemSelected.value);
    setOpen(false);
    getOptionByValue(itemSelected.value);
    onChange && onChange(itemSelected.value);
  }

  const getOptionByValue = (value: string | number | null) => {
    if (!value) return;
    const optionSelected = options.find(option => option.value === value);
    setOptionChose(optionSelected!);
  }


  return (
    <div
      className={
        clsx(
          "custom-select-container",
          {
            "border-error": error,
            "border-border-gray": !error
          }
        )
    }>
      <IoChevronDownOutline width={10} height={5.5} className='absolute right-4 top-5 text-[#0A0B0D]' />
      <div 
        id={id}
        role='select'
        className='w-full h-full px-[18px] py-5'
        onClick={() => setOpen(isOpen => !isOpen)}
      >
        {
          placeholder && !value && (
            <p className='placeholder'>{placeholder}</p>
          )
        }
        {
          value && (
            <>
              {
                selectedValueRender && optionChose ? (
                  selectedValueRender(optionChose)
                ) : (
                  <p className='informative'>
                    {value}
                  </p>
                )
              }
            </>
          )
        }
      </div>

      {
        isOpen && (
          <div className='panel-container overflow-x-scroll'>
            {
              options.map((option) => (
                optionToRender({ ...option, onClick: () => onClick(option), selected: option.value === value, key: option.value })
              ))
            }
          </div>
        )
      }
    </div>
  )
}

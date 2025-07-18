'use client';
import { ReactElement, useEffect, useState } from 'react';

import { PropsOption, SelectOption } from './Option';
import './select.css';

interface Props {
  options: SelectOption[];
  placeholder?: string;
  initialValue: string | number | null;
  onChange?: (args: string | number) => void;
  optionToRender: (option: PropsOption) => ReactElement<PropsOption>;
  selectedValueRender?: (option: SelectOption) => ReactElement<SelectOption>;
}

export const Select = ({
  options,
  placeholder,
  initialValue,
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
    <div className="custom-select-container">
      <div className='w-full h-full px-[18px] py-5' onClick={() => setOpen(isOpen => !isOpen)}>
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

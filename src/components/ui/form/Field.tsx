'use client'
import { HTMLAttributes } from 'react';
import { Controller } from 'react-hook-form';

import { Input, Label, PhoneInput, Tooltip } from '../../';

interface Props {
  className?: HTMLAttributes<HTMLLegendElement> | string;
  children: React.ReactElement[];
}

export const Field = ({ children, className }: Props) => {
  let labelComponent = null;
  let tooltipComponent = null;
  let inputComponent = null;
  let controllerComponent = null;
  let phoneInputComponent = null;

  children.forEach((child) => {
    if (child.type === Label) {
      labelComponent = child
    }

    if (child.type === Tooltip) {
      tooltipComponent = child
    }

    if (child.type === Input) {
      inputComponent = child
    }

    if (child.type === Controller) {
      controllerComponent = child
    }

    if (child.type === PhoneInput) {
      phoneInputComponent = child
    }
  })

  return (
    <div className={`${className} w-full`}>
      <div className='flex items-center justify-between mb-1.5'>
        {
          labelComponent && (
            labelComponent
          )
        }
        {
          tooltipComponent && (
            tooltipComponent
          )
        }
      </div>

      {inputComponent && inputComponent}
      {controllerComponent && controllerComponent}
      {phoneInputComponent && phoneInputComponent}
    </div>
  )
}

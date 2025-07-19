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
  let other = null;

  children.forEach((child) => {
    if (child.type === Label) {
      labelComponent = child
      return;
    }

    if (child.type === Tooltip) {
      tooltipComponent = child;
      return
    }

    if (child.type === Input) {
      inputComponent = child;
      return
    }

    if (child.type === Controller) {
      controllerComponent = child;
      return
    }

    if (child.type === PhoneInput) {
      phoneInputComponent = child;
      return
    }

    other = child
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
      {other && other}
    </div>
  )
}

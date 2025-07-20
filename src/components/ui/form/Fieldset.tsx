import { bigCaslo } from '@/config/fonts';
import { HTMLAttributes } from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLLegendElement> | string;
}

export const Fieldset = ({ children, title, className }: Props) => {
  return (
    <fieldset className={`${className ? className : ''}`}>
      <legend 
        className={
          `${bigCaslo.className} font-thin text-[22px] pb-2 border-b-black border-b-[1px] relative mb-5 after:content-[''] after:absolute after:border-b-[1px] after:w-16 after:bottom-[-0.5px]`
        }>
          {title}
        </legend>
      {children}
    </fieldset>
  )
}

import { LabelHTMLAttributes, ReactElement } from 'react'

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactElement | string
}

export const Label = ({ children, className, ...rest }: Props) => {
  return (
    <label className={`${className} font-caslo text-sm`} {...rest}>
      {children}
    </label>
  )
}

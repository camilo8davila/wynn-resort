import { HTMLAttributes } from "react";

interface Props {
  items: string[],
  className?: HTMLAttributes<HTMLLegendElement> | string;
}

export const List = ({ items, className = '' }: Props) => {
  return (
    <ul className={`${className}`}>
      {
        items.map((item) => (
          <li key={item} className="mb-3 text-xs">{item}</li>
        ))
      }
    </ul>
  )
}
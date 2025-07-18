import clsx from 'clsx';
import { IoCheckmarkOutline } from 'react-icons/io5';

export interface SelectOption {
  value: string | number;
  label: string;
  extra?: string;
  disabled?: boolean;
}

export interface PropsOption extends SelectOption {
  selected?: boolean;
  onClick: (item: SelectOption) => void;
  key: string | number;
  children?: React.ReactNode
}

export const Option = ({ onClick, selected, children, ...item }: PropsOption) => {
  return (
    <div
      className={clsx(
        "item py-3 px-3.5 flex items-center justify-between",
        {
          "bg-[#F9FAFB]": selected
        }
      )}
      onClick={() => onClick(item)}
    >
      {children}
      {
        selected && (
          <IoCheckmarkOutline width={20} height={20} className='text-[#7F56D9]' />
        )
      }
    </div>
  )
}

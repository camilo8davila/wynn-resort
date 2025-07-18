interface Props {
  shortCountry: string;
  label: string;
}

export const OptionCountry = ({ shortCountry, label }: Props) => {
  return (
    <div className='flex items-center gap-3'>
      <span className={`fi fi-${shortCountry} text-2xl`}></span> <p>{label}</p>
    </div>
  )
}

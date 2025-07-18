interface Props {
  name: string;
  items: { value: string, label: string }[];
  value: string | null;
  onChange: (value: string) => void
}

export const RadioGroup = ({ name, items, value, onChange }: Props) => {
  return (
    <div className="flex items-center justify-center gap-25">
      {
        items.map(item => (
          <div key={item.value} className="flex items-center gap-3">
            <input
              className="appearance-none w-4 h-4 bg-white rounded-full border-white outline checked:bg-secondary"
              name={name}
              type="radio"
              value={item.value}
              id={name + item.value}
              checked={value === item.value}
              onChange={e => onChange(e.target.value)}
            /> <label className="font-semibold text-base text-[#000000]" htmlFor={name + item.value}>{item.label}</label>
          </div>
        ))
      }
    </div>
  )
}

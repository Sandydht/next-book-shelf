interface ComponentProps {
  id: string;
  name: string;
  label: string;
  isChecked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({ id, name, label, isChecked, onChange }: ComponentProps) {
  return (
    <label htmlFor={id} className="w-full h-auto flex items-center justify-start gap-[8px]">
      <input
        id={id}
        name={name}
        type="checkbox"
        className="cursor-pointer"
        checked={isChecked}
        onChange={onChange}
      />
      <span className="text-left text-[14px] leading-[20px] text-black font-semibold">
        {label}
      </span>
    </label>
  )
}
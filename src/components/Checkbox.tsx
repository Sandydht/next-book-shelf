interface ComponentProps {
  label: string;
}

export default function Checkbox({ label }: ComponentProps) {
  return (
    <label className="w-full h-auto flex items-center justify-start gap-[8px]">
      <input
        type="checkbox"
        className="cursor-pointer"
      />
      <span className="text-left text-[14px] leading-[20px] text-black font-semibold">
        {label}
      </span>
    </label>
  )
}
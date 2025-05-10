import React from "react";

interface ComponentProps {
  id?: string;
  name?: string;
  label: string;
  value?: string | number;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ id, name, label, value, placeholder, onChange }: ComponentProps) {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start">
      <label htmlFor={id} className="text-left text-[14px] leading-[20px] text-black font-semibold">
        {label}
      </label>
      <input 
        id={id}
        name={name}
        type="text"
        className="w-full h-auto px-[20px] py-[10px] border-[1px] border-gray-400 rounded-[8px] text-left text-[12px] leading-[16px] text-black"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}
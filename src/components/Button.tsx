import React from "react";

interface ComponentProps {
  type?: 'primary' | 'green' | 'danger' | 'outline-primary';
  htmlType: 'button' | 'submit';
  label: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ type = 'primary', htmlType, label, disabled, isLoading, onClick }: ComponentProps) {
  if (isLoading) {
    return (
      <button
        type="button"
        disabled
        className="w-full h-auto px-[20px] py-[10px] rounded-[8px] cursor-not-allowed bg-gray-400 text-center text-[14px] leading-[20px] text-white font-semibold"
      >
        Loading...
      </button>
    )
  }

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className="w-full h-auto px-[20px] py-[10px] rounded-[8px] cursor-not-allowed bg-gray-400 text-center text-[14px] leading-[20px] text-white font-semibold"
      >
        {label}
      </button>
    )
  }

  if (type == 'green') {
    return (
      <button
        type={htmlType}
        disabled={disabled}
        onClick={onClick}
        className="w-full h-auto px-[20px] py-[10px] rounded-[8px] cursor-pointer bg-green-500 transition-all hover:bg-green-600 text-center text-[14px] leading-[20px] text-white font-semibold"
      >
        {label}
      </button>
    )
  }

  if (type == 'outline-primary') {
    return (
      <button
        type={htmlType}
        disabled={disabled}
        onClick={onClick}
        className="w-full h-auto px-[20px] py-[10px] rounded-[8px] cursor-pointer border-[1px] border-blue-500 bg-white transition-all hover:bg-gray-50 text-center text-[14px] leading-[20px] text-blue-500 font-semibold"
      >
        {label}
      </button>
    )
  }

  return (
    <button
      type={htmlType}
      disabled={disabled}
      onClick={onClick}
      className="w-full h-auto px-[20px] py-[10px] rounded-[8px] cursor-pointer bg-blue-500 transition-all hover:bg-blue-600 text-center text-[14px] leading-[20px] text-white font-semibold"
    >
      {label}
    </button>
  )
}
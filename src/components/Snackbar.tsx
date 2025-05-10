interface ComponentProps {
  type: 'success' | 'error';
  message: string;
}

export default function Snackbar({ type = 'success', message }: ComponentProps) {
  if (type == 'error') {
    return (
      <div className="w-full h-auto fixed top-[25px] left-[50%] max-w-[500px] -translate-[50%] z-50 px-[10px] py-[5px] bg-red-100 rounded-[6px] border-[1px] border-red-500">
        <p className="text-left text-[14px] leading-[20px] text-red-500 font-semibold">
          {message}
        </p>
      </div>
    )
  }

  return (
    <div className="w-full h-auto fixed top-[25px] left-[50%] max-w-[500px] -translate-[50%] z-50 px-[10px] py-[5px] bg-green-100 rounded-[6px] border-[1px] border-green-500">
      <p className="text-left text-[14px] leading-[20px] text-green-500 font-semibold">
        {message}
      </p>
    </div>
  )
}
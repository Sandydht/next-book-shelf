import Button from "./Button";

interface ComponentProps {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModalBox({ title, description, onCancel, onConfirm }: ComponentProps) {
  return (
    <div className="w-full h-full fixed top-0 left-0 right-0 bottom-0 z-50">
      <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
      <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center p-[25px]">
        <div className="w-full h-auto max-w-[500px] bg-white rounded-[8px] p-[25px] flex flex-col items-start justify-start gap-[24px]">
          <div className="w-full h-auto flex flex-col items-start justify-start gap-[8px]">
            <div className="w-full h-auto">
              <p className="text-left text-[22px] leading-[28px] text-black font-semibold">
                {title}
              </p>
            </div>
            <div className="w-full h-auto">
              <p className="text-left text-[14px] leading-[20px] text-black font-semibold">
                {description}
              </p>
            </div>
          </div>
          <div className="w-full h-auto flex items-center justify-between gap-[25px]">
            <Button
              type="outline-primary"
              htmlType="button"
              label="No"
              onClick={onCancel}
            />
            <Button
              type="primary"
              htmlType="button"
              label="Yes"
              onClick={onConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
import type { UseFormRegisterReturn } from "react-hook-form";

type InputFieldOTPProps = {
  length?: number;
  onChange?: (value: string) => void;
  registration?: UseFormRegisterReturn;
};

export default function InputFieldOtp({
  length = 6,
  registration,
}: InputFieldOTPProps) {
  return (
    <div className="relative">
      <input
        type="text"
        inputMode="numeric"
        onChange={(e) => {
          let val = e.target.value.replace(/\D/g, "");
          if (val.length > length) val = val.slice(0, length);

          registration?.onChange(e);
        }}
        maxLength={length}
        className="w-full tracking-[0.8em] text-center text-lg font-medium py-3 rounded-xl border border-yellow-500 shadow-[0_0_0_2px_rgba(250,204,21,0.3)] text-yellow-500"
        {...registration}
        autoComplete="off"
      />
    </div>
  );
}

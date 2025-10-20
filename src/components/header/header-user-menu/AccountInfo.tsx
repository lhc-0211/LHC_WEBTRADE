import { IoClose } from "react-icons/io5";

export default function AccountInfo() {
  return (
    <div className="h-[calc(var(--app-height)-57px)] w-[440px] bg-sidebar-default">
      <div className="p-[20px] flex flex-row items-center justify-between text-[18px] font-semibold border-b border-border w-full">
        <h1 className="">Cài đặt tài khoản</h1>
        <IoClose className="text-text-title h-4 min-w-4" />
      </div>
    </div>
  );
}

import { RiEdit2Fill } from "react-icons/ri";
import { usePerfectScrollbar } from "../../../../hooks/usePerfectScrollbar.ts";
import { useAppSelector } from "../../../../store/hook";
import { selectAccountProfileStatus } from "../../../../store/slices/client/selector";
import type { AccountProfile } from "../../../../types/client";
import AccountInfoSkeleton from "./AccountInfoSkeleton";

export default function AccountInfo({
  accountProfile,
  handleOpenModalChangeAccountInfo,
}: {
  accountProfile: AccountProfile | null;
  handleOpenModalChangeAccountInfo: (type: "email" | "address") => void;
}) {
  const { containerRef } = usePerfectScrollbar();

  const { loading } = useAppSelector(selectAccountProfileStatus);

  return (
    <div
      ref={containerRef}
      className="h-[calc(var(--app-height)-377px)] w-[360px] bg-sidebar-default overflow-hidden relative"
    >
      {" "}
      {loading ? (
        <AccountInfoSkeleton />
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-between text-sm font-medium h-9 bg-gray-300 text-text-body px-[20px]">
            Thông tin cá nhân
          </div>
          <div className="grid grid-rows-1 gap-4 px-[20px] pt-[16px] pb-[32px]">
            <div className="text-text-subtitle text-xs font-medium flex flex-col">
              Tên pháp lý
              <span className="text-text-title text-sm uppercase">
                {accountProfile?.cCustomerName}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-text-subtitle text-xs font-medium flex flex-col">
                Giới tính
                <span className="text-sm font-medium text-text-title">
                  {accountProfile?.cCustGender === "M" ? "Nam" : "Nữ"}
                </span>
              </div>
              <div className="text-text-subtitle text-xs font-medium flex flex-col">
                Ngày sinh
                <span className="text-sm font-medium text-text-title">
                  {accountProfile?.cCustBirthDay}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-text-subtitle text-xs font-medium flex flex-col">
                Số CCCD
                <span className="text-sm font-medium text-text-title">
                  {accountProfile?.cCardId}
                </span>
              </div>
              <div className="text-text-subtitle text-xs font-medium flex flex-col">
                Ngày cấp
                <span className="text-sm font-medium text-text-title">
                  {accountProfile?.cIdIssueDate}
                </span>
              </div>
            </div>
            <div className="text-text-subtitle text-xs font-medium flex flex-col">
              Nơi cấp
              <span className="text-text-title text-sm ">
                {accountProfile?.cIssuePlaceName}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between text-sm font-medium h-9 bg-gray-300 text-text-body px-[20px]">
            Thông tin liên hệ
          </div>
          <div className="grid grid-rows-1 gap-4 px-[20px] pt-[16px] pb-[32px]">
            <div className="text-text-subtitle text-xs font-medium flex flex-col">
              Số điện thoại
              <span className="text-text-title text-sm uppercase">
                {accountProfile?.cCustMobile}
              </span>
            </div>

            {/* Sửa email */}
            <div className="w-full flex flex-row items-center justify-between">
              <div className="text-text-subtitle text-xs font-medium flex flex-col">
                Email
                <span className="text-text-title text-sm ">
                  {accountProfile?.cCustEmail}
                </span>
              </div>
              <div
                className="cursor-pointer p-1 hover:bg-gray-300 rounded-full"
                onClick={() => handleOpenModalChangeAccountInfo("email")}
              >
                <RiEdit2Fill className="w-4 h-4 min-w-4" />
              </div>
            </div>

            {/* Sửa địa chỉ liên hệ */}
            <div className="w-full flex flex-row items-center justify-between">
              <div className="text-text-subtitle text-xs font-medium flex flex-col">
                Địa chỉ liên hệ
                <span className="text-text-title text-sm ">
                  {accountProfile?.cContactAddress}
                </span>
              </div>
              <div
                className="cursor-pointer p-1 hover:bg-gray-300 rounded-full"
                onClick={() => handleOpenModalChangeAccountInfo("address")}
              >
                <RiEdit2Fill className="w-4 h-4 min-w-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

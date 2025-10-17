import { useState } from "react";

import { Tooltip } from "react-tooltip";
import LoginModal from "../components/auth/LoginModal";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import { useAppSelector } from "../store/hook";
import { selectToken } from "../store/slices/auth/selector";
import type { SidebarMode } from "../types/layout";
import { isEmptyObject } from "../utils";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAppSelector(selectToken);

  const [sidebarMode, setSidebarMode] = useState<SidebarMode>(
    (localStorage.getItem("sidebarMode") as SidebarMode) || "full"
  );

  const getSidebarWidth = () => {
    switch (sidebarMode) {
      case "full":
        return 180;
      case "mini":
        return 68;

      default:
        return 0;
    }
  };

  const handleChangeModeSidebar = (mode: SidebarMode) => {
    setSidebarMode(mode);
    localStorage.setItem("sidebarMode", mode);
  };

  return (
    <div
      className="grid h-[calc(var(--app-height))] overflow-hidden bg-background-primary text-text-body"
      style={{ gridTemplateColumns: `${getSidebarWidth()}px auto` }}
    >
      {!isEmptyObject(token) ? (
        <Sidebar
          mode={sidebarMode}
          width={sidebarMode === "mini" ? 68 : sidebarMode === "full" ? 180 : 0}
          changeModeSidebar={handleChangeModeSidebar}
        />
      ) : (
        <div></div>
      )}

      <div className="flex flex-col gap-1 h-full px-5">
        <div className="h-[60px] w-full">
          <Header />
        </div>

        <main className="h-[calc(var(--app-height)-60px)]">{children}</main>

        {/* Modal đăng nhập  */}
        <LoginModal />
      </div>

      <Tooltip
        id="global-tooltip"
        className="!bg-gray-800 !text-white !text-[10px] lg:!text-xs !px-2 !py-1 !rounded"
      />
    </div>
  );
}

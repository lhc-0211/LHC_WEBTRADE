import { useEffect, useState } from "react";
import LoginModal from "../components/auth/loginModal";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import { useAppSelector } from "../store/hook";
import { selectToken } from "../store/slices/auth/selector";
import type { SidebarMode } from "../types/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAppSelector(selectToken);

  const [sidebarMode, setSidebarMode] = useState<SidebarMode>(
    (localStorage.getItem("sidebarMode") as SidebarMode) || "full"
  );

  // Không có token => chuyển sidebar về hidden
  useEffect(() => {
    if (!token || Object.keys(token).length === 0) {
      setSidebarMode("hidden");
    } else {
      //Trước đó từng lưu sidebar mode thì giữ lại
      const savedMode =
        (localStorage.getItem("sidebarMode") as SidebarMode) || "full";
      setSidebarMode(savedMode);
    }
  }, [token]);

  const getSidebarWidth = () => {
    switch (sidebarMode) {
      case "full":
        return 180;
      case "mini":
        return 68;
      default:
        return 0; // hidden
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
      <Sidebar
        mode={sidebarMode}
        width={getSidebarWidth()}
        changeModeSidebar={handleChangeModeSidebar}
      />
      <div className="flex flex-col gap-1 h-full px-5">
        <div className="h-[60px] w-full">
          <Header />
        </div>

        <main className="h-[calc(var(--app-height)-60px)]">{children}</main>

        {/* Modal đăng nhập */}
        <LoginModal />
      </div>
    </div>
  );
}

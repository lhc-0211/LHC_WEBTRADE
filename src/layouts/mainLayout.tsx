import { useState } from "react";
import LoginModal from "../components/auth/loginModal";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import { useViewportSize } from "../hooks/useViewportSize";
import type { SidebarMode } from "../types/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const { width, height } = useViewportSize(60, getSidebarWidth());

  return (
    <div className="flex flex-row h-screen bg-background-primary text-text-body">
      <Sidebar
        mode={sidebarMode}
        width={sidebarMode === "mini" ? 68 : sidebarMode === "full" ? 180 : 0}
        changeModeSidebar={handleChangeModeSidebar}
      />
      <div
        className="flex flex-col gap-1 h-full px-5"
        style={{
          width,
        }}
      >
        <div className="h-[60px] w-full">
          <Header />
        </div>

        <main
          style={{
            height,
          }}
        >
          {children}
        </main>

        {/* Modal đăng nhập  */}
        <LoginModal />
      </div>
    </div>
  );
}

import { useState } from "react";
import Sidebar from "../components/sidebar/sidebar";
import { useViewportSize } from "../hooks/useViewportSize";
import type { SidebarMode } from "../types/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("full");

  const getSidebarWidth = () => {
    switch (sidebarMode) {
      case "full":
        return 240;
      case "mini":
        return 80;

      default:
        return 0;
    }
  };

  const handleChangeModeSidebar = (mode: SidebarMode) => {
    setSidebarMode(mode);
  };

  const { width, height } = useViewportSize(60 + 30, getSidebarWidth());

  return (
    <div className="flex flex-col h-screen">
      <div className="h-[60px] w-full">Header</div>

      <div className="flex flex-row gap-1">
        <Sidebar
          mode={sidebarMode}
          width={sidebarMode === "mini" ? 80 : sidebarMode === "full" ? 240 : 0}
          changeModeSidebar={handleChangeModeSidebar}
        />

        <main
          style={{
            width,
            height,
          }}
        >
          {children}
        </main>
      </div>

      <div className="h-[30px] w-full">Footer</div>
    </div>
  );
}

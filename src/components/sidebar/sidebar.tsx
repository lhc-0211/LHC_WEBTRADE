import {
  VscLayoutActivitybarRight,
  VscLayoutSidebarRight,
  VscLayoutSidebarRightOff,
} from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import packageJson from "../../../package.json";
import { SIDE_BAR_GROUPS } from "../../configs/sidebar";
import type { SidebarItem, SidebarMode } from "../../types";

interface Props {
  mode: string;
  width: number;
  changeModeSidebar: (mode: SidebarMode) => void;
}

export default function Sidebar(props: Props) {
  const { mode, width, changeModeSidebar } = props;

  const location = useLocation();

  const handleClick = (item: SidebarItem) => {
    if (item.requiresLogin) {
      // setShowLoginModal(true);
      alert("Chức năng cần đăng nhập");
    } else {
      // item.action();
    }
  };

  return (
    <div className="relative h-full">
      {mode !== "hidden" && (
        <aside
          className="flex flex-col gap-4 items-center h-full bg-sidebar-default text-text-body relative"
          style={{
            width,
          }}
        >
          <div className="h-9 mb-2 grid place-items-center pt-2">
            {mode === "full" ? (
              <img src="/src/assets/imgs/logo.png" alt="logo" />
            ) : (
              <img src="/src/assets/imgs/logo-short.png" alt="logo" />
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            {SIDE_BAR_GROUPS.map((group, gIdx) => (
              <div key={group.id}>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      className={`sidebar-item group py-2 w-full items-center px-2 cursor-pointer border-l-[2px] border-transparent ${
                        isActive
                          ? "sidebar-active border-yellow-500"
                          : "hover:border-yellow-500"
                      } ${
                        mode === "mini"
                          ? "grid place-items-center"
                          : "grid grid-cols-[32px_auto]"
                      }`}
                      onClick={() => handleClick(item)}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isActive
                            ? "sidebar-item__active"
                            : "sidebar-item__normal group-hover:sidebar-item__active"
                        }`}
                      />
                      {mode === "full" && (
                        <span
                          className={`text-sm group-hover:text-text-title ${
                            isActive ? "text-text-title" : "text-text-subtitle"
                          }`}
                        >
                          {item.title}
                        </span>
                      )}
                    </div>
                  );
                })}

                {/* Divider giữa các group, trừ group cuối */}
                {gIdx < SIDE_BAR_GROUPS.length - 1 && (
                  <div className="grid place-items-center w-full my-2 px-3">
                    <div className="border-t border-border-light my-2 w-full" />
                  </div>
                )}
              </div>
            ))}
          </div>{" "}
          <div
            className={`text-xs text-text-subtitle flex gap-2 items-center justify-center w-full mt-auto pb-2 ${
              mode === "mini" ? "flex-col" : "flex-row"
            }`}
          >
            <span className="flex flex-row items-center gap-1">
              <div className="bg-gray-200 w-2 h-2 rounded-full" />
              {mode === "full" && <span>Disconnect</span>}
            </span>
            <span>v.{packageJson.version}</span>
          </div>
        </aside>
      )}
      <div
        className={`size-[30px] border-2 border-yellow-100 bg-gray-300 rounded-full grid place-items-center absolute cursor-pointer ${
          mode === "hidden" ? "bottom-10 -right-11" : "bottom-10 -right-4"
        }`}
      >
        {mode === "full" ? (
          <VscLayoutActivitybarRight
            className="text-lg text-yellow-500 "
            onClick={() => changeModeSidebar("mini")}
          />
        ) : mode === "mini" ? (
          <VscLayoutSidebarRightOff
            className="text-lg text-yellow-500 "
            onClick={() => changeModeSidebar("hidden")}
          />
        ) : (
          <VscLayoutSidebarRight
            className="text-lg text-yellow-500 "
            onClick={() => changeModeSidebar("full")}
          />
        )}
      </div>{" "}
    </div>
  );
}

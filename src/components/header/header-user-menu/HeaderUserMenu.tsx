import { useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import ava from "../../../assets/imgs/ava.png";
import LoginIcon from "../../../assets/imgs/icons/login.svg?react";
import { useAnimationDelay } from "../../../hooks/useAnimationDelay";
import { useAppDispatch } from "../../../store/hook";
import { openLoginModal } from "../../../store/slices/client/slice";
import type { Token } from "../../../types";
import { formatAccount, isEmptyObject } from "../../../utils";
import Button from "../../Button";

export default function HeaderUserMenu({ token }: { token: Token }) {
  const dispatch = useAppDispatch();

  const { isVisible, isAnimating, toggle, close } = useAnimationDelay(200);

  const refUserMenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlerCloseMenu = (e: MouseEvent) => {
      if (
        refUserMenu.current &&
        !refUserMenu.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handlerCloseMenu);
    return () => {
      document.removeEventListener("mousedown", handlerCloseMenu);
    };
  }, [close]);

  const handleClickLogin = () => {
    dispatch(openLoginModal());
  };

  return (
    <>
      <div
        className={`flex flex-row gap-2 items-center relative ${
          !isEmptyObject(token) ? "bg-button-gray rounded-xl" : ""
        }`}
      >
        {!isEmptyObject(token) ? (
          <>
            {" "}
            <Button
              onClick={() => alert("Primary")}
              variant="close"
              className="!p-2 !h-9"
            >
              <FaBell />
            </Button>
            <div className="h-[11px] w-[1.5px] bg-DTND-300 rounded-xl"></div>
            <div
              className="px-1 flex flex-row gap-2 items-center cursor-pointer"
              onClick={toggle}
            >
              <img src={ava} alt="ava-imgs" className="w-9 h-9 rounded-full" />
              <div className="py-1 flex flex-col gap-1">
                <span className="text-xs font-normal text-text-body">
                  {token?.C_ACCOUNT_NAME}
                </span>
                <span className="text-[10px] font-normal text-text-subtitle">
                  {token?.C_ACCOUNT_CODE &&
                    formatAccount(token?.C_ACCOUNT_CODE)}
                </span>
              </div>

              <HiDotsHorizontal
                className="text-icon-medium text-lg"
                id="global-tooltip"
                data-tooltip-id="global-tooltip"
                data-tooltip-content="Thông tin tài khoản"
                data-tooltip-place="left"
              />
            </div>
          </>
        ) : (
          <>
            <Button onClick={() => handleClickLogin()} variant="primary">
              <LoginIcon />
              Đăng nhập
            </Button>
          </>
        )}

        {isVisible && (
          <div
            className={`absolute rounded-xl top-12 right-0 w-[340px] h-[400px] bg-sidebar-default z-50 
                ${
                  isAnimating
                    ? "animate-fadeInFromTopRight"
                    : "animate-fadeOutToTopRight"
                }`}
            ref={refUserMenu}
          ></div>
        )}
      </div>
    </>
  );
}

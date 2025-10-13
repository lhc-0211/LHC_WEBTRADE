import { FaBell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import ava from "../../assets/imgs/ava.png";
import LoginIcon from "../../assets/imgs/icons/login.svg?react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { selectToken } from "../../store/slices/auth/selector";
import { openLoginModal } from "../../store/slices/client/slice";
import { isEmptyObject } from "../../utils";
import Button from "../Button";
import InputFieldSearchMaster from "../inputs/inputFieldSearchMaster";

export default function Header() {
  const dispatch = useAppDispatch();

  const token = useAppSelector(selectToken);

  const handleClickLogin = () => {
    dispatch(openLoginModal());
  };

  return (
    <div className="flex items-center justify-between h-full w-full">
      <div className="flex flex-row gap-2">
        {isEmptyObject(token) && (
          <img src="/src/assets/imgs/logo.png" alt="logo" />
        )}
        {/* <Button onClick={() => alert("Primary")} variant="close">
          <RechargeIcon />
          Nạp tiền
        </Button>
        <Button onClick={() => alert("Secondary")} variant="close">
          <AssetsIcon />
          Tài sản
        </Button> */}
      </div>

      <div className="flex flex-row gap-4 items-center">
        {/* <Button onClick={() => alert("Primary")} variant="success">
          <OrderIcon />
          Đặt lệnh nhanh
        </Button> */}

        <InputFieldSearchMaster
          className="w-[150px] h-9"
          placeholder="Tìm kiếm"
        />

        <div
          className={`flex flex-row gap-2 items-center ${
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
              <div className="py-1 px-2 flex flex-row gap-2 items-center">
                <img
                  src={ava}
                  alt="ava-imgs"
                  className="w-4 h-4 rounded-full"
                />
                <span className="text-xs font-normal text-text-body">
                  TK-005650.1
                </span>
                <span className="py-[2px] px-[7px] rounded-[20px] bg-primary-default text-[10px] font-normal text-text-inverse">
                  Thường
                </span>
                <IoIosArrowDown className="text-icon-medium text-lg" />
              </div>
            </>
          ) : (
            <>
              {/* <Button onClick={() => alert("Primary")} variant="normal">
                Mở tài khoản
              </Button> */}
              <Button onClick={() => handleClickLogin()} variant="primary">
                <LoginIcon />
                Đăng nhập
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

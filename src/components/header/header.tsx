import { FaBell } from "react-icons/fa";
import AssetsIcon from "../../assets/imgs/icons/assets.svg?react";
import OrderIcon from "../../assets/imgs/icons/order.svg?react";
import RechargeIcon from "../../assets/imgs/icons/recharge.svg?react";

import Button from "../button";

export default function Header() {
  return (
    <div className="flex items-center justify-between h-full w-full">
      <div className="flex flex-row gap-2">
        <Button onClick={() => alert("Primary")} variant="close">
          <RechargeIcon />
          Nạp tiền
        </Button>
        <Button onClick={() => alert("Secondary")} variant="close">
          <AssetsIcon />
          Tài sản
        </Button>
      </div>

      <div className="flex flex-row gap-4 items-center">
        <Button onClick={() => alert("Primary")} variant="success">
          <OrderIcon />
          Đặt lệnh nhanh
        </Button>

        <div className="flex flex-row gap-2 items-center">
          <Button
            onClick={() => alert("Primary")}
            variant="close"
            className="!p-2 !h-8"
          >
            <FaBell />
          </Button>{" "}
          <Button onClick={() => alert("Primary")} variant="normal">
            Mở tài khoản
          </Button>
          <Button onClick={() => alert("Primary")} variant="primary">
            <OrderIcon />
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
}

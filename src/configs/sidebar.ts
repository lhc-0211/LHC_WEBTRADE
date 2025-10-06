import type { SidebarItemGroup } from "../types/layout";

import AccountSettings from "../assets/imgs/icons/account_settings.svg?react";
import MarketOverview from "../assets/imgs/icons/market_overview.svg?react";
import PlaceOrder from "../assets/imgs/icons/place_order.svg?react";
import Portfolio from "../assets/imgs/icons/portfolio.svg?react";
import PriceBoardIcon from "../assets/imgs/icons/price_board.svg?react";
import TradeHistory from "../assets/imgs/icons/trade_history.svg?react";

export const sidebarGroups: SidebarItemGroup[] = [
  {
    id: "group_1",
    items: [
      {
        id: "price_board",
        title: "Bảng giá",
        path: "/price-board",
        icon: PriceBoardIcon,
      },
      {
        id: "market_overview",
        title: "Thị trường",
        path: "/market-overview",
        icon: MarketOverview,
        requiresLogin: true,
      },
    ],
  },
  {
    id: "group_2",
    items: [
      {
        id: "place_order",
        title: "Đặt lệnh",
        path: "/place-order",
        icon: PlaceOrder,
        requiresLogin: true,
      },
      {
        id: "portfolio",
        title: "Danh mục",
        path: "/portfolio",
        icon: Portfolio,
        requiresLogin: true,
      },
      {
        id: "trade_history",
        title: "Lịch sử",
        path: "/trade-history",
        icon: TradeHistory,
        requiresLogin: true,
      },
    ],
  },
  {
    id: "group_3",
    items: [
      {
        id: "account_settings",
        title: "Tài khoản",
        path: "/account",
        icon: AccountSettings,
        requiresLogin: true,
      },
    ],
  },
];

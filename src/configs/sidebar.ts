import type { SidebarItemGroup } from "../types/layout";

import PlaceOrder from "../assets/imgs/icons/place_order.svg?react";
import PriceBoardIcon from "../assets/imgs/icons/price_board.svg?react";

export const SIDE_BAR_GROUPS: SidebarItemGroup[] = [
  {
    id: "group_1",
    items: [
      {
        id: "price_board",
        title: "Bảng giá",
        path: "/price-board",
        icon: PriceBoardIcon,
      },
      // {
      //   id: "market_overview",
      //   title: "Thị trường",
      //   path: "/market-overview",
      //   icon: MarketOverview,
      //   requiresLogin: true,
      // },
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
      // {
      //   id: "portfolio",
      //   title: "Danh mục",
      //   path: "/portfolio",
      //   icon: Portfolio,
      //   requiresLogin: true,
      // },
      // {
      //   id: "trade_history",
      //   title: "Lịch sử",
      //   path: "/trade-history",
      //   icon: TradeHistory,
      //   requiresLogin: true,
      // },
    ],
  },
  // {
  //   id: "group_3",
  //   items: [
  //     {
  //       id: "account_settings",
  //       title: "Tài khoản",
  //       path: "/account",
  //       icon: AccountSettings,
  //       requiresLogin: true,
  //     },
  //   ],
  // },
];

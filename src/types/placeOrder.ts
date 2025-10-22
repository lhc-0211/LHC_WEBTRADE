import type { OptionType } from "../components/inputs/InputSearchField";

export interface OrderForm {
  orderSymbol: OptionType | null;
  orderSide: "B" | "S";
  orderVolumn: string;
  orderPrice: string;
  accountOrder: string;
}

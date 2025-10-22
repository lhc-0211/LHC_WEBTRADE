import { usePerfectScrollbar } from "../../hooks/usePerfectScrollbar.ts";
import OrderForm from "./components/order-form/OrderForm.tsx";

export default function PlaceOrder() {
  const { containerRef } = usePerfectScrollbar();

  return (
    <div
      className="flex flex-col w-full h-[calc(var(--app-height)-64px)] relative "
      ref={containerRef}
    >
      <div className="max-h-[728px] h-[580px] min-h-[580px] w-full grid grid-cols-5">
        <div className="col-span-4 h-full "></div>
        <div className="col-span-1 h-full ">
          <OrderForm />
        </div>
      </div>
      <div className="w-full h-[500px] "></div>
    </div>
  );
}

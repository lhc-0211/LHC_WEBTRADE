import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import ScaleLoader from "react-spinners/ScaleLoader";
import ConfirmOtpModal from "../../../../components/auth/ConfirmOTPModal";
import Button from "../../../../components/common/button";
import InputOrderPrice from "../../../../components/inputs/InputOrderPrice";
import InputOrderSide from "../../../../components/inputs/InputOrderSide";
import InputOrderVolume from "../../../../components/inputs/InputOrderVolume";
import InputSearchField from "../../../../components/inputs/InputSearchField";
import SelectAccount from "../../../../components/inputs/SelectAccField";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { selectAccountProfile } from "../../../../store/slices/client/selector";
import {
  selectShareStock,
  selectShareStockStatus,
} from "../../../../store/slices/place-order/selector";
import { fetchShareStockCodeRequest } from "../../../../store/slices/place-order/slice";
import type { OrderForm } from "../../../../types/placeOrder";
import { numberFormat, StringToDouble, StringToInt } from "../../../../utils";
import OrderConfirmModal from "./OrderConfirmModal";
import ShareStockInfo from "./ShareStockInfo";

// interface Props {
//   typeOrder: string;
//   setTypeOrder: React.Dispatch<React.SetStateAction<"1" | "2" | "3">>;
// }

export default function NormalOrderForm() {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<OrderForm>({
    defaultValues: {
      orderSymbol: {
        label: "Ngân hàng Thương mại Cổ phần Á Châu",
        value: "ACB",
        post_to: "HOSE",
      },
      orderSide: "B",
      orderVolume: "",
    },
  });

  const dispatch = useAppDispatch();

  const shareStock = useAppSelector(selectShareStock);
  const accountProfile = useAppSelector(selectAccountProfile);
  const { loading: loadingShareStock } = useAppSelector(selectShareStockStatus);

  const orderSymbol = watch("orderSymbol");
  const orderSymbolValue = orderSymbol?.value;
  const orderSide = watch("orderSide");
  const orderVolume = watch("orderVolume");
  const orderPrice = watch("orderPrice");

  const debouncedOrderSymbol = useDebounce(orderSymbolValue, 500);
  const debouncedOrderVolume = useDebounce(orderVolume, 500);

  const [stepOrder, setStepOrder] = useState<0 | 1 | 2>(0);
  const [dataSubmitOrder, setDateSubmitOrder] = useState<OrderForm>();

  useEffect(() => {
    if (!debouncedOrderSymbol) return;

    dispatch(
      fetchShareStockCodeRequest({
        shareCode: debouncedOrderSymbol,
        volume: StringToInt(debouncedOrderVolume) || 0,
      })
    );
  }, [debouncedOrderSymbol, debouncedOrderVolume, dispatch]);

  useEffect(() => {
    if (shareStock) {
      setValue("orderPrice", shareStock?.lastPrice);
    }
  }, [shareStock, setValue]);

  useEffect(() => {
    if (accountProfile && accountProfile?.cAccountDefault) {
      setValue("accountOrder", accountProfile?.cAccountDefault);
    }
  }, [accountProfile, setValue]);

  const handleSubmitOrder = () => {
    alert("submit");
  };

  const onSubmit = async (data: OrderForm) => {
    setDateSubmitOrder(data);

    setStepOrder(1);
  };

  return (
    <>
      <form
        className="w-full h-full p-4 bg-surface rounded-lg flex flex-col gap-3 min-h-[580px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* input chọn tk */}
        <div className="flex flex-row items-center justify-between border-b pb-3 border-border">
          <h1 className="text-base font-bold text-white-50">Đặt lệnh</h1>
          <Controller
            name="accountOrder"
            control={control}
            rules={{ required: "Vui lòng chọn tài khoản" }}
            render={({ field, fieldState }) => (
              <div>
                <SelectAccount
                  value={field.value}
                  onChange={field.onChange}
                  opts={[
                    {
                      accCode: accountProfile?.cAccountDefault + "",
                      accType: "Thường",
                      type: "N",
                    },
                  ]}
                  placeholder="Chọn tài khoản"
                  className="!w-[200px] !h-9 !rounded-xl !text-xs"
                  error={fieldState.error}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* input search stock */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-3 items-center">
            <Controller
              name="orderSymbol"
              control={control}
              rules={{ required: "Vui lòng chọn mã chứng khoán" }}
              render={({ field, fieldState }) => (
                <div>
                  <InputSearchField
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Tìm kiếm mã"
                    className="!w-[160px]"
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
            {orderSymbol?.post_to && orderSymbol?.label && (
              <div className="flex flex-col gap-[2px]">
                <span className="text-sm font-bold text-text-title items-center">
                  ({orderSymbol?.post_to})
                </span>{" "}
                <span className="text-xs font-medium text-text-subtitle h-4 block truncate max-w-[200px]">
                  {orderSymbol?.label}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Thông tin mã chứng khoán */}
        <ShareStockInfo shareStock={shareStock} loading={loadingShareStock} />

        {/* side và loại lệnh */}
        <div className="flex flex-row items-center justify-between">
          <InputOrderSide control={control} name="orderSide" />

          <div>
            <span className="text-xs font-medium text-text-title flex flex-row gap-1 items-center cursor-pointer">
              Lệnh cơ sở
              <IoIosArrowDown />
            </span>
          </div>
        </div>

        {/* Sức mua bán và tỉ lệ kí quỹ */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-1 text-xs">
            <span className="">Sức mua </span>
            <span>-</span>
          </div>
          <div className="flex flex-col gap-1 text-xs items-end">
            <span className="text-xs">Tỉ lệ kí quỹ</span>

            <span className="text-stock-text-purple">-</span>
          </div>
        </div>

        {/* input khối lượng */}
        <div
          className={`h-[88px] px-3.5 pt-[10px] pb-3 bg-input rounded-lg border border-transparent focus-within:outline-none focus-within:!border focus-within:!border-yellow-500 focus-within:!shadow-[0_0_0_2px_rgba(250,204,21,0.3)] caret-DTND-200 ${
            errors.orderVolume?.message ? "!border !border-red-500" : ""
          }`}
        >
          <div className="flex flex-row items-center justify-between pb-3.5">
            <h2 className="text-xs">Khối lượng</h2>

            {orderSide === "B" ? (
              <span className="text-xs">
                {" "}
                KL mua tối đa: <span className="text-green-400">0</span>
              </span>
            ) : (
              <span className="text-xs">
                {" "}
                KL bán tối đa: <span className="text-red-400">0</span>
              </span>
            )}
          </div>
          <Controller
            name="orderVolume"
            control={control}
            rules={{
              required: "Vui lòng nhập số lượng",
              min: { value: 0, message: "Số lượng phải >= 0" },
            }}
            render={({ field, fieldState }) => (
              <div>
                <InputOrderVolume
                  placeholder={`0 ${orderSymbol?.value || "ACB"}`}
                  step={100}
                  min={0}
                  max={9999999999999}
                  className="!h-7 text-[20px]"
                  required
                  {...field}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-xs">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* input giá */}
        <div
          className={`h-[88px] px-3.5 pt-[10px] pb-3 bg-input rounded-lg border border-transparent focus-within:outline-none focus-within:!border focus-within:!border-yellow-500 focus-within:!shadow-[0_0_0_2px_rgba(250,204,21,0.3)] caret-DTND-200 ${
            errors.orderPrice?.message ? "!border !border-red-500" : ""
          }`}
        >
          <div className="flex flex-row items-center justify-between mb-3.5">
            <h2 className="text-xs">Giá đặt</h2>
          </div>
          <Controller
            name="orderPrice"
            control={control}
            rules={{
              required: "Vui lòng nhập giá",
              min: { value: 0, message: "Giá phải >= 0" },
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Giá phải là số với tối đa 2 chữ số thập phân",
              },
            }}
            render={({ field, fieldState }) => (
              <div>
                <InputOrderPrice
                  placeholder={`0`}
                  step={0.05}
                  min={0}
                  max={1000}
                  className="!h-7 text-[20px]"
                  required
                  {...field}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-xs">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* btn submit */}
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm font-medium text-text-title">
              Giá trị lệnh
            </span>
            <span className="text-text-title text-[20px] font-semibold ">
              {orderPrice && orderVolume
                ? numberFormat(
                    StringToDouble(orderPrice) * 1000 * StringToInt(orderVolume)
                  )
                : "-"}{" "}
              ₫
            </span>
          </div>
          <Button
            variant={`${
              orderSide === "B"
                ? "success"
                : orderSide === "S"
                ? "danger"
                : "close"
            }`}
            fullWidth
            type="submit"
            disabled={isSubmitting || loadingShareStock || stepOrder !== 0}
            className="!h-10"
          >
            {loadingShareStock ? <ScaleLoader height={25} /> : "Đặt lệnh"}
          </Button>
        </div>
      </form>
      {stepOrder === 1 && dataSubmitOrder && (
        <OrderConfirmModal
          isOpen={stepOrder === 1}
          onClose={() => setStepOrder(0)}
          data={dataSubmitOrder}
          onSubmit={() => setStepOrder(2)}
        />
      )}
      {stepOrder === 2 && (
        <ConfirmOtpModal
          isOpen={stepOrder === 2}
          onClose={() => setStepOrder(0)}
          onPre={() => setStepOrder(1)}
          onSubmit={() => handleSubmitOrder()}
        />
      )}
    </>
  );
}

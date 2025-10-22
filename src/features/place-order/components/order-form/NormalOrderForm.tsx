import { Controller, useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import Button from "../../../../components/common/button";
import InputOrderPrice from "../../../../components/inputs/InputOrderPrice";
import InputOrderSide from "../../../../components/inputs/InputOrderSide";
import InputOrderVolume from "../../../../components/inputs/InputOrderVolume";
import InputSearchField from "../../../../components/inputs/InputSearchField";
import SelectAccount from "../../../../components/inputs/SelectAccField";
import type { OrderForm } from "../../../../types/placeOrder";
import { colorFix, getBgColorStock, numberFormat } from "../../../../utils";

// interface Props {
//   typeOrder: string;
//   setTypeOrder: React.Dispatch<React.SetStateAction<"1" | "2" | "3">>;
// }

export default function NormalOrderForm() {
  const {
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting },
  } = useForm<OrderForm>({
    defaultValues: {
      orderSymbol: {
        label: "Ngân hàng Thương mại Cổ phần Á Châu",
        value: "ACB",
        post_to: "HOSE",
      },
      orderSide: "B",
    },
  });

  const orderSymbol = watch("orderSymbol");
  const orderSide = watch("orderSide");

  const onSubmit = async () => {};

  const stockReal = {
    sym: "FPT",
    mc: "STO",
    c: 99.5,
    f: 86.5,
    r: 93,
    lastPrice: 97,
    lastVolume: 67540,
    openPrice: 95.2,
    lowPrice: 95,
    highPrice: 99,
    status_info: 99,
    lot: 1831110,
    avePrice: 96.8,
    fRoom: 21501425,
    fRoomAvai: 21501425,
    fBVol: 441670,
    fSVolume: 59350,
    fBVal: 426629710000,
    fSVal: 57560970000,
    totalFBVol: 441683,
    totalFSVol: 153193,
    totalFBVal: 426642921500,
    totalFSVal: 148406554150,
    change: 4,
    changePc: 4.3,
    oP1: 97,
    oV1: 16890,
    oCl1: "i",
    oVC1: "i",
    bP1: 96.9,
    bV1: 1260,
    bCl1: "i",
    bVC1: "i",
    oP2: 97.1,
    oV2: 3450,
    oCl2: "i",
    oVC2: "i",
    bP2: 96.8,
    bV2: 1380,
    bCl2: "i",
    bVC2: "i",
    oP3: 97.2,
    oV3: 6430,
    oCl3: "i",
    oVC3: "i",
    bP3: 96.7,
    bV3: 2270,
    bCl3: "i",
    bVC3: "i",
    duMua: 0,
    duBan: 0,
  };

  const color = colorFix(
    stockReal?.lastPrice,
    stockReal?.r,
    stockReal?.c,
    stockReal?.f,
    stockReal?.r
  );

  const _div = stockReal && +stockReal?.r > 50 ? 1 : 2;

  return (
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
                  { accCode: "0003651", accType: "Thường", type: "N" },
                  { accCode: "0003656", accType: "Margin", type: "M" },
                  { accCode: "0003657", accType: "Margin", type: "M" },
                ]}
                placeholder="Chọn tài khoản"
                className="!w-[200px] !h-9 !rounded-xl !text-xs"
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
      <div className="flex flex-col bg-skin-card rounded-xl gap-3">
        <div className="flex items-center">
          <div
            className={`mr-3 p-2 rounded-lg h-[64px] w-[109px] flex flex-col items-center justify-center gap-1 " +
              ${color} ${getBgColorStock(color)} 
            `}
          >
            <div className="text-2xl font-semibold ">
              {numberFormat(stockReal?.lastPrice, _div, "0")}
            </div>
            <div className="flex items-center text-xs font-medium">
              <div className="flex flex-row gap-2 items-center text-xs font-medium">
                <div className={"flex flex-row gap-2 text-xs font-medium"}>
                  <span>{(stockReal?.change + "").trim()}</span>
                  <span>
                    {stockReal?.changePc
                      ? (stockReal?.changePc + "").trim() + "%"
                      : "0%"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-3 place-items-end">
              <div className="grid gap-1 min-w-[60px]">
                <span className="text-skin-white-300  text-[10px] font-normal">
                  Trần
                </span>
                <span className="text-skin-ceil text-xs font-semibold c">
                  {numberFormat(stockReal?.c, _div, "0")}
                </span>
              </div>
              <div className="grid gap-1 min-w-[60px] ml-4">
                <span className="text-skin-white-300  text-[10px] font-normal">
                  T.C
                </span>
                <span className="text-skin-ref text-xs font-semibold r">
                  {numberFormat(stockReal?.r, _div, "0")}
                </span>
              </div>
              <div className="grid gap-1 min-w-[60px] ml-4">
                <span className="text-skin-white-300  text-[10px] font-normal">
                  Sàn
                </span>
                <span className="text-skin-floor text-xs font-semibold f">
                  {numberFormat(stockReal?.f, _div, "0")}
                </span>
              </div>
              <div className="grid gap-1 min-w-[60px] ml-4">
                <span className="text-skin-white-300  text-[10px] font-normal">
                  Cao
                </span>
                <span className={"text-xs font-semibold " + color}>
                  {numberFormat(stockReal?.highPrice, _div, "0")}
                </span>
              </div>
              <div className="grid gap-1 min-w-[60px] ml-4">
                <span className="text-skin-white-300  text-[10px] font-normal">
                  TB
                </span>
                <span className={"text-xs font-semibold " + color}>
                  {numberFormat(stockReal?.avePrice, _div, "0")}
                </span>
              </div>
              <div className="grid gap-1 min-w-[60px] ml-4">
                <span className="text-skin-white-300  text-[10px] font-normal">
                  Thấp
                </span>
                <span className={"text-xs font-semibold " + color}>
                  {numberFormat(stockReal?.lowPrice, _div, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
      <div className="h-[88px] px-3.5 pt-[10px] pb-3 bg-input rounded-lg border border-transparent focus-within:outline-none focus-within:!border focus-within:!border-yellow-500 focus-within:!shadow-[0_0_0_2px_rgba(250,204,21,0.3)] caret-DTND-200 ">
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
            <InputOrderVolume
              placeholder={`0 ${orderSymbol?.value || "ACB"}`}
              error={fieldState.error}
              step={100}
              min={0}
              max={9999999999999}
              className="!h-7 text-[20px]"
              required
              {...field}
            />
          )}
        />
      </div>

      {/* input giá */}
      <div className="h-[88px] px-3.5 pt-[10px] pb-3 bg-input rounded-lg border border-transparent focus-within:outline-none focus-within:!border focus-within:!border-yellow-500 focus-within:!shadow-[0_0_0_2px_rgba(250,204,21,0.3)] caret-DTND-200 ">
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
            <InputOrderPrice
              placeholder={`0`}
              error={fieldState.error}
              step={0.05}
              min={0}
              max={1000}
              className="!h-7 text-[20px]"
              required
              {...field}
            />
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
            - ₫
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
          disabled={isSubmitting}
          className="!h-10"
        >
          {/* {loginStatus.loading ? <ScaleLoader height={25} /> : "Đăng nhập"} */}
          Đặt lệnh
        </Button>
      </div>
    </form>
  );
}

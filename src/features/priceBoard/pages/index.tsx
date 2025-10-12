import ListChartIndexs from "../components/list-chart-indexs";

export default function PriceBoard() {
  return (
    <div className="w-full h-full flex flex-col gap-6 items-center">
      <div className="w-full h-[148px] flex flex-col gap-3">
        <ListChartIndexs />
      </div>
      <div>Bảng giá</div>
    </div>
  );
}

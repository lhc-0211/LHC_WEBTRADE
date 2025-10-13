import SynAnalysisPriceBoard from "../components/synthetic-analysis";

export default function PriceBoard() {
  return (
    <div className="w-full h-full flex flex-col gap-6 items-center">
      <div className="w-full h-[148px] flex flex-col gap-3">
        <SynAnalysisPriceBoard />
      </div>
      <div>Bảng giá</div>
    </div>
  );
}

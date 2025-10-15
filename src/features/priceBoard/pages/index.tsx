import { useState } from "react";
import HeaderColumns from "../components/board/HeaderColumns";
import MenuDashboard from "../components/menu-board";
import SynAnalysisPriceBoard from "../components/synthetic-analysis";

export default function PriceBoard() {
  const [active, setActive] = useState<string>("vn30");

  const onChange = (id: string) => {
    setActive(id);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="w-full h-[148px] flex flex-col gap-3">
        <SynAnalysisPriceBoard />
      </div>
      <div className="flex flex-col gap-3">
        <MenuDashboard active={active} onChange={onChange} />

        {/* Bảng giá */}
        <div>
          <HeaderColumns />
        </div>
      </div>
    </div>
  );
}

import { FaSquare } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { useSelector } from "react-redux";
import { selectChartIndexsStatus } from "../../../../store/slices/priceboardSelector";
import type { ChartDataIndex, InfoIndex } from "../../../../types/priceBoard";
import {
  getStatusIndex,
  mapIdToNameIndex,
  numberFormat,
} from "../../../../utils";

interface Props {
  dataIndex: InfoIndex;
  dataChart: ChartDataIndex;
}

export default function ChartIndex(props: Props) {
  const { dataIndex, dataChart } = props;

  const { loading } = useSelector(selectChartIndexsStatus);

  return (
    <div className="flex flex-row gap-3 items-center w-full h-full">
      <div className="flex flex-col gap-2 w-2/5">
        {/* Name, change, changePC */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-text-title uppercase">
            {mapIdToNameIndex(dataIndex.indexsTypeCode)}
          </span>
          <div
            className={`flex flex-row gap-2 items-center ${dataIndex.status}`}
          >
            <div className="p-[2px] rounded grid place-items-center bg-success-dark">
              <FaArrowUpLong className=" w-3 h-3" />
            </div>{" "}
            <div className="flex flex-row gap-[5px] items-center">
              <span className="text-[10px] font-normal">
                {numberFormat(dataIndex.valueIndexes)}
              </span>
              <span className="text-[10px] font-normal">
                ({dataIndex.change} - {dataIndex.percentChange}%)
              </span>
            </div>
          </div>
        </div>

        {/* value, volume */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-normal text-text-title">
            {numberFormat(dataIndex.totalVolumeTraded)}{" "}
            <span className="text-text-subtitle">CP</span>
          </span>
          <span className="text-xs font-normal text-text-title">
            {numberFormat(dataIndex.grossTradeAmt / 10e8)}{" "}
            <span className="text-text-subtitle">Tỷ</span>
          </span>
        </div>

        {/* Mã tăng giảm, phiên */}
        <div className="flex flex-col gap-1">
          <div className="grid grid-cols-3">
            <span className="text-[10px] font-normal text-stock-text-green flex flex-row items-center justify-center">
              <TiArrowSortedUp className="w-3 h-3" />
              <span>
                {dataIndex.fluctuationUpIssueCount}{" "}
                <span className="text-stock-text-purple">
                  ( {dataIndex.fluctuationUpperLimitIssueCount})
                </span>
              </span>
            </span>
            <span className="text-[10px] font-normal text-stock-text-yellow flex flex-row items-center justify-center">
              <FaSquare className="w-[7px] h-[7px] mr-[2px]" />
              <span>{dataIndex.fluctuationSteadinessIssueCount}</span>
            </span>
            <span className="text-[10px] font-normal text-stock-text-red flex flex-row items-center justify-center">
              <TiArrowSortedDown className="w-3 h-3" />
              <span>
                {dataIndex.fluctuationDownIssueCount}{" "}
                <span className="text-stock-text-blue-100">
                  ({dataIndex.fluctuationLowerLimitIssueCount})
                </span>
              </span>
            </span>
          </div>
          <ul className="list-disc text-[10px] font-normal text-text-title ml-4">
            <li className="">{getStatusIndex(dataIndex.tradingSessionId)}</li>
          </ul>
        </div>
      </div>

      {/* chart */}
      {loading ? (
        <div className="w-3/5 animate-pulse h-full">
          <div className="w-full h-full bg-gray-300/40 rounded"></div>
        </div>
      ) : !dataChart ? (
        <div className="w-3/5"></div>
      ) : (
        <span className="text-xs w-3/5 grid place-items-center bg-gray-300/40 h-full rounded ">
          No data!
        </span>
      )}
    </div>
  );
}

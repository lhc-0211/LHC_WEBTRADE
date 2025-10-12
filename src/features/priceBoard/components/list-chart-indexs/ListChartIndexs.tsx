import { FaSquare } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { useSelector } from "react-redux";
import { selectChartIndexStatusById } from "../../../../store/slices/priceboard/selector";
import type {
  ChartIndexItem,
  InfoIndex,
  MakeOptional,
  PriceVolumeChart,
} from "../../../../types";
import {
  convertTimeStringToUnix,
  getStatusIndex,
  mapIdToNameIndex,
  numberFormat,
} from "../../../../utils";
import ChartIndex from "./ChartIndex";

interface Props {
  dataIndex: InfoIndex;
  dataChart: ChartIndexItem[];
}

export default function ListChartIndexs(props: Props) {
  const { dataIndex, dataChart } = props;

  const { loading } = useSelector(
    selectChartIndexStatusById(dataIndex.indexsTypeCode)
  );

  const handleProcessDataChart = (dataChart: ChartIndexItem[]) => {
    const dataFormat: MakeOptional<PriceVolumeChart, "s"> = {
      c: [],
      h: [],
      l: [],
      o: [],
      v: [],
      t: [],
    };

    dataChart.forEach((item: ChartIndexItem) => {
      dataFormat.c.push(item.close);
      dataFormat.h.push(item.high);
      dataFormat.l.push(item.low);
      dataFormat.o.push(item.open);
      dataFormat.v.push(item.volume);
      dataFormat.t.push(convertTimeStringToUnix(item.time));
    });

    return dataFormat;
  };

  return (
    <div className="flex flex-row gap-3 items-center w-full h-full bg-sidebar-default rounded border border-border">
      <div className="flex flex-col gap-2 w-2/5 p-1">
        {/* Name, change, changePC */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-text-title uppercase">
            {mapIdToNameIndex(dataIndex.indexsTypeCode)}
          </span>
          <div
            className={`flex flex-row gap-2 items-center ${dataIndex.status}`}
          >
            <div className="p-[2px] rounded grid place-items-center bg-status-index">
              <FaArrowUpLong className=" w-3 h-3" />
            </div>{" "}
            <div className="flex flex-row gap-[5px] items-center">
              <span className="text-[10px] font-semibold">
                {numberFormat(dataIndex.valueIndexes)}
              </span>
              <span className="text-[10px] font-semibold">
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
            <span className="text-[10px] font-semibold text-stock-text-green flex flex-row items-center justify-center">
              <TiArrowSortedUp className="w-3 h-3" />
              <span>
                {dataIndex.fluctuationUpIssueCount}{" "}
                <span className="text-stock-text-purple">
                  ( {dataIndex.fluctuationUpperLimitIssueCount})
                </span>
              </span>
            </span>
            <span className="text-[10px] font-semibold text-stock-text-yellow flex flex-row items-center justify-center">
              <FaSquare className="w-[7px] h-[7px] mr-[2px]" />
              <span>{dataIndex.fluctuationSteadinessIssueCount}</span>
            </span>
            <span className="text-[10px] font-semibold text-stock-text-red flex flex-row items-center justify-center">
              <TiArrowSortedDown className="w-3 h-3" />
              <span>
                {dataIndex.fluctuationDownIssueCount}{" "}
                <span className="text-stock-text-blue-100">
                  ({dataIndex.fluctuationLowerLimitIssueCount})
                </span>
              </span>
            </span>
          </div>
          <ul className="list-disc text-[10px] font-medium text-text-title ml-4">
            <li className="">{getStatusIndex(dataIndex.tradingSessionId)}</li>
          </ul>
        </div>
      </div>

      {/* chart */}
      {loading ? (
        <div className="w-3/5 animate-pulse h-full">
          <div className="w-full h-full bg-gray-300/40 rounded"></div>
        </div>
      ) : (
        <div className="w-3/5 h-full flex items-center justify-center rounded">
          <ChartIndex
            data={handleProcessDataChart(dataChart)}
            openIndex={dataIndex.openIndexes}
          />
        </div>
      )}
    </div>
  );
}

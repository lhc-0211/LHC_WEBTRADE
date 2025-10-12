import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useIntervalApi } from "../../../../hooks/useIntervalApi";
import { useAppDispatch } from "../../../../store/hook";
import {
  selectChartIndexs,
  selectInfoIndex,
  selectInfoIndexStatus,
} from "../../../../store/slices/priceboard/selector";
import {
  fetchChartIndexRequest,
  fetchInfoIndexRequest,
} from "../../../../store/slices/priceboard/slice";
import type { InfoIndex } from "../../../../types";
import ChartIndexSkeleton from "./ChartIndexSkeleton";
import ChartIndex from "./ListChartIndexs";

export default function ListChartIndexs() {
  const dispatch = useAppDispatch();

  const infoIndex = useSelector(selectInfoIndex);
  const chartIndexs = useSelector(selectChartIndexs);

  const { loading, error } = useSelector(selectInfoIndexStatus);

  useEffect(() => {
    dispatch(fetchInfoIndexRequest());
  }, [dispatch]);

  useEffect(() => {
    if (infoIndex.length > 0) {
      infoIndex.forEach((dataIndex: InfoIndex) => {
        if (dataIndex.indexsTypeCode) {
          dispatch(fetchChartIndexRequest(dataIndex.indexsTypeCode));
        }
      });
    }
  }, [infoIndex, dispatch]);

  //polling api chartindex
  useIntervalApi(() => {
    const hour = new Date().getHours();
    if (hour < 8 || hour >= 15) return;

    if (infoIndex.length > 0) {
      infoIndex.forEach((dataIndex: InfoIndex) => {
        if (dataIndex.indexsTypeCode) {
          dispatch(fetchChartIndexRequest(dataIndex.indexsTypeCode));
        }
      });
    }
  }, 5 * 10 * 1000);

  const swiperProps = {
    spaceBetween: 8,
    modules: [Navigation],
    pagination: { clickable: true },
    loop: true,
    breakpoints: {
      0: { slidesPerView: 3 },
    },
    className: "w-full h-full",
    noSwiping: true,
    noSwipingClass: "no-swiping",
  };

  return (
    <div className="h-full grid grid-cols-3">
      <Swiper {...swiperProps} className="w-full h-full col-span-2">
        {loading || error
          ? [...Array(infoIndex.length || 4)].map((_, index) => (
              <SwiperSlide key={index} className="h-full">
                {loading ? (
                  <ChartIndexSkeleton />
                ) : (
                  <div className="w-full h-full grid place-items-center text-red-500 text-xs font-medium bg-gray-300/40 rounded p-2">
                    Error: {error}
                  </div>
                )}
              </SwiperSlide>
            ))
          : infoIndex.map((item: InfoIndex) => (
              <SwiperSlide key={item.indexsTypeCode} className="h-full">
                <ChartIndex
                  dataIndex={item}
                  dataChart={
                    chartIndexs[item.indexsTypeCode]?.data?.length > 0
                      ? chartIndexs[item.indexsTypeCode].data
                      : []
                  }
                />
              </SwiperSlide>
            ))}
      </Swiper>

      <div className="col-span-1">
        <div className="w-full h-full grid place-items-center">Thống báo</div>
      </div>
    </div>
  );
}

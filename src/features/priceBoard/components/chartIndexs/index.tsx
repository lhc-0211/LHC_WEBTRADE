import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch } from "../../../../store/hook";
import { fetchInfoIndexRequest } from "../../../../store/slices/priceboard/reducer";
import {
  selectChartIndexs,
  selectInfoIndex,
  selectInfoIndexStatus,
} from "../../../../store/slices/priceboardSelector";
import type { InfoIndex } from "../../../../types";
import { useIntervalApi } from "../../hooks/useIntervalApi";
import ChartIndex from "./chartIndex";
import ChartIndexSkeleton from "./chartIndexSkeleton";

export default function ListChartIndexs() {
  const dispatch = useAppDispatch();

  const infoIndex = useSelector(selectInfoIndex);
  const chartIndexs = useSelector(selectChartIndexs);

  const { loading, error } = useSelector(selectInfoIndexStatus);

  useIntervalApi(async () => {
    dispatch(fetchInfoIndexRequest());

    // info.forEach((dataIndex: InfoIndex) => {
    //   if (!chartIndexs[dataIndex.indexsTypeCode]) {
    //     dispatch(fetchChartIndexs(dataIndex.indexsTypeCode));
    //   }
    // });
  }, 5 * 60 * 1000);

  const swiperProps = {
    spaceBetween: 12,
    modules: [Navigation],
    pagination: { clickable: true },
    loop: true,
    breakpoints: {
      0: { slidesPerView: 1 },
      412: { slidesPerView: 2 },
      618: { slidesPerView: 3 },
      640: { slidesPerView: 1 },
      820: { slidesPerView: 2 },
      1280: { slidesPerView: 4 },
    },
    className: "w-full h-full",
  };

  if (loading) {
    return (
      <Swiper {...swiperProps}>
        {[...Array(4)].map((_, index: number) => (
          <SwiperSlide key={index} className="h-full">
            <ChartIndexSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  if (error) {
    return (
      <Swiper {...swiperProps}>
        {[...Array(4)].map((_, index: number) => (
          <SwiperSlide key={index} className="h-full">
            <div className="w-full h-full grid place-items-center text-red-500 text-xs font-medium bg-gray-300/40 rounded">
              Error: {error}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <div className="h-full">
      <Swiper {...swiperProps} className="w-full h-full">
        {infoIndex &&
          infoIndex.length > 0 &&
          infoIndex.map((item: InfoIndex) => (
            <SwiperSlide key={item.indexsTypeCode} className="h-full">
              <ChartIndex
                dataIndex={item}
                dataChart={chartIndexs[item.indexsTypeCode]}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

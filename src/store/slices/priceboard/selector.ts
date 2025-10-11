import type { RootState } from "../..";
import type { ApiStatus, ChartDataIndex, InfoIndex } from "../../../types";

// Selectors với type annotations
export const selectInfoIndex = (state: RootState): InfoIndex[] =>
  state.priceBoard.data.infoIndex;

export const selectInfoIndexStatus = (state: RootState): ApiStatus =>
  state.priceBoard.status.fetchInfoIndex;

export const selectChartIndexs = (
  state: RootState
): Record<string, ChartDataIndex> => state.priceBoard.data.chartIndexs;

export const selectChartIndexStatusById =
  (id: string) =>
  (state: RootState): ApiStatus =>
    state.priceBoard.status.fetchChartIndexs[id] || {
      loading: false,
      error: null,
    };

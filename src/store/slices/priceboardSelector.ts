import type { RootState } from "..";

export const selectInfoIndex = (state: RootState) =>
  state.priceboard.data.infoIndex;

export const selectInfoIndexStatus = (state: RootState) =>
  state.priceboard.status.fetchInfoIndex;

export const selectChartIndexs = (state: RootState) =>
  state.priceboard.data.chartIndexs;

export const selectChartIndexsStatus = (state: RootState) =>
  state.priceboard.status.fetchChartIndexs;

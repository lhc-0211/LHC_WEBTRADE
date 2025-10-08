import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiStatus, ChartDataIndex, InfoIndex } from "../../../types";

// State interface

export interface PriceBoardState {
  data: {
    infoIndex: InfoIndex[];
    chartIndexs: Record<string, ChartDataIndex>;
  };
  status: {
    fetchInfoIndex: ApiStatus;
    fetchChartIndexs: ApiStatus;
  };
}

const initialState: PriceBoardState = {
  data: { infoIndex: [], chartIndexs: {} },
  status: {
    fetchInfoIndex: { loading: false, error: null },
    fetchChartIndexs: { loading: false, error: null },
  },
};

const priceBoardSlice = createSlice({
  name: "priceBoard",
  initialState,
  reducers: {
    fetchInfoIndexRequest(state) {
      state.status.fetchInfoIndex = { loading: true, error: null };
    },
    fetchInfoIndexSuccess(state, action: PayloadAction<InfoIndex[]>) {
      state.status.fetchInfoIndex = { loading: false, error: null };
      state.data.infoIndex = action.payload;
    },
    fetchInfoIndexFailure(state, action: PayloadAction<string>) {
      state.status.fetchInfoIndex = { loading: false, error: action.payload };
    },
    fetchChartIndexRequest(state) {
      state.status.fetchChartIndexs = { loading: true, error: null };
    },
    fetchChartIndexSuccess(state, action: PayloadAction<ChartDataIndex>) {
      state.status.fetchChartIndexs = { loading: false, error: null };
      state.data.chartIndexs[action.payload.id] = action.payload;
    },
    fetchChartIndexFailure(state, action: PayloadAction<string>) {
      state.status.fetchChartIndexs = { loading: false, error: action.payload };
    },
  },
});

export const {
  fetchInfoIndexRequest,
  fetchInfoIndexSuccess,
  fetchInfoIndexFailure,
  fetchChartIndexRequest,
  fetchChartIndexSuccess,
  fetchChartIndexFailure,
} = priceBoardSlice.actions;

export default priceBoardSlice.reducer;

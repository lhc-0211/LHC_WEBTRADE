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
    fetchChartIndexs: Record<string, ApiStatus>;
  };
}

const initialState: PriceBoardState = {
  data: { infoIndex: [], chartIndexs: {} },
  status: {
    fetchInfoIndex: { loading: false, error: null },
    fetchChartIndexs: {},
  },
};

const priceBoardSlice = createSlice({
  name: "priceBoard",
  initialState,
  reducers: {
    // Thông tin Index
    fetchInfoIndexRequest(state) {
      state.status.fetchInfoIndex = { loading: true, error: null };
      state.data.infoIndex = [];
    },
    fetchInfoIndexSuccess(state, action: PayloadAction<InfoIndex[]>) {
      state.status.fetchInfoIndex = { loading: false, error: null };
      state.data.infoIndex = action.payload;
    },
    fetchInfoIndexFailure(state, action: PayloadAction<string>) {
      state.status.fetchInfoIndex = { loading: false, error: action.payload };
      state.data.infoIndex = [];
    },

    // Biểu đồ Index
    fetchChartIndexRequest(state, action: PayloadAction<string>) {
      const id = action.payload;

      if (!state.status.fetchChartIndexs[id]) {
        state.status.fetchChartIndexs[id] = { loading: false, error: null };
      }
      state.status.fetchChartIndexs[id].loading = true;
      state.status.fetchChartIndexs[id].error = null;
      state.data.chartIndexs[id] = { id, data: [] };
    },
    fetchChartIndexSuccess(state, action: PayloadAction<ChartDataIndex>) {
      const id = action.payload.id;
      state.status.fetchChartIndexs[id] = { loading: false, error: null };
      state.data.chartIndexs[id] = action.payload;
    },
    fetchChartIndexFailure(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.status.fetchChartIndexs[id] = {
        loading: false,
        error: action.payload,
      };
      state.data.chartIndexs[id] = { id, data: [] };
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

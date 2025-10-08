import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchChartIndexAPI, fetchInfoIndexAPI } from "../../api/priceBoardApi";
import type { ChartDataIndex, InfoIndex } from "../../types/priceBoard";

//Gọi API bằng createAsyncThunk

export const fetchInfoIndex = createAsyncThunk(
  "priceBoard/fetchInfoIndex",
  async () => {
    const response = await fetchInfoIndexAPI();

    return response.data;
  }
);

export const fetchChartIndexs = createAsyncThunk(
  "priceBoard/fetchChartIndexs",
  async (id: string) => {
    const response = await fetchChartIndexAPI(id);
    return { id: id, data: response.data };
  }
);

//Định nghĩa type cho status từng API
interface ApiStatus {
  loading: boolean;
  error: string | null;
}

// Định nghĩa type cho state của slice
interface PriceBoardState {
  data: {
    infoIndex: InfoIndex[];
    chartIndexs: Record<string, ChartDataIndex>;
  };
  status: {
    fetchInfoIndex: ApiStatus;
    fetchChartIndexs: ApiStatus;
  };
}

// 👉 State khởi tạo
const initialState: PriceBoardState = {
  data: {
    infoIndex: [],
    chartIndexs: {},
  },
  status: {
    fetchInfoIndex: { loading: false, error: null },
    fetchChartIndexs: { loading: false, error: null },
  },
};

//Tạo slice
const priceBoardSlice = createSlice({
  name: "priceBoard",
  initialState,
  reducers: {},

  //Quản lý nhiều API trong 1 slice
  extraReducers: (builder) => {
    //fetchInfoIndex
    builder
      .addCase(fetchInfoIndex.pending, (state) => {
        state.status.fetchInfoIndex = { loading: true, error: null };
      })
      .addCase(
        fetchInfoIndex.fulfilled,
        (state, action: PayloadAction<InfoIndex[]>) => {
          state.status.fetchInfoIndex = { loading: false, error: null };
          state.data.infoIndex = action.payload;
        }
      )
      .addCase(fetchInfoIndex.rejected, (state, action) => {
        state.status.fetchInfoIndex = {
          loading: false,
          error: action.error.message || "Error fetching infoIndex",
        };
      });

    //fetchChartIndexs
    builder
      .addCase(fetchChartIndexs.pending, (state) => {
        state.status.fetchChartIndexs = { loading: true, error: null };
      })
      .addCase(
        fetchChartIndexs.fulfilled,
        (state, action: PayloadAction<ChartDataIndex>) => {
          state.status.fetchChartIndexs = { loading: false, error: null };
          state.data.chartIndexs[action.payload.id] = action.payload;
        }
      )
      .addCase(fetchChartIndexs.rejected, (state, action) => {
        state.status.fetchChartIndexs = {
          loading: false,
          error: action.error.message || "Error fetching infoIndex",
        };
      });
  },
});

export default priceBoardSlice.reducer;

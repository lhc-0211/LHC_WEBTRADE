import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchSnapshotAPI, fetchStocksAPI } from "../../api/priceBoardApi";
import type { Snapshot, Stock } from "../../types/priceBoard";

// 👉 Gọi API bằng createAsyncThunk
export const fetchStocks = createAsyncThunk(
  "priceBoard/fetchStocks",
  async () => {
    const response = await fetchStocksAPI();
    return response.data;
  }
);

export const fetchSnapshot = createAsyncThunk(
  "priceBoard/fetchSnapshot",
  async () => {
    const response = await fetchSnapshotAPI();
    return response.data;
  }
);

// 👉 Định nghĩa type cho status từng API
interface ApiStatus {
  loading: boolean;
  error: string | null;
}

// 👉 Định nghĩa type cho state của slice
interface PriceBoardState {
  data: {
    stocks: Stock[];
    snapshot: Snapshot[];
  };
  status: {
    fetchStocks: ApiStatus;
    fetchSnapshot: ApiStatus;
  };
}

// 👉 State khởi tạo
const initialState: PriceBoardState = {
  data: {
    stocks: [],
    snapshot: [],
  },
  status: {
    fetchStocks: { loading: false, error: null },
    fetchSnapshot: { loading: false, error: null },
  },
};

// 👉 Tạo slice
const priceBoardSlice = createSlice({
  name: "priceBoard",
  initialState,
  reducers: {},

  // 👉 Quản lý nhiều API trong 1 slice
  extraReducers: (builder) => {
    // 🔹 fetchStocks
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.status.fetchStocks = { loading: true, error: null };
      })
      .addCase(
        fetchStocks.fulfilled,
        (state, action: PayloadAction<Stock[]>) => {
          state.status.fetchStocks = { loading: false, error: null };
          state.data.stocks = action.payload;
        }
      )
      .addCase(fetchStocks.rejected, (state, action) => {
        state.status.fetchStocks = {
          loading: false,
          error: action.error.message || "Error fetching stocks",
        };
      });

    // 🔹 fetchSnapshot
    builder
      .addCase(fetchSnapshot.pending, (state) => {
        state.status.fetchSnapshot = { loading: true, error: null };
      })
      .addCase(
        fetchSnapshot.fulfilled,
        (state, action: PayloadAction<Snapshot[]>) => {
          state.status.fetchSnapshot = { loading: false, error: null };
          state.data.snapshot = action.payload;
        }
      )
      .addCase(fetchSnapshot.rejected, (state, action) => {
        state.status.fetchSnapshot = {
          loading: false,
          error: action.error.message || "Error fetching snapshot",
        };
      });
  },
});

export default priceBoardSlice.reducer;

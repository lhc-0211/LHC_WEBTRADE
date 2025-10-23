import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiStatus } from "../../../types";
import type {
  FetchShareCodeResponse,
  FetchShareStockItem,
} from "../../../types/placeOrder";

export interface PlaceOrderState {
  data: {
    shareStockCode: FetchShareCodeResponse["data"] | null;
    listShareStock: FetchShareStockItem[] | null;
  };
  status: {
    fetchShareStockCode: ApiStatus;
    fetchListShareStock: ApiStatus;
  };
}

const initialState: PlaceOrderState = {
  data: {
    shareStockCode: null,
    listShareStock: null,
  },
  status: {
    fetchShareStockCode: { loading: false, error: null },
    fetchListShareStock: { loading: false, error: null },
  },
};

const placeOrderSlice = createSlice({
  name: "placeOrder",
  initialState,
  reducers: {
    //Lấy detail mã ck
    fetchShareStockCodeRequest: (
      state,
      action: PayloadAction<{ shareCode: string; volume: number }>
    ) => {
      state.status.fetchShareStockCode = { loading: true, error: null };
      state.data.shareStockCode = null;
    },
    fetchShareStockCodeSuccess: (
      state,
      action: PayloadAction<FetchShareCodeResponse["data"]>
    ) => {
      state.status.fetchShareStockCode = { loading: false, error: null };
      state.data.shareStockCode = action.payload;
    },
    fetchShareStockCodeFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchShareStockCode = {
        loading: false,
        error: action.payload,
      };
      state.data.shareStockCode = null;
    },

    //Lấy list mã chứng khoán
    fetchListShareStockRequest: (state) => {
      state.status.fetchListShareStock = { loading: true, error: null };
      state.data.listShareStock = null;
    },
    fetchListShareStockSuccess: (
      state,
      action: PayloadAction<FetchShareStockItem[]>
    ) => {
      state.status.fetchListShareStock = { loading: false, error: null };
      state.data.listShareStock = action.payload;
    },
    fetchListShareStockFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchListShareStock = {
        loading: false,
        error: action.payload,
      };
      state.data.listShareStock = null;
    },
  },
});

export const {
  fetchShareStockCodeRequest,
  fetchShareStockCodeSuccess,
  fetchShareStockCodeFailure,
  fetchListShareStockRequest,
  fetchListShareStockSuccess,
  fetchListShareStockFailure,
} = placeOrderSlice.actions;

export default placeOrderSlice.reducer;

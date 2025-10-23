import { apiClient } from "../services/apiClient";
import type { FetchShareCodeResponse } from "../types/placeOrder";

export const fetchShareCodeApi = async (
  shareCode: string,
  volume: number
): Promise<FetchShareCodeResponse> => {
  const res = await apiClient.get<FetchShareCodeResponse>(
    `/reference/shares/${shareCode}`,
    {
      params: { volume },
    }
  );
  return res.data;
};

export const fetchShareStockApi = async (): Promise<FetchShareCodeResponse> => {
  const res = await apiClient.get<FetchShareCodeResponse>(`/reference/shares`);
  return res.data;
};

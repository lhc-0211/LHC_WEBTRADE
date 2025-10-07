import axios from "axios";

export const fetchStocksAPI = () => {
  return axios.get("/api/stocks");
};

export const fetchSnapshotAPI = () => {
  return axios.get("/api/snapshot");
};

// export async function loginAPI(data: LoginRequest) {
//   const response = await apiClient.post<LoginResponse>("/auth/login", data);
//   return response.data;
// }

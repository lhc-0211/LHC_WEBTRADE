import axios from "axios";

export const fetchStocksAPI = () => {
  return axios.get("/api/stocks");
};

export const fetchSnapshotAPI = () => {
  return axios.get("/api/snapshot");
};

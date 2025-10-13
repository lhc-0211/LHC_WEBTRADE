import axios from "axios";

export const fetchInfoIndexAPI = () => {
  return axios.get(
    "https://banggia.casc.vn/MDAProxy/getIndex?indexId=001,101,002,301"
  );
};

export const fetchChartIndexAPI = (id: string) => {
  return axios.get(
    `https://banggia.casc.vn/MDAProxy/getIndexHistories/?resolution=1&indexId=${id}`
  );
};

export const fetchTopStockTradedAPI = (id: string) => {
  return axios.get(
    `https://banggia.casc.vn/MDAProxy/getTopStockTraded/?top=${id}`
  );
};

export const fetchTopForeignTradedAPI = (id: string) => {
  return axios.get(
    `https://banggia.casc.vn/MDAProxy/getTopForeignTraded/?top=${id}`
  );
};

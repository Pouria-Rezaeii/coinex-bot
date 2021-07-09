import { axios } from "../axiosInstance";

export const getMarket = (currency: string) =>
  axios
    .get(`market/ticker?market=${currency}`)
    .then((res: any) => res.data.data.ticker.last);

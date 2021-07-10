import { signatureMaker } from "../utils";
import { axios } from "../axiosInstance";
import dotenv from "dotenv";
import { BchWithOthersPair } from "../types";
dotenv.config();

export const cancelOrder = (currency: BchWithOthersPair) => {
  const params = {
    access_id: process.env.ACCESS_ID,
    account_id: 0,
    market: currency,
    tonce: new Date().getDate() + 30000,
  };
  return axios
    .delete("order/pending", {
      headers: { authorization: signatureMaker(params) },
      params,
    })
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

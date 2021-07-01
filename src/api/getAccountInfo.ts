import { signatureMaker } from "../utils";
import { axios } from "../axiosInstance";
import dotenv from "dotenv";
dotenv.config();

export const getAccountInfo = () => {
  const params = {
    access_id: process.env.ACCESS_ID,
    tonce: 1513746038205,
  };
  axios
    .get(`balance/info`, {
      headers: { authorization: signatureMaker(params) },
      params: params,
    })
    .then((response) => response.data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

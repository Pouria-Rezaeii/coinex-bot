import { signatureMaker } from "../utils";
import { axios } from "../axiosInstance";
import dotenv from "dotenv";
dotenv.config();

export const getAccountInfo = () => {
  const params = {
    access_id: process.env.ACCESS_ID,
    tonce: new Date().getDate() + 30000,
  };
  return axios
    .get("balance/info", {
      headers: { authorization: signatureMaker(params) },
      params,
    })
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  bnb: number;
  btc: number;
  bnbBtc: number;
}

export const printBnbBtc = (response: IResponse, wallet: TWallet) => {
  const { bnb, btc, bnbBtc, requestNumber } = response;
  const { BNB, BTC } = wallet;

  const currentBnbValue = (bnb * BNB).toFixed(2);
  const currentBtcValue = (btc * BTC).toFixed(2);
  const balance = (bnb * BNB + btc * BTC).toFixed(2);
  const calculatedBnbBtc = (bnb / btc).toFixed(10);
  const diff = (bnb / btc - bnbBtc).toFixed(10);

  const bnbToBtcDiff = (BNB * bnbBtc * btc - Number(currentBnbValue)).toFixed(
    2
  );
  const bnbToBtc = {
    amount: (BNB * bnbBtc).toFixed(6),
    value: (BNB * bnbBtc * btc).toFixed(2),
    diff: bnbToBtcDiff,
  };

  const btcToBnbDiff = ((BTC / bnbBtc) * bnb - Number(currentBtcValue)).toFixed(
    2
  );
  const btcToBnb = {
    amount: (BTC / bnbBtc).toFixed(2),
    value: ((BTC / bnbBtc) * bnb).toFixed(2),
    diff: btcToBnbDiff,
  };

  const result = {
    type: "bnb-btc",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    bnb,
    btc,
    bnbBtc,
    currentBnbValue,
    currentBtcValue,
    balance,
    calculatedBnbBtc,
    diff,
    bnbToBtc,
    btcToBnb,
  };

  console.log(result);

  if (Number(btcToBnbDiff) > 0.3 || Number(bnbToBtcDiff) > 0.3) {
    fs.appendFile("resultBnbBtc.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

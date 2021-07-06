import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  ada: number;
  btc: number;
  adaBtc: number;
}

export const printAdaBtc = (response: IResponse, wallet: TWallet) => {
  const { ada, btc, adaBtc, requestNumber } = response;
  const { ADA, BTC } = wallet;

  const currentAdaValue = (ada * ADA).toFixed(2);
  const currentBtcValue = (btc * BTC).toFixed(2);
  const balance = (ada * ADA + btc * BTC).toFixed(2);
  const calculatedAdaBtc = (ada / btc).toFixed(10);
  const diff = (ada / btc - adaBtc).toFixed(10);

  const adaToBtcDiff = (ADA * adaBtc * btc - Number(currentAdaValue)).toFixed(
    2
  );
  const adaToBtc = {
    amount: (ADA * adaBtc).toFixed(6),
    value: (ADA * adaBtc * btc).toFixed(2),
    diff: adaToBtcDiff,
  };

  const btcToAdaDiff = ((BTC / adaBtc) * ada - Number(currentBtcValue)).toFixed(
    2
  );
  const btcToAda = {
    amount: (BTC / adaBtc).toFixed(2),
    value: ((BTC / adaBtc) * ada).toFixed(2),
    diff: btcToAdaDiff,
  };

  const result = {
    type: "ada-btc",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    ada,
    btc,
    adaBtc,
    currentAdaValue,
    currentBtcValue,
    balance,
    calculatedAdaBtc,
    diff,
    adaToBtc,
    btcToAda,
  };

  console.log(result);

  if (Number(btcToAdaDiff) > 0.3 || Number(adaToBtcDiff) > 0.3) {
    fs.appendFile("resultAdaBtc.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

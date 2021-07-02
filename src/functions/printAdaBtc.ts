import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  ada: number;
  btc: number;
  adaBtc: number;
}

export const printAdaBtc = (response: IResponse, wallet: TWallet) => {
  const { ada, btc, adaBtc, requestNumber } = response;
  const { ADA_WALLET, BTC_WALLET } = wallet;

  const currentAdaValue = (ada * ADA_WALLET).toFixed(2);
  const currentBtcValue = (btc * BTC_WALLET).toFixed(2);
  const balance = (ada * ADA_WALLET + btc * BTC_WALLET).toFixed(2);
  const calculatedAdaBtc = (ada / btc).toFixed(10);
  const diff = (ada / btc - adaBtc).toFixed(10);

  const adaToBtcDiff = (
    ADA_WALLET * adaBtc * btc -
    Number(currentAdaValue)
  ).toFixed(2);
  const adaToBtc = {
    amount: (ADA_WALLET * adaBtc).toFixed(6),
    value: (ADA_WALLET * adaBtc * btc).toFixed(2),
    diff: adaToBtcDiff,
  };

  const btcToAdaDiff = (
    (BTC_WALLET / adaBtc) * ada -
    Number(currentBtcValue)
  ).toFixed(2);
  const btcToAda = {
    amount: (BTC_WALLET / adaBtc).toFixed(2),
    value: ((BTC_WALLET / adaBtc) * ada).toFixed(2),
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

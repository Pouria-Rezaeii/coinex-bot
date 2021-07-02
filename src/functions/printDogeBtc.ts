import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  doge: number;
  btc: number;
  dogeBtc: number;
}

export const printDogeBtc = (response: IResponse, wallet: TWallet) => {
  const { doge, btc, dogeBtc, requestNumber } = response;
  const { DOGE_WALLET, BTC_WALLET } = wallet;

  const currentDogeValue = (doge * DOGE_WALLET).toFixed(2);
  const currentBtcValue = (btc * BTC_WALLET).toFixed(2);
  const balance = (doge * DOGE_WALLET + btc * BTC_WALLET).toFixed(2);
  const calculatedDogeBtc = (doge / btc).toFixed(10);
  const diff = (doge / btc - dogeBtc).toFixed(10);

  const dogeToBtcDiff = (
    DOGE_WALLET * dogeBtc * btc -
    Number(currentDogeValue)
  ).toFixed(2);
  const dogeToBtc = {
    amount: (DOGE_WALLET * dogeBtc).toFixed(6),
    value: (DOGE_WALLET * dogeBtc * btc).toFixed(2),
    diff: dogeToBtcDiff,
  };

  const btcToDogeDiff = (
    (BTC_WALLET / dogeBtc) * doge -
    Number(currentBtcValue)
  ).toFixed(2);
  const btcToDoge = {
    amount: (BTC_WALLET / dogeBtc).toFixed(2),
    value: ((BTC_WALLET / dogeBtc) * doge).toFixed(2),
    diff: btcToDogeDiff,
  };

  const result = {
    type: "doge-btc",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    doge,
    btc,
    dogeBtc,
    currentDogeValue,
    currentBtcValue,
    balance,
    calculatedDogeBtc,
    diff,
    dogeToBtc,
    btcToDoge,
  };

  console.log(result);

  if (Number(btcToDogeDiff) > 0.3 || Number(dogeToBtcDiff) > 0.3) {
    fs.appendFile("resultDogeBtc.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

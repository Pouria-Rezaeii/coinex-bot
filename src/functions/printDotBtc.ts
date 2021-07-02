import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  dot: number;
  btc: number;
  dotBtc: number;
}

export const printDotBtc = (response: IResponse, wallet: TWallet) => {
  const { dot, btc, dotBtc, requestNumber } = response;
  const { DOT_WALLET, BTC_WALLET } = wallet;

  const currentDotValue = (dot * DOT_WALLET).toFixed(2);
  const currentBtcValue = (btc * BTC_WALLET).toFixed(2);
  const balance = (dot * DOT_WALLET + btc * BTC_WALLET).toFixed(2);
  const calculatedDotBtc = (dot / btc).toFixed(10);
  const diff = (dot / btc - dotBtc).toFixed(10);

  const dotToBtcDiff = (
    DOT_WALLET * dotBtc * btc -
    Number(currentDotValue)
  ).toFixed(2);
  const dotToBtc = {
    amount: (DOT_WALLET * dotBtc).toFixed(6),
    value: (DOT_WALLET * dotBtc * btc).toFixed(2),
    diff: dotToBtcDiff,
  };

  const btcToDotDiff = (
    (BTC_WALLET / dotBtc) * dot -
    Number(currentBtcValue)
  ).toFixed(2);
  const btcToDot = {
    amount: (BTC_WALLET / dotBtc).toFixed(2),
    value: ((BTC_WALLET / dotBtc) * dot).toFixed(2),
    diff: btcToDotDiff,
  };

  const result = {
    type: "dot-btc",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    dot,
    btc,
    dotBtc,
    currentDotValue,
    currentBtcValue,
    balance,
    calculatedDotBtc,
    diff,
    dotToBtc,
    btcToDot,
  };

  console.log(result);

  if (Number(btcToDotDiff) > 0.3 || Number(dotToBtcDiff) > 0.3) {
    fs.appendFile("resultDotBtc.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

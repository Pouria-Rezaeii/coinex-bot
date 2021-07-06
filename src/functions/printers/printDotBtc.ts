import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  dot: number;
  btc: number;
  dotBtc: number;
}

export const printDotBtc = (response: IResponse, wallet: TWallet) => {
  const { dot, btc, dotBtc, requestNumber } = response;
  const { DOT, BTC } = wallet;

  const currentDotValue = (dot * DOT).toFixed(2);
  const currentBtcValue = (btc * BTC).toFixed(2);
  const balance = (dot * DOT + btc * BTC).toFixed(2);
  const calculatedDotBtc = (dot / btc).toFixed(10);
  const diff = (dot / btc - dotBtc).toFixed(10);

  const dotToBtcDiff = (DOT * dotBtc * btc - Number(currentDotValue)).toFixed(
    2
  );
  const dotToBtc = {
    amount: (DOT * dotBtc).toFixed(6),
    value: (DOT * dotBtc * btc).toFixed(2),
    diff: dotToBtcDiff,
  };

  const btcToDotDiff = ((BTC / dotBtc) * dot - Number(currentBtcValue)).toFixed(
    2
  );
  const btcToDot = {
    amount: (BTC / dotBtc).toFixed(2),
    value: ((BTC / dotBtc) * dot).toFixed(2),
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

import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  dot: number;
  bch: number;
  dotBch: number;
}

export const printDotBch = (response: IResponse, wallet: TWallet) => {
  const { dot, bch, dotBch, requestNumber } = response;
  const { DOT_WALLET, BCH_WALLET } = wallet;

  const currentDotValue = (dot * DOT_WALLET).toFixed(2);
  const currentBchValue = (bch * BCH_WALLET).toFixed(2);
  const balance = (dot * DOT_WALLET + bch * BCH_WALLET).toFixed(2);
  const calculatedDotBch = (dot / bch).toFixed(10);
  const diff = (dot / bch - dotBch).toFixed(10);

  const dotToBchDiff = (
    DOT_WALLET * dotBch * bch -
    Number(currentDotValue)
  ).toFixed(2);
  const dotToBch = {
    amount: (DOT_WALLET * dotBch).toFixed(6),
    value: (DOT_WALLET * dotBch * bch).toFixed(2),
    diff: dotToBchDiff,
  };

  const bchToDotDiff = (
    (BCH_WALLET / dotBch) * dot -
    Number(currentBchValue)
  ).toFixed(2);
  const bchToDot = {
    amount: (BCH_WALLET / dotBch).toFixed(2),
    value: ((BCH_WALLET / dotBch) * dot).toFixed(2),
    diff: bchToDotDiff,
  };

  const result = {
    type: "dot-bch",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    dot,
    bch,
    dotBch,
    currentDotValue,
    currentBchValue,
    balance,
    calculatedDotBch,
    diff,
    dotToBch,
    bchToDot,
  };

  console.log(result);

  if (Number(bchToDotDiff) > 0.3 || Number(dotToBchDiff) > 0.3) {
    fs.appendFile("resultDotBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

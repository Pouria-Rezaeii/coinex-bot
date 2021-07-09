import { Wallet } from "../../types";
import fs from "fs";
import { extractCurrencies } from "../../utils";

export const printDotBch = (rq: number, results: string[], wallet: Wallet) => {
  const { dot, bch, dotBch } = extractCurrencies(results);
  const { dot: DOT, bch: BCH } = wallet;

  const currentDotValue = (dot * DOT).toFixed(2);
  const currentBchValue = (bch * BCH).toFixed(2);
  const balance = (dot * DOT + bch * BCH).toFixed(2);
  const calculatedDotBch = (dot / bch).toFixed(10);
  const diff = (dot / bch - dotBch).toFixed(10);

  const dotToBchDiff = (DOT * dotBch * bch - Number(currentDotValue)).toFixed(
    2
  );
  const dotToBch = {
    amount: (DOT * dotBch).toFixed(6),
    value: (DOT * dotBch * bch).toFixed(2),
    diff: dotToBchDiff,
  };

  const bchToDotDiff = ((BCH / dotBch) * dot - Number(currentBchValue)).toFixed(
    2
  );
  const bchToDot = {
    amount: (BCH / dotBch).toFixed(2),
    value: ((BCH / dotBch) * dot).toFixed(2),
    diff: bchToDotDiff,
  };

  const result = {
    type: "dot-bch",
    rq,
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

  if (Number(bchToDotDiff) > 0.03 || Number(dotToBchDiff) > 0.03) {
    fs.appendFile("resultDotBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

import { Wallet } from "../../types";
import fs from "fs";
import { extractCurrencies } from "../../utils";

export const printDogeBch = (rq: number, results: string[], wallet: Wallet) => {
  const { doge, bch, dogeBch } = extractCurrencies(results);
  const { doge: DOGE, bch: BCH } = wallet;

  const currentDogeValue = (doge * DOGE).toFixed(2);
  const currentBchValue = (bch * BCH).toFixed(2);
  const balance = (doge * DOGE + bch * BCH).toFixed(2);
  const calculatedDogeBch = (doge / bch).toFixed(10);
  const diff = (doge / bch - dogeBch).toFixed(10);

  const dogeToBchDiff = (
    DOGE * dogeBch * bch -
    Number(currentDogeValue)
  ).toFixed(2);
  const dogeToBch = {
    amount: (DOGE * dogeBch).toFixed(6),
    value: (DOGE * dogeBch * bch).toFixed(2),
    diff: dogeToBchDiff,
  };

  const bchToDogeDiff = (
    (BCH / dogeBch) * doge -
    Number(currentBchValue)
  ).toFixed(2);
  const bchToDoge = {
    amount: (BCH / dogeBch).toFixed(2),
    value: ((BCH / dogeBch) * doge).toFixed(2),
    diff: bchToDogeDiff,
  };

  const result = {
    type: "doge-bch",
    rq,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    doge,
    bch,
    dogeBch,
    currentDogeValue,
    currentBchValue,
    balance,
    calculatedDogeBch,
    diff,
    dogeToBch,
    bchToDoge,
  };

  if (Number(bchToDogeDiff) > 0.03 || Number(dogeToBchDiff) > 0.03) {
    fs.appendFile("resultDogeBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

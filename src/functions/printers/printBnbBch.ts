import { Wallet } from "../../types";
import fs from "fs";
import { extractCurrencies } from "../../utils";

export const printBnbBch = (rq: number, results: string[], wallet: Wallet) => {
  const { bnb, bch, bnbBch } = extractCurrencies(results);
  const { bnb: BNB, bch: BCH } = wallet;

  const currentBnbValue = (bnb * BNB).toFixed(2);
  const currentBchValue = (bch * BCH).toFixed(2);
  const balance = (bnb * BNB + bch * BCH).toFixed(2);
  const calculatedBnbBch = (bnb / bch).toFixed(10);
  const diff = (bnb / bch - bnbBch).toFixed(10);

  const bnbToBchDiff = (BNB * bnbBch * bch - Number(currentBnbValue)).toFixed(
    2
  );
  const bnbToBch = {
    amount: (BNB * bnbBch).toFixed(6),
    value: (BNB * bnbBch * bch).toFixed(2),
    diff: bnbToBchDiff,
  };

  const bchToBnbDiff = ((BCH / bnbBch) * bnb - Number(currentBchValue)).toFixed(
    2
  );
  const bchToBnb = {
    amount: (BCH / bnbBch).toFixed(2),
    value: ((BCH / bnbBch) * bnb).toFixed(2),
    diff: bchToBnbDiff,
  };

  const result = {
    type: "bnb-bch",
    rq,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    bnb,
    bch,
    bnbBch,
    currentBnbValue,
    currentBchValue,
    balance,
    calculatedBnbBch,
    diff,
    bnbToBch,
    bchToBnb,
  };

  if (Number(bchToBnbDiff) > 0.03 || Number(bnbToBchDiff) > 0.03) {
    fs.appendFile("resultBnbBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

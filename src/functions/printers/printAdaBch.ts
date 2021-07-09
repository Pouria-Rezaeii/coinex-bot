import { Wallet } from "../../types";
import fs from "fs";
import { extractCurrencies } from "../../utils";

export const printAdaBch = (rq: number, results: string[], wallet: Wallet) => {
  const { ada, bch, adaBch } = extractCurrencies(results);
  const { ada: ADA, bch: BCH } = wallet;

  const currentAdaValue = (ada * ADA).toFixed(2);
  const currentBchValue = (bch * BCH).toFixed(2);
  const balance = (ada * ADA + bch * BCH).toFixed(2);
  const calculatedAdaBch = (ada / bch).toFixed(10);
  const diff = (ada / bch - adaBch).toFixed(10);

  const adaToBchDiff = (ADA * adaBch * bch - Number(currentAdaValue)).toFixed(
    2
  );
  const adaToBch = {
    amount: (ADA * adaBch).toFixed(6),
    value: (ADA * adaBch * bch).toFixed(2),
    diff: adaToBchDiff,
  };

  const bchToAdaDiff = ((BCH / adaBch) * ada - Number(currentBchValue)).toFixed(
    2
  );
  const bchToAda = {
    amount: (BCH / adaBch).toFixed(2),
    value: ((BCH / adaBch) * ada).toFixed(2),
    diff: bchToAdaDiff,
  };

  const result = {
    type: "ada-bch",
    rq,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    ada,
    bch,
    adaBch,
    currentAdaValue,
    currentBchValue,
    balance,
    calculatedAdaBch,
    diff,
    adaToBch,
    bchToAda,
  };

  if (Number(bchToAdaDiff) > 0.03 || Number(adaToBchDiff) > 0.03) {
    fs.appendFile("resultAdaBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

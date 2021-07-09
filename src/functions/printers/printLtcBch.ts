import { Wallet } from "../../types";
import fs from "fs";
import { extractCurrencies } from "../../utils";

export const printLtcBch = (rq: number, results: string[], wallet: Wallet) => {
  const { ltc, bch, ltcBch } = extractCurrencies(results);
  const { ltc: LTC, bch: BCH } = wallet;

  const currentLtcValue = (ltc * LTC).toFixed(2);
  const currentBchValue = (bch * BCH).toFixed(2);
  const balance = (ltc * LTC + bch * BCH).toFixed(2);
  const calculatedLtcBch = (ltc / bch).toFixed(10);
  const diff = (ltc / bch - ltcBch).toFixed(10);

  const ltcToBchDiff = (LTC * ltcBch * bch - Number(currentLtcValue)).toFixed(
    2
  );
  const ltcToBch = {
    amount: (LTC * ltcBch).toFixed(6),
    value: (LTC * ltcBch * bch).toFixed(2),
    diff: ltcToBchDiff,
  };

  const bchToLtcDiff = ((BCH / ltcBch) * ltc - Number(currentBchValue)).toFixed(
    2
  );
  const bchToLtc = {
    amount: (BCH / ltcBch).toFixed(2),
    value: ((BCH / ltcBch) * ltc).toFixed(2),
    diff: bchToLtcDiff,
  };

  const result = {
    type: "ltc-bch",
    rq,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    ltc,
    bch,
    ltcBch,
    currentLtcValue,
    currentBchValue,
    balance,
    calculatedLtcBch,
    diff,
    ltcToBch,
    bchToLtc,
  };

  if (Number(bchToLtcDiff) > 0.03 || Number(ltcToBchDiff) > 0.03) {
    fs.appendFile("resultLtcBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

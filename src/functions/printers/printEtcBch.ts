import { Wallet } from "../../types";
import fs from "fs";
import { extractCurrencies } from "../../utils";

export const printEtcBch = (rq: number, results: string[], wallet: Wallet) => {
  const { etc, bch, etcBch } = extractCurrencies(results);
  const { etc: ETC, bch: BCH } = wallet;

  const currentEtcValue = (etc * ETC).toFixed(2);
  const currentBchValue = (bch * BCH).toFixed(2);
  const balance = (etc * ETC + bch * BCH).toFixed(2);
  const calculatedEtcBch = (etc / bch).toFixed(10);
  const diff = (etc / bch - etcBch).toFixed(10);

  const etcToBchDiff = (ETC * etcBch * bch - Number(currentEtcValue)).toFixed(
    2
  );
  const etcToBch = {
    amount: (ETC * etcBch).toFixed(6),
    value: (ETC * etcBch * bch).toFixed(2),
    diff: etcToBchDiff,
  };

  const bchToEtcDiff = ((BCH / etcBch) * etc - Number(currentBchValue)).toFixed(
    2
  );
  const bchToEtc = {
    amount: (BCH / etcBch).toFixed(2),
    value: ((BCH / etcBch) * etc).toFixed(2),
    diff: bchToEtcDiff,
  };

  const result = {
    type: "etc-bch",
    rq,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    etc,
    bch,
    etcBch,
    currentEtcValue,
    currentBchValue,
    balance,
    calculatedEtcBch,
    diff,
    etcToBch,
    bchToEtc,
  };

  if (Number(bchToEtcDiff) > 0.03 || Number(etcToBchDiff) > 0.03) {
    fs.appendFile("resultEtcBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

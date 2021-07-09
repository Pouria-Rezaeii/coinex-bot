import { Wallet } from "../../types";
import fs from "fs";
import { extractCurrencies } from "../../utils";

export const printXrpBch = (rq: number, results: string[], wallet: Wallet) => {
  const { xrp, bch, xrpBch } = extractCurrencies(results);
  const { xrp: XRP, bch: BCH } = wallet;

  const currentXrpValue = (xrp * XRP).toFixed(2);
  const currentBchValue = (bch * BCH).toFixed(2);
  const balance = (xrp * XRP + bch * BCH).toFixed(2);
  const calculatedXrpBch = (xrp / bch).toFixed(10);
  const diff = (xrp / bch - xrpBch).toFixed(10);

  const xrpToBchDiff = (XRP * xrpBch * bch - Number(currentXrpValue)).toFixed(
    2
  );
  const xrpToBch = {
    amount: (XRP * xrpBch).toFixed(6),
    value: (XRP * xrpBch * bch).toFixed(2),
    diff: xrpToBchDiff,
  };

  const bchToXrpDiff = ((BCH / xrpBch) * xrp - Number(currentBchValue)).toFixed(
    2
  );
  const bchToXrp = {
    amount: (BCH / xrpBch).toFixed(2),
    value: ((BCH / xrpBch) * xrp).toFixed(2),
    diff: bchToXrpDiff,
  };

  const result = {
    type: "xrp-bch",
    rq,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    xrp,
    bch,
    xrpBch,
    currentXrpValue,
    currentBchValue,
    balance,
    calculatedXrpBch,
    diff,
    xrpToBch,
    bchToXrp,
  };

  if (Number(bchToXrpDiff) > 0.03 || Number(xrpToBchDiff) > 0.03) {
    fs.appendFile("resultXrpBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

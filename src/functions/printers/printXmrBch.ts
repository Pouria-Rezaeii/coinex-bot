import { Wallet } from "../../types";
import fs from "fs";
import { extractCurrencies } from "../../utils";

export const printXmrBch = (rq: number, results: string[], wallet: Wallet) => {
  // const { xmr, bch, xmrBch } = extractCurrencies(results);
  // const { xmr: XMR, bch: BCH } = wallet;
  // const currentXmrValue = (xmr * XMR).toFixed(2);
  // const currentBchValue = (bch * BCH).toFixed(2);
  // const balance = (xmr * XMR + bch * BCH).toFixed(2);
  // const calculatedXmrBch = (xmr / bch).toFixed(10);
  // const diff = (xmr / bch - xmrBch).toFixed(10);
  // const xmrToBchDiff = (XMR * xmrBch * bch - Number(currentXmrValue)).toFixed(
  //   2
  // );
  // const xmrToBch = {
  //   amount: (XMR * xmrBch).toFixed(6),
  //   value: (XMR * xmrBch * bch).toFixed(2),
  //   diff: xmrToBchDiff,
  // };
  // const bchToXmrDiff = ((BCH / xmrBch) * xmr - Number(currentBchValue)).toFixed(
  //   2
  // );
  // const bchToXmr = {
  //   amount: (BCH / xmrBch).toFixed(2),
  //   value: ((BCH / xmrBch) * xmr).toFixed(2),
  //   diff: bchToXmrDiff,
  // };
  // const result = {
  //   type: "xmr-bch",
  //   rq,
  //   time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
  //   xmr,
  //   bch,
  //   xmrBch,
  //   currentXmrValue,
  //   currentBchValue,
  //   balance,
  //   calculatedXmrBch,
  //   diff,
  //   xmrToBch,
  //   bchToXmr,
  // };
  // console.log(result);
  // if (Number(bchToXmrDiff) > 0.03 || Number(xmrToBchDiff) > 0.03) {
  //   fs.appendFile("resultXmrBch.txt", `${JSON.stringify(result)}\n`, () => {});
  // }
};

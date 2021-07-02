import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  xmr: number;
  bch: number;
  xmrBch: number;
}

export const printXmrBch = (response: IResponse, wallet: TWallet) => {
  const { xmr, bch, xmrBch, requestNumber } = response;
  const { XMR_WALLET, BCH_WALLET } = wallet;

  const currentXmrValue = (xmr * XMR_WALLET).toFixed(2);
  const currentBchValue = (bch * BCH_WALLET).toFixed(2);
  const balance = (xmr * XMR_WALLET + bch * BCH_WALLET).toFixed(2);
  const calculatedXmrBch = (xmr / bch).toFixed(10);
  const diff = (xmr / bch - xmrBch).toFixed(10);

  const xmrToBchDiff = (
    XMR_WALLET * xmrBch * bch -
    Number(currentXmrValue)
  ).toFixed(2);
  const xmrToBch = {
    amount: (XMR_WALLET * xmrBch).toFixed(6),
    value: (XMR_WALLET * xmrBch * bch).toFixed(2),
    diff: xmrToBchDiff,
  };

  const bchToXmrDiff = (
    (BCH_WALLET / xmrBch) * xmr -
    Number(currentBchValue)
  ).toFixed(2);
  const bchToXmr = {
    amount: (BCH_WALLET / xmrBch).toFixed(2),
    value: ((BCH_WALLET / xmrBch) * xmr).toFixed(2),
    diff: bchToXmrDiff,
  };

  const result = {
    type: "xmr-bch",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    xmr,
    bch,
    xmrBch,
    currentXmrValue,
    currentBchValue,
    balance,
    calculatedXmrBch,
    diff,
    xmrToBch,
    bchToXmr,
  };

  console.log(result);

  if (Number(bchToXmrDiff) > 0.3 || Number(xmrToBchDiff) > 0.3) {
    fs.appendFile("resultXmrBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

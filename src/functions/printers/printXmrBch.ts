import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  xmr: number;
  bch: number;
  xmrBch: number;
}

export const printXmrBch = (response: IResponse, wallet: TWallet) => {
  const { xmr, bch, xmrBch, requestNumber } = response;
  const { XMR, BCH } = wallet;

  const currentXmrValue = (xmr * XMR).toFixed(2);
  const currentBchValue = (bch * BCH).toFixed(2);
  const balance = (xmr * XMR + bch * BCH).toFixed(2);
  const calculatedXmrBch = (xmr / bch).toFixed(10);
  const diff = (xmr / bch - xmrBch).toFixed(10);

  const xmrToBchDiff = (XMR * xmrBch * bch - Number(currentXmrValue)).toFixed(
    2
  );
  const xmrToBch = {
    amount: (XMR * xmrBch).toFixed(6),
    value: (XMR * xmrBch * bch).toFixed(2),
    diff: xmrToBchDiff,
  };

  const bchToXmrDiff = ((BCH / xmrBch) * xmr - Number(currentBchValue)).toFixed(
    2
  );
  const bchToXmr = {
    amount: (BCH / xmrBch).toFixed(2),
    value: ((BCH / xmrBch) * xmr).toFixed(2),
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

import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  xrp: number;
  bch: number;
  xrpBch: number;
}

export const printXrpBch = (response: IResponse, wallet: TWallet) => {
  const { xrp, bch, xrpBch, requestNumber } = response;
  const { XRP, BCH } = wallet;

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
    rq: requestNumber,
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

  console.log(result);

  if (Number(bchToXrpDiff) > 0.3 || Number(xrpToBchDiff) > 0.3) {
    fs.appendFile("resultXrpBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

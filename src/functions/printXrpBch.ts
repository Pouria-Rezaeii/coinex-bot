import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  xrp: number;
  bch: number;
  xrpBch: number;
}

export const printXrpBch = (response: IResponse, wallet: TWallet) => {
  const { xrp, bch, xrpBch, requestNumber } = response;
  const { XRP_WALLET, BCH_WALLET } = wallet;

  const currentXrpValue = (xrp * XRP_WALLET).toFixed(2);
  const currentBchValue = (bch * BCH_WALLET).toFixed(2);
  const balance = (xrp * XRP_WALLET + bch * BCH_WALLET).toFixed(2);
  const calculatedXrpBch = (xrp / bch).toFixed(10);
  const diff = (xrp / bch - xrpBch).toFixed(10);

  const xrpToBchDiff = (
    XRP_WALLET * xrpBch * bch -
    Number(currentXrpValue)
  ).toFixed(2);
  const xrpToBch = {
    amount: (XRP_WALLET * xrpBch).toFixed(6),
    value: (XRP_WALLET * xrpBch * bch).toFixed(2),
    diff: xrpToBchDiff,
  };

  const bchToXrpDiff = (
    (BCH_WALLET / xrpBch) * xrp -
    Number(currentBchValue)
  ).toFixed(2);
  const bchToXrp = {
    amount: (BCH_WALLET / xrpBch).toFixed(2),
    value: ((BCH_WALLET / xrpBch) * xrp).toFixed(2),
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

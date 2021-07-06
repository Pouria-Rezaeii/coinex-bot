import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  ltc: number;
  bch: number;
  ltcBch: number;
}

export const printLtcBch = (response: IResponse, wallet: TWallet) => {
  const { ltc, bch, ltcBch, requestNumber } = response;
  const { LTC, BCH } = wallet;

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
    rq: requestNumber,
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

  // console.log(result);

  if (Number(bchToLtcDiff) > 0.3 || Number(ltcToBchDiff) > 0.3) {
    fs.appendFile("resultLtcBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

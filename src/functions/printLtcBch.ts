import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  ltc: number;
  bch: number;
  ltcBch: number;
}

export const printLtcBch = (response: IResponse, wallet: TWallet) => {
  const { ltc, bch, ltcBch, requestNumber } = response;
  const { LTC_WALLET, BCH_WALLET } = wallet;

  const currentLtcValue = (ltc * LTC_WALLET).toFixed(2);
  const currentBchValue = (bch * BCH_WALLET).toFixed(2);
  const balance = (ltc * LTC_WALLET + bch * BCH_WALLET).toFixed(2);
  const calculatedLtcBch = (ltc / bch).toFixed(10);
  const diff = (ltc / bch - ltcBch).toFixed(10);

  const ltcToBchDiff = (
    LTC_WALLET * ltcBch * bch -
    Number(currentLtcValue)
  ).toFixed(2);
  const ltcToBch = {
    amount: (LTC_WALLET * ltcBch).toFixed(6),
    value: (LTC_WALLET * ltcBch * bch).toFixed(2),
    diff: ltcToBchDiff,
  };

  const bchToLtcDiff = (
    (BCH_WALLET / ltcBch) * ltc -
    Number(currentBchValue)
  ).toFixed(2);
  const bchToLtc = {
    amount: (BCH_WALLET / ltcBch).toFixed(2),
    value: ((BCH_WALLET / ltcBch) * ltc).toFixed(2),
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

  console.log(result);

  if (Number(bchToLtcDiff) > 0.3 || Number(ltcToBchDiff) > 0.3) {
    fs.appendFile("resultLtcBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

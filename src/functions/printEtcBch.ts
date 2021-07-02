import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  etc: number;
  bch: number;
  etcBch: number;
}

export const printEtcBch = (response: IResponse, wallet: TWallet) => {
  const { etc, bch, etcBch, requestNumber } = response;
  const { ETC_WALLET, BCH_WALLET } = wallet;

  const currentEtcValue = (etc * ETC_WALLET).toFixed(2);
  const currentBchValue = (bch * BCH_WALLET).toFixed(2);
  const balance = (etc * ETC_WALLET + bch * BCH_WALLET).toFixed(2);
  const calculatedEtcBch = (etc / bch).toFixed(10);
  const diff = (etc / bch - etcBch).toFixed(10);

  const etcToBchDiff = (
    ETC_WALLET * etcBch * bch -
    Number(currentEtcValue)
  ).toFixed(2);
  const etcToBch = {
    amount: (ETC_WALLET * etcBch).toFixed(6),
    value: (ETC_WALLET * etcBch * bch).toFixed(2),
    diff: etcToBchDiff,
  };

  const bchToEtcDiff = (
    (BCH_WALLET / etcBch) * etc -
    Number(currentBchValue)
  ).toFixed(2);
  const bchToEtc = {
    amount: (BCH_WALLET / etcBch).toFixed(2),
    value: ((BCH_WALLET / etcBch) * etc).toFixed(2),
    diff: bchToEtcDiff,
  };

  const result = {
    type: "etc-bch",
    rq: requestNumber,
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

  console.log(result);

  if (Number(bchToEtcDiff) > 0.3 || Number(etcToBchDiff) > 0.3) {
    fs.appendFile("resultEtcBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

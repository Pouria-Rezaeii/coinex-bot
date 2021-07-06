import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  etc: number;
  bch: number;
  etcBch: number;
}

export const printEtcBch = (response: IResponse, wallet: TWallet) => {
  const { etc, bch, etcBch, requestNumber } = response;
  const { ETC, BCH } = wallet;

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

  // console.log(result);

  if (Number(bchToEtcDiff) > 0.3 || Number(etcToBchDiff) > 0.3) {
    fs.appendFile("resultEtcBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

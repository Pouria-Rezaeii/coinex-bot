import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  ada: number;
  bch: number;
  adaBch: number;
}

export const printAdaBch = (response: IResponse, wallet: TWallet) => {
  const { ada, bch, adaBch, requestNumber } = response;
  const { ADA_WALLET, BCH_WALLET } = wallet;

  const currentAdaValue = (ada * ADA_WALLET).toFixed(2);
  const currentBchValue = (bch * BCH_WALLET).toFixed(2);
  const balance = (ada * ADA_WALLET + bch * BCH_WALLET).toFixed(2);
  const calculatedAdaBch = (ada / bch).toFixed(10);
  const diff = (ada / bch - adaBch).toFixed(10);

  const adaToBchDiff = (
    ADA_WALLET * adaBch * bch -
    Number(currentAdaValue)
  ).toFixed(2);
  const adaToBch = {
    amount: (ADA_WALLET * adaBch).toFixed(6),
    value: (ADA_WALLET * adaBch * bch).toFixed(2),
    diff: adaToBchDiff,
  };

  const bchToAdaDiff = (
    (BCH_WALLET / adaBch) * ada -
    Number(currentBchValue)
  ).toFixed(2);
  const bchToAda = {
    amount: (BCH_WALLET / adaBch).toFixed(2),
    value: ((BCH_WALLET / adaBch) * ada).toFixed(2),
    diff: bchToAdaDiff,
  };

  const result = {
    type: "ada-bch",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    ada,
    bch,
    adaBch,
    currentAdaValue,
    currentBchValue,
    balance,
    calculatedAdaBch,
    diff,
    adaToBch,
    bchToAda,
  };

  console.log(result);

  if (Number(bchToAdaDiff) > 0.3 || Number(adaToBchDiff) > 0.3) {
    fs.appendFile("resultAdaBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

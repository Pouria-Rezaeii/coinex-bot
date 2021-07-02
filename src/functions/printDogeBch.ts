import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  doge: number;
  bch: number;
  dogeBch: number;
}

export const printDogeBch = (response: IResponse, wallet: TWallet) => {
  const { doge, bch, dogeBch, requestNumber } = response;
  const { DOGE_WALLET, BCH_WALLET } = wallet;

  const currentDogeValue = (doge * DOGE_WALLET).toFixed(2);
  const currentBchValue = (bch * BCH_WALLET).toFixed(2);
  const balance = (doge * DOGE_WALLET + bch * BCH_WALLET).toFixed(2);
  const calculatedDogeBch = (doge / bch).toFixed(10);
  const diff = (doge / bch - dogeBch).toFixed(10);

  const dogeToBchDiff = (
    DOGE_WALLET * dogeBch * bch -
    Number(currentDogeValue)
  ).toFixed(2);
  const dogeToBch = {
    amount: (DOGE_WALLET * dogeBch).toFixed(6),
    value: (DOGE_WALLET * dogeBch * bch).toFixed(2),
    diff: dogeToBchDiff,
  };

  const bchToDogeDiff = (
    (BCH_WALLET / dogeBch) * doge -
    Number(currentBchValue)
  ).toFixed(2);
  const bchToDoge = {
    amount: (BCH_WALLET / dogeBch).toFixed(2),
    value: ((BCH_WALLET / dogeBch) * doge).toFixed(2),
    diff: bchToDogeDiff,
  };

  const result = {
    type: "doge-bch",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    doge,
    bch,
    dogeBch,
    currentDogeValue,
    currentBchValue,
    balance,
    calculatedDogeBch,
    diff,
    dogeToBch,
    bchToDoge,
  };

  console.log(result);

  if (Number(bchToDogeDiff) > 0.3 || Number(dogeToBchDiff) > 0.3) {
    fs.appendFile("resultDogeBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

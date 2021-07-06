import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  bnb: number;
  bch: number;
  bnbBch: number;
}

export const printBnbBch = (response: IResponse, wallet: TWallet) => {
  const { bnb, bch, bnbBch, requestNumber } = response;
  const { BNB, BCH } = wallet;

  const currentBnbValue = (bnb * BNB).toFixed(2);
  const currentBchValue = (bch * BCH).toFixed(2);
  const balance = (bnb * BNB + bch * BCH).toFixed(2);
  const calculatedBnbBch = (bnb / bch).toFixed(10);
  const diff = (bnb / bch - bnbBch).toFixed(10);

  const bnbToBchDiff = (BNB * bnbBch * bch - Number(currentBnbValue)).toFixed(
    2
  );
  const bnbToBch = {
    amount: (BNB * bnbBch).toFixed(6),
    value: (BNB * bnbBch * bch).toFixed(2),
    diff: bnbToBchDiff,
  };

  const bchToBnbDiff = ((BCH / bnbBch) * bnb - Number(currentBchValue)).toFixed(
    2
  );
  const bchToBnb = {
    amount: (BCH / bnbBch).toFixed(2),
    value: ((BCH / bnbBch) * bnb).toFixed(2),
    diff: bchToBnbDiff,
  };

  const result = {
    type: "bnb-bch",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    bnb,
    bch,
    bnbBch,
    currentBnbValue,
    currentBchValue,
    balance,
    calculatedBnbBch,
    diff,
    bnbToBch,
    bchToBnb,
  };

  // console.log(result);

  if (Number(bchToBnbDiff) > 0.3 || Number(bnbToBchDiff) > 0.3) {
    fs.appendFile("resultBnbBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

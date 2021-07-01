import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  cet: number;
  bch: number;
  cetBch: number;
}

export const printCetBch = (response: IResponse, wallet: TWallet) => {
  const { cet, bch, cetBch, requestNumber } = response;
  const { CET_WALLET, BCH_WALLET } = wallet;

  const currentCetValue = (cet * CET_WALLET).toFixed(2);
  const currentBchValue = (bch * BCH_WALLET).toFixed(2);
  const balance = (cet * CET_WALLET + bch * BCH_WALLET).toFixed(2);
  const calculatedCetBch = (cet / bch).toFixed(10);
  const diff = (cet / bch - cetBch).toFixed(10);

  const cetToBchDiff = (
    CET_WALLET * cetBch * bch -
    Number(currentCetValue)
  ).toFixed(2);
  const cetToBch = {
    amount: (CET_WALLET * cetBch).toFixed(6),
    value: (CET_WALLET * cetBch * bch).toFixed(2),
    diff: cetToBchDiff,
  };

  const bchToCetDiff = (
    (BCH_WALLET / cetBch) * cet -
    Number(currentBchValue)
  ).toFixed(2);
  const bchToCet = {
    amount: (BCH_WALLET / cetBch).toFixed(2),
    value: ((BCH_WALLET / cetBch) * cet).toFixed(2),
    diff: bchToCetDiff,
  };

  const result = {
    type: "cet-bch",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    cet,
    bch,
    cetBch,
    currentCetValue,
    currentBchValue,
    balance,
    calculatedCetBch,
    diff,
    cetToBch,
    bchToCet,
  };

  console.log(result);

  if (Number(bchToCetDiff) > 0.3 || Number(cetToBchDiff) > 0.3) {
    fs.appendFile("resultCetBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

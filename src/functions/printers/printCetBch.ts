import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  cet: number;
  bch: number;
  cetBch: number;
}

export const printCetBch = (response: IResponse, wallet: TWallet) => {
  const { cet, bch, cetBch, requestNumber } = response;
  const { CET, BCH } = wallet;

  const currentCetValue = (cet * CET).toFixed(2);
  const currentBchValue = (bch * BCH).toFixed(2);
  const balance = (cet * CET + bch * BCH).toFixed(2);
  const calculatedCetBch = (cet / bch).toFixed(10);
  const diff = (cet / bch - cetBch).toFixed(10);

  const cetToBchDiff = (CET * cetBch * bch - Number(currentCetValue)).toFixed(
    2
  );
  const cetToBch = {
    amount: (CET * cetBch).toFixed(6),
    value: (CET * cetBch * bch).toFixed(2),
    diff: cetToBchDiff,
  };

  const bchToCetDiff = ((BCH / cetBch) * cet - Number(currentBchValue)).toFixed(
    2
  );
  const bchToCet = {
    amount: (BCH / cetBch).toFixed(2),
    value: ((BCH / cetBch) * cet).toFixed(2),
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

import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  sol: number;
  bch: number;
  solBch: number;
}

export const printSolBch = (response: IResponse, wallet: TWallet) => {
  const { sol, bch, solBch, requestNumber } = response;
  const { SOL, BCH } = wallet;

  const currentSolValue = (sol * SOL).toFixed(2);
  const currentBchValue = (bch * BCH).toFixed(2);
  const balance = (sol * SOL + bch * BCH).toFixed(2);
  const calculatedSolBch = (sol / bch).toFixed(10);
  const diff = (sol / bch - solBch).toFixed(10);

  const solToBchDiff = (SOL * solBch * bch - Number(currentSolValue)).toFixed(
    2
  );
  const solToBch = {
    amount: (SOL * solBch).toFixed(6),
    value: (SOL * solBch * bch).toFixed(2),
    diff: solToBchDiff,
  };

  const bchToSolDiff = ((BCH / solBch) * sol - Number(currentBchValue)).toFixed(
    2
  );
  const bchToSol = {
    amount: (BCH / solBch).toFixed(2),
    value: ((BCH / solBch) * sol).toFixed(2),
    diff: bchToSolDiff,
  };

  const result = {
    type: "sol-bch",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    sol,
    bch,
    solBch,
    currentSolValue,
    currentBchValue,
    balance,
    calculatedSolBch,
    diff,
    solToBch,
    bchToSol,
  };

  // console.log(result);

  if (Number(bchToSolDiff) > 0.3 || Number(solToBchDiff) > 0.3) {
    fs.appendFile("resultSolBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

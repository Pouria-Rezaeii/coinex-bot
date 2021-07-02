import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  sol: number;
  bch: number;
  solBch: number;
}

export const printSolBch = (response: IResponse, wallet: TWallet) => {
  const { sol, bch, solBch, requestNumber } = response;
  const { SOL_WALLET, BCH_WALLET } = wallet;

  const currentSolValue = (sol * SOL_WALLET).toFixed(2);
  const currentBchValue = (bch * BCH_WALLET).toFixed(2);
  const balance = (sol * SOL_WALLET + bch * BCH_WALLET).toFixed(2);
  const calculatedSolBch = (sol / bch).toFixed(10);
  const diff = (sol / bch - solBch).toFixed(10);

  const solToBchDiff = (
    SOL_WALLET * solBch * bch -
    Number(currentSolValue)
  ).toFixed(2);
  const solToBch = {
    amount: (SOL_WALLET * solBch).toFixed(6),
    value: (SOL_WALLET * solBch * bch).toFixed(2),
    diff: solToBchDiff,
  };

  const bchToSolDiff = (
    (BCH_WALLET / solBch) * sol -
    Number(currentBchValue)
  ).toFixed(2);
  const bchToSol = {
    amount: (BCH_WALLET / solBch).toFixed(2),
    value: ((BCH_WALLET / solBch) * sol).toFixed(2),
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

  console.log(result);

  if (Number(bchToSolDiff) > 0.3 || Number(solToBchDiff) > 0.3) {
    fs.appendFile("resultSolBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

import { Wallet } from "../../types";
import fs from "fs";
import { extractCurrencies } from "../../utils";

export const printSolBch = (rq: number, results: string[], wallet: Wallet) => {
  const { sol, bch, solBch } = extractCurrencies(results);
  const { sol: SOL, bch: BCH } = wallet;

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
    rq,
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

  if (Number(bchToSolDiff) > 0.03 || Number(solToBchDiff) > 0.03) {
    fs.appendFile("resultSolBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

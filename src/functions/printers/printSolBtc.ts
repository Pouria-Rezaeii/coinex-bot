import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  sol: number;
  btc: number;
  solBtc: number;
}

export const printSolBtc = (response: IResponse, wallet: TWallet) => {
  const { sol, btc, solBtc, requestNumber } = response;
  const { SOL, BTC } = wallet;

  const currentSolValue = (sol * SOL).toFixed(2);
  const currentBtcValue = (btc * BTC).toFixed(2);
  const balance = (sol * SOL + btc * BTC).toFixed(2);
  const calculatedSolBtc = (sol / btc).toFixed(10);
  const diff = (sol / btc - solBtc).toFixed(10);

  const solToBtcDiff = (SOL * solBtc * btc - Number(currentSolValue)).toFixed(
    2
  );
  const solToBtc = {
    amount: (SOL * solBtc).toFixed(6),
    value: (SOL * solBtc * btc).toFixed(2),
    diff: solToBtcDiff,
  };

  const btcToSolDiff = ((BTC / solBtc) * sol - Number(currentBtcValue)).toFixed(
    2
  );
  const btcToSol = {
    amount: (BTC / solBtc).toFixed(2),
    value: ((BTC / solBtc) * sol).toFixed(2),
    diff: btcToSolDiff,
  };

  const result = {
    type: "sol-btc",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    sol,
    btc,
    solBtc,
    currentSolValue,
    currentBtcValue,
    balance,
    calculatedSolBtc,
    diff,
    solToBtc,
    btcToSol,
  };

  console.log(result);

  if (Number(btcToSolDiff) > 0.3 || Number(solToBtcDiff) > 0.3) {
    fs.appendFile("resultSolBtc.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

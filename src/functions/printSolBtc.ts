import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  sol: number;
  btc: number;
  solBtc: number;
}

export const printSolBtc = (response: IResponse, wallet: TWallet) => {
  const { sol, btc, solBtc, requestNumber } = response;
  const { SOL_WALLET, BTC_WALLET } = wallet;

  const currentSolValue = (sol * SOL_WALLET).toFixed(2);
  const currentBtcValue = (btc * BTC_WALLET).toFixed(2);
  const balance = (sol * SOL_WALLET + btc * BTC_WALLET).toFixed(2);
  const calculatedSolBtc = (sol / btc).toFixed(10);
  const diff = (sol / btc - solBtc).toFixed(10);

  const solToBtcDiff = (
    SOL_WALLET * solBtc * btc -
    Number(currentSolValue)
  ).toFixed(2);
  const solToBtc = {
    amount: (SOL_WALLET * solBtc).toFixed(6),
    value: (SOL_WALLET * solBtc * btc).toFixed(2),
    diff: solToBtcDiff,
  };

  const btcToSolDiff = (
    (BTC_WALLET / solBtc) * sol -
    Number(currentBtcValue)
  ).toFixed(2);
  const btcToSol = {
    amount: (BTC_WALLET / solBtc).toFixed(2),
    value: ((BTC_WALLET / solBtc) * sol).toFixed(2),
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

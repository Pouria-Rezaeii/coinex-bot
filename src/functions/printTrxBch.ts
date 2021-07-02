import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  trx: number;
  bch: number;
  trxBch: number;
}

export const printTrxBch = (response: IResponse, wallet: TWallet) => {
  const { trx, bch, trxBch, requestNumber } = response;
  const { TRX_WALLET, BCH_WALLET } = wallet;

  const currentTrxValue = (trx * TRX_WALLET).toFixed(2);
  const currentBchValue = (bch * BCH_WALLET).toFixed(2);
  const balance = (trx * TRX_WALLET + bch * BCH_WALLET).toFixed(2);
  const calculatedTrxBch = (trx / bch).toFixed(10);
  const diff = (trx / bch - trxBch).toFixed(10);

  const trxToBchDiff = (
    TRX_WALLET * trxBch * bch -
    Number(currentTrxValue)
  ).toFixed(2);
  const trxToBch = {
    amount: (TRX_WALLET * trxBch).toFixed(6),
    value: (TRX_WALLET * trxBch * bch).toFixed(2),
    diff: trxToBchDiff,
  };

  const bchToTrxDiff = (
    (BCH_WALLET / trxBch) * trx -
    Number(currentBchValue)
  ).toFixed(2);
  const bchToTrx = {
    amount: (BCH_WALLET / trxBch).toFixed(2),
    value: ((BCH_WALLET / trxBch) * trx).toFixed(2),
    diff: bchToTrxDiff,
  };

  const result = {
    type: "trx-bch",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    trx,
    bch,
    trxBch,
    currentTrxValue,
    currentBchValue,
    balance,
    calculatedTrxBch,
    diff,
    trxToBch,
    bchToTrx,
  };

  console.log(result);

  if (Number(bchToTrxDiff) > 0.3 || Number(trxToBchDiff) > 0.3) {
    fs.appendFile("resultTrxBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

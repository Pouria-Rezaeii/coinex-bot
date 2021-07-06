import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  trx: number;
  bch: number;
  trxBch: number;
}

export const printTrxBch = (response: IResponse, wallet: TWallet) => {
  const { trx, bch, trxBch, requestNumber } = response;
  const { TRX, BCH } = wallet;

  const currentTrxValue = (trx * TRX).toFixed(2);
  const currentBchValue = (bch * BCH).toFixed(2);
  const balance = (trx * TRX + bch * BCH).toFixed(2);
  const calculatedTrxBch = (trx / bch).toFixed(10);
  const diff = (trx / bch - trxBch).toFixed(10);

  const trxToBchDiff = (TRX * trxBch * bch - Number(currentTrxValue)).toFixed(
    2
  );
  const trxToBch = {
    amount: (TRX * trxBch).toFixed(6),
    value: (TRX * trxBch * bch).toFixed(2),
    diff: trxToBchDiff,
  };

  const bchToTrxDiff = ((BCH / trxBch) * trx - Number(currentBchValue)).toFixed(
    2
  );
  const bchToTrx = {
    amount: (BCH / trxBch).toFixed(2),
    value: ((BCH / trxBch) * trx).toFixed(2),
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

  // console.log(result);

  if (Number(bchToTrxDiff) > 0.3 || Number(trxToBchDiff) > 0.3) {
    fs.appendFile("resultTrxBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

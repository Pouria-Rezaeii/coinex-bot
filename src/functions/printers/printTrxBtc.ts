import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  trx: number;
  btc: number;
  trxBtc: number;
}

export const printTrxBtc = (response: IResponse, wallet: TWallet) => {
  const { trx, btc, trxBtc, requestNumber } = response;
  const { TRX, BTC } = wallet;

  const currentTrxValue = (trx * TRX).toFixed(2);
  const currentBtcValue = (btc * BTC).toFixed(2);
  const balance = (trx * TRX + btc * BTC).toFixed(2);
  const calculatedTrxBtc = (trx / btc).toFixed(10);
  const diff = (trx / btc - trxBtc).toFixed(10);

  const trxToBtcDiff = (TRX * trxBtc * btc - Number(currentTrxValue)).toFixed(
    2
  );
  const trxToBtc = {
    amount: (TRX * trxBtc).toFixed(6),
    value: (TRX * trxBtc * btc).toFixed(2),
    diff: trxToBtcDiff,
  };

  const btcToTrxDiff = ((BTC / trxBtc) * trx - Number(currentBtcValue)).toFixed(
    2
  );
  const btcToTrx = {
    amount: (BTC / trxBtc).toFixed(2),
    value: ((BTC / trxBtc) * trx).toFixed(2),
    diff: btcToTrxDiff,
  };

  const result = {
    type: "trx-btc",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    trx,
    btc,
    trxBtc,
    currentTrxValue,
    currentBtcValue,
    balance,
    calculatedTrxBtc,
    diff,
    trxToBtc,
    btcToTrx,
  };

  console.log(result);

  if (Number(btcToTrxDiff) > 0.3 || Number(trxToBtcDiff) > 0.3) {
    fs.appendFile("resultTrxBtc.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

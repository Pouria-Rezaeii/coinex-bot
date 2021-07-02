import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  trx: number;
  btc: number;
  trxBtc: number;
}

export const printTrxBtc = (response: IResponse, wallet: TWallet) => {
  const { trx, btc, trxBtc, requestNumber } = response;
  const { TRX_WALLET, BTC_WALLET } = wallet;

  const currentTrxValue = (trx * TRX_WALLET).toFixed(2);
  const currentBtcValue = (btc * BTC_WALLET).toFixed(2);
  const balance = (trx * TRX_WALLET + btc * BTC_WALLET).toFixed(2);
  const calculatedTrxBtc = (trx / btc).toFixed(10);
  const diff = (trx / btc - trxBtc).toFixed(10);

  const trxToBtcDiff = (
    TRX_WALLET * trxBtc * btc -
    Number(currentTrxValue)
  ).toFixed(2);
  const trxToBtc = {
    amount: (TRX_WALLET * trxBtc).toFixed(6),
    value: (TRX_WALLET * trxBtc * btc).toFixed(2),
    diff: trxToBtcDiff,
  };

  const btcToTrxDiff = (
    (BTC_WALLET / trxBtc) * trx -
    Number(currentBtcValue)
  ).toFixed(2);
  const btcToTrx = {
    amount: (BTC_WALLET / trxBtc).toFixed(2),
    value: ((BTC_WALLET / trxBtc) * trx).toFixed(2),
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

import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  etc: number;
  btc: number;
  etcBtc: number;
}

export const printEtcBtc = (response: IResponse, wallet: TWallet) => {
  const { etc, btc, etcBtc, requestNumber } = response;
  const { ETC_WALLET, BTC_WALLET } = wallet;

  const currentEtcValue = (etc * ETC_WALLET).toFixed(2);
  const currentBtcValue = (btc * BTC_WALLET).toFixed(2);
  const balance = (etc * ETC_WALLET + btc * BTC_WALLET).toFixed(2);
  const calculatedEtcBtc = (etc / btc).toFixed(10);
  const diff = (etc / btc - etcBtc).toFixed(10);

  const etcToBtcDiff = (
    ETC_WALLET * etcBtc * btc -
    Number(currentEtcValue)
  ).toFixed(2);
  const etcToBtc = {
    amount: (ETC_WALLET * etcBtc).toFixed(6),
    value: (ETC_WALLET * etcBtc * btc).toFixed(2),
    diff: etcToBtcDiff,
  };

  const btcToEtcDiff = (
    (BTC_WALLET / etcBtc) * etc -
    Number(currentBtcValue)
  ).toFixed(2);
  const btcToEtc = {
    amount: (BTC_WALLET / etcBtc).toFixed(2),
    value: ((BTC_WALLET / etcBtc) * etc).toFixed(2),
    diff: btcToEtcDiff,
  };

  const result = {
    type: "etc-btc",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    etc,
    btc,
    etcBtc,
    currentEtcValue,
    currentBtcValue,
    balance,
    calculatedEtcBtc,
    diff,
    etcToBtc,
    btcToEtc,
  };

  console.log(result);

  if (Number(btcToEtcDiff) > 0.3 || Number(etcToBtcDiff) > 0.3) {
    fs.appendFile("resultEtcBtc.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

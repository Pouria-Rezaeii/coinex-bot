import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  ltc: number;
  btc: number;
  ltcBtc: number;
}

export const printLtcBtc = (response: IResponse, wallet: TWallet) => {
  const { ltc, btc, ltcBtc, requestNumber } = response;
  const { LTC_WALLET, BTC_WALLET } = wallet;

  const currentLtcValue = (ltc * LTC_WALLET).toFixed(2);
  const currentBtcValue = (btc * BTC_WALLET).toFixed(2);
  const balance = (ltc * LTC_WALLET + btc * BTC_WALLET).toFixed(2);
  const calculatedLtcBtc = (ltc / btc).toFixed(10);
  const diff = (ltc / btc - ltcBtc).toFixed(10);

  const ltcToBtcDiff = (
    LTC_WALLET * ltcBtc * btc -
    Number(currentLtcValue)
  ).toFixed(2);
  const ltcToBtc = {
    amount: (LTC_WALLET * ltcBtc).toFixed(6),
    value: (LTC_WALLET * ltcBtc * btc).toFixed(2),
    diff: ltcToBtcDiff,
  };

  const btcToLtcDiff = (
    (BTC_WALLET / ltcBtc) * ltc -
    Number(currentBtcValue)
  ).toFixed(2);
  const btcToLtc = {
    amount: (BTC_WALLET / ltcBtc).toFixed(2),
    value: ((BTC_WALLET / ltcBtc) * ltc).toFixed(2),
    diff: btcToLtcDiff,
  };

  const result = {
    type: "ltc-btc",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    ltc,
    btc,
    ltcBtc,
    currentLtcValue,
    currentBtcValue,
    balance,
    calculatedLtcBtc,
    diff,
    ltcToBtc,
    btcToLtc,
  };

  console.log(result);

  if (Number(btcToLtcDiff) > 0.3 || Number(ltcToBtcDiff) > 0.3) {
    fs.appendFile("resultLtcBtc.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

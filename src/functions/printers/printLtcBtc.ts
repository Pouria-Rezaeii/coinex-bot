import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  ltc: number;
  btc: number;
  ltcBtc: number;
}

export const printLtcBtc = (response: IResponse, wallet: TWallet) => {
  const { ltc, btc, ltcBtc, requestNumber } = response;
  const { LTC, BTC } = wallet;

  const currentLtcValue = (ltc * LTC).toFixed(2);
  const currentBtcValue = (btc * BTC).toFixed(2);
  const balance = (ltc * LTC + btc * BTC).toFixed(2);
  const calculatedLtcBtc = (ltc / btc).toFixed(10);
  const diff = (ltc / btc - ltcBtc).toFixed(10);

  const ltcToBtcDiff = (LTC * ltcBtc * btc - Number(currentLtcValue)).toFixed(
    2
  );
  const ltcToBtc = {
    amount: (LTC * ltcBtc).toFixed(6),
    value: (LTC * ltcBtc * btc).toFixed(2),
    diff: ltcToBtcDiff,
  };

  const btcToLtcDiff = ((BTC / ltcBtc) * ltc - Number(currentBtcValue)).toFixed(
    2
  );
  const btcToLtc = {
    amount: (BTC / ltcBtc).toFixed(2),
    value: ((BTC / ltcBtc) * ltc).toFixed(2),
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

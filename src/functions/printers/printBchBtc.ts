import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  bch: number;
  btc: number;
  bchBtc: number;
}

export const printBchBtc = (response: IResponse, wallet: TWallet) => {
  const { bch, btc, bchBtc, requestNumber } = response;
  const { BCH, BTC } = wallet;

  const currentBchValue = (bch * BCH).toFixed(2);
  const currentBtcValue = (btc * BTC).toFixed(2);
  const balance = (bch * BCH + btc * BTC).toFixed(2);
  const calculatedBchBtc = (bch / btc).toFixed(10);
  const diff = (bch / btc - bchBtc).toFixed(10);

  const bchToBtcDiff = (BCH * bchBtc * btc - Number(currentBchValue)).toFixed(
    2
  );
  const bchToBtc = {
    amount: (BCH * bchBtc).toFixed(6),
    value: (BCH * bchBtc * btc).toFixed(2),
    diff: bchToBtcDiff,
  };

  const btcToBchDiff = ((BTC / bchBtc) * bch - Number(currentBtcValue)).toFixed(
    2
  );
  const btcToBch = {
    amount: (BTC / bchBtc).toFixed(5),
    value: ((BTC / bchBtc) * bch).toFixed(2),
    diff: btcToBchDiff,
  };

  const result = {
    type: "bch-btc",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    bch,
    btc,
    bchBtc,
    currentBchValue,
    currentBtcValue,
    balance,
    calculatedBchBtc,
    diff,
    bchToBtc,
    btcToBch,
  };

  console.log(result);

  if (Number(btcToBchDiff) > 0.3 || Number(bchToBtcDiff) > 0.3) {
    fs.appendFile("resultBchBtc.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

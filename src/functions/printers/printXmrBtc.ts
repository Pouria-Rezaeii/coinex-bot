import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  xmr: number;
  btc: number;
  xmrBtc: number;
}

export const printXmrBtc = (response: IResponse, wallet: TWallet) => {
  const { xmr, btc, xmrBtc, requestNumber } = response;
  const { XMR, BTC } = wallet;

  const currentXmrValue = (xmr * XMR).toFixed(2);
  const currentBtcValue = (btc * BTC).toFixed(2);
  const balance = (xmr * XMR + btc * BTC).toFixed(2);
  const calculatedXmrBtc = (xmr / btc).toFixed(10);
  const diff = (xmr / btc - xmrBtc).toFixed(10);

  const xmrToBtcDiff = (XMR * xmrBtc * btc - Number(currentXmrValue)).toFixed(
    2
  );
  const xmrToBtc = {
    amount: (XMR * xmrBtc).toFixed(6),
    value: (XMR * xmrBtc * btc).toFixed(2),
    diff: xmrToBtcDiff,
  };

  const btcToXmrDiff = ((BTC / xmrBtc) * xmr - Number(currentBtcValue)).toFixed(
    2
  );
  const btcToXmr = {
    amount: (BTC / xmrBtc).toFixed(2),
    value: ((BTC / xmrBtc) * xmr).toFixed(2),
    diff: btcToXmrDiff,
  };

  const result = {
    type: "xmr-btc",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    xmr,
    btc,
    xmrBtc,
    currentXmrValue,
    currentBtcValue,
    balance,
    calculatedXmrBtc,
    diff,
    xmrToBtc,
    btcToXmr,
  };

  console.log(result);

  if (Number(btcToXmrDiff) > 0.3 || Number(xmrToBtcDiff) > 0.3) {
    fs.appendFile("resultXmrBtc.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  xrp: number;
  btc: number;
  xrpBtc: number;
}

export const printXrpBtc = (response: IResponse, wallet: TWallet) => {
  const { xrp, btc, xrpBtc, requestNumber } = response;
  const { XRP, BTC } = wallet;

  const currentXrpValue = (xrp * XRP).toFixed(2);
  const currentBtcValue = (btc * BTC).toFixed(2);
  const balance = (xrp * XRP + btc * BTC).toFixed(2);
  const calculatedXrpBtc = (xrp / btc).toFixed(10);
  const diff = (xrp / btc - xrpBtc).toFixed(10);

  const xrpToBtcDiff = (XRP * xrpBtc * btc - Number(currentXrpValue)).toFixed(
    2
  );
  const xrpToBtc = {
    amount: (XRP * xrpBtc).toFixed(6),
    value: (XRP * xrpBtc * btc).toFixed(2),
    diff: xrpToBtcDiff,
  };

  const btcToXrpDiff = ((BTC / xrpBtc) * xrp - Number(currentBtcValue)).toFixed(
    2
  );
  const btcToXrp = {
    amount: (BTC / xrpBtc).toFixed(2),
    value: ((BTC / xrpBtc) * xrp).toFixed(2),
    diff: btcToXrpDiff,
  };

  const result = {
    type: "xrp-btc",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    xrp,
    btc,
    xrpBtc,
    currentXrpValue,
    currentBtcValue,
    balance,
    calculatedXrpBtc,
    diff,
    xrpToBtc,
    btcToXrp,
  };

  console.log(result);

  if (Number(btcToXrpDiff) > 0.3 || Number(xrpToBtcDiff) > 0.3) {
    fs.appendFile("resultXrpBtc.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

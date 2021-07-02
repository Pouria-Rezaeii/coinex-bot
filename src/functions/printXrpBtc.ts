import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  xrp: number;
  btc: number;
  xrpBtc: number;
}

export const printXrpBtc = (response: IResponse, wallet: TWallet) => {
  const { xrp, btc, xrpBtc, requestNumber } = response;
  const { XRP_WALLET, BTC_WALLET } = wallet;

  const currentXrpValue = (xrp * XRP_WALLET).toFixed(2);
  const currentBtcValue = (btc * BTC_WALLET).toFixed(2);
  const balance = (xrp * XRP_WALLET + btc * BTC_WALLET).toFixed(2);
  const calculatedXrpBtc = (xrp / btc).toFixed(10);
  const diff = (xrp / btc - xrpBtc).toFixed(10);

  const xrpToBtcDiff = (
    XRP_WALLET * xrpBtc * btc -
    Number(currentXrpValue)
  ).toFixed(2);
  const xrpToBtc = {
    amount: (XRP_WALLET * xrpBtc).toFixed(6),
    value: (XRP_WALLET * xrpBtc * btc).toFixed(2),
    diff: xrpToBtcDiff,
  };

  const btcToXrpDiff = (
    (BTC_WALLET / xrpBtc) * xrp -
    Number(currentBtcValue)
  ).toFixed(2);
  const btcToXrp = {
    amount: (BTC_WALLET / xrpBtc).toFixed(2),
    value: ((BTC_WALLET / xrpBtc) * xrp).toFixed(2),
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

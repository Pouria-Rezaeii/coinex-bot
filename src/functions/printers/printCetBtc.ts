import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  cet: number;
  btc: number;
  cetBtc: number;
}

export const printCetBtc = (response: IResponse, wallet: TWallet) => {
  const { cet, btc, cetBtc, requestNumber } = response;
  const { CET, BTC } = wallet;

  const currentCetValue = (cet * CET).toFixed(2);
  const currentBtcValue = (btc * BTC).toFixed(2);
  const balance = (cet * CET + btc * BTC).toFixed(2);
  const calculatedCetBtc = (cet / btc).toFixed(10);
  const diff = (cet / btc - cetBtc).toFixed(10);

  const cetToBtcDiff = (CET * cetBtc * btc - Number(currentCetValue)).toFixed(
    2
  );
  const cetToBtc = {
    amount: (CET * cetBtc).toFixed(6),
    value: (CET * cetBtc * btc).toFixed(2),
    diff: cetToBtcDiff,
  };

  const btcToCetDiff = ((BTC / cetBtc) * cet - Number(currentBtcValue)).toFixed(
    2
  );
  const btcToCet = {
    amount: (BTC / cetBtc).toFixed(2),
    value: ((BTC / cetBtc) * cet).toFixed(2),
    diff: btcToCetDiff,
  };

  const result = {
    type: "cet-btc",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    cet,
    btc,
    cetBtc,
    currentCetValue,
    currentBtcValue,
    balance,
    calculatedCetBtc,
    diff,
    cetToBtc,
    btcToCet,
  };

  console.log(result);

  if (Number(btcToCetDiff) > 0.3 || Number(cetToBtcDiff) > 0.3) {
    fs.appendFile("resultCetBtc.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

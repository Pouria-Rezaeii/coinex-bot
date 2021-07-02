import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  eos: number;
  btc: number;
  eosBtc: number;
}

export const printEosBtc = (response: IResponse, wallet: TWallet) => {
  const { eos, btc, eosBtc, requestNumber } = response;
  const { EOS_WALLET, BTC_WALLET } = wallet;

  const currentEosValue = (eos * EOS_WALLET).toFixed(2);
  const currentBtcValue = (btc * BTC_WALLET).toFixed(2);
  const balance = (eos * EOS_WALLET + btc * BTC_WALLET).toFixed(2);
  const calculatedEosBtc = (eos / btc).toFixed(10);
  const diff = (eos / btc - eosBtc).toFixed(10);

  const eosToBtcDiff = (
    EOS_WALLET * eosBtc * btc -
    Number(currentEosValue)
  ).toFixed(2);
  const eosToBtc = {
    amount: (EOS_WALLET * eosBtc).toFixed(6),
    value: (EOS_WALLET * eosBtc * btc).toFixed(2),
    diff: eosToBtcDiff,
  };

  const btcToEosDiff = (
    (BTC_WALLET / eosBtc) * eos -
    Number(currentBtcValue)
  ).toFixed(2);
  const btcToEos = {
    amount: (BTC_WALLET / eosBtc).toFixed(2),
    value: ((BTC_WALLET / eosBtc) * eos).toFixed(2),
    diff: btcToEosDiff,
  };

  const result = {
    type: "eos-btc",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    eos,
    btc,
    eosBtc,
    currentEosValue,
    currentBtcValue,
    balance,
    calculatedEosBtc,
    diff,
    eosToBtc,
    btcToEos,
  };

  console.log(result);

  if (Number(btcToEosDiff) > 0.3 || Number(eosToBtcDiff) > 0.3) {
    fs.appendFile("resultEosBtc.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

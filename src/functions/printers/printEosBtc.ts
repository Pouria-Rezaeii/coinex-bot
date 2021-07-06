import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  eos: number;
  btc: number;
  eosBtc: number;
}

export const printEosBtc = (response: IResponse, wallet: TWallet) => {
  const { eos, btc, eosBtc, requestNumber } = response;
  const { EOS, BTC } = wallet;

  const currentEosValue = (eos * EOS).toFixed(2);
  const currentBtcValue = (btc * BTC).toFixed(2);
  const balance = (eos * EOS + btc * BTC).toFixed(2);
  const calculatedEosBtc = (eos / btc).toFixed(10);
  const diff = (eos / btc - eosBtc).toFixed(10);

  const eosToBtcDiff = (EOS * eosBtc * btc - Number(currentEosValue)).toFixed(
    2
  );
  const eosToBtc = {
    amount: (EOS * eosBtc).toFixed(6),
    value: (EOS * eosBtc * btc).toFixed(2),
    diff: eosToBtcDiff,
  };

  const btcToEosDiff = ((BTC / eosBtc) * eos - Number(currentBtcValue)).toFixed(
    2
  );
  const btcToEos = {
    amount: (BTC / eosBtc).toFixed(2),
    value: ((BTC / eosBtc) * eos).toFixed(2),
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

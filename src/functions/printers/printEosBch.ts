import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  eos: number;
  bch: number;
  eosBch: number;
}

export const printEosBch = (response: IResponse, wallet: TWallet) => {
  const { eos, bch, eosBch, requestNumber } = response;
  const { EOS, BCH } = wallet;

  const currentEosValue = (eos * EOS).toFixed(2);
  const currentBchValue = (bch * BCH).toFixed(2);
  const balance = (eos * EOS + bch * BCH).toFixed(2);
  const calculatedEosBch = (eos / bch).toFixed(10);
  const diff = (eos / bch - eosBch).toFixed(10);

  const eosToBchDiff = (EOS * eosBch * bch - Number(currentEosValue)).toFixed(
    2
  );
  const eosToBch = {
    amount: (EOS * eosBch).toFixed(6),
    value: (EOS * eosBch * bch).toFixed(2),
    diff: eosToBchDiff,
  };

  const bchToEosDiff = ((BCH / eosBch) * eos - Number(currentBchValue)).toFixed(
    2
  );
  const bchToEos = {
    amount: (BCH / eosBch).toFixed(2),
    value: ((BCH / eosBch) * eos).toFixed(2),
    diff: bchToEosDiff,
  };

  const result = {
    type: "eos-bch",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    eos,
    bch,
    eosBch,
    currentEosValue,
    currentBchValue,
    balance,
    calculatedEosBch,
    diff,
    eosToBch,
    bchToEos,
  };

  // console.log(result);

  if (Number(bchToEosDiff) > 0.3 || Number(eosToBchDiff) > 0.3) {
    fs.appendFile("resultEosBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};
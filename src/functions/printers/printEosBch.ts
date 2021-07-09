import { Wallet } from "../../types";
import fs from "fs";
import { extractCurrencies } from "../../utils";

export const printEosBch = (rq: number, results: string[], wallet: Wallet) => {
  const { eos, bch, eosBch } = extractCurrencies(results);
  const { eos: EOS, bch: BCH } = wallet;

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
    rq,
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

  if (Number(bchToEosDiff) > 0.03 || Number(eosToBchDiff) > 0.03) {
    fs.appendFile("resultEosBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

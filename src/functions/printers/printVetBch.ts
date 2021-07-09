import { Wallet } from "../../types";
import fs from "fs";
import { extractCurrencies } from "../../utils";

export const printVetBch = (rq: number, results: string[], wallet: Wallet) => {
  const { vet, bch, vetBch } = extractCurrencies(results);
  const { vet: VET, bch: BCH } = wallet;

  const currentVetValue = (vet * VET).toFixed(2);
  const currentBchValue = (bch * BCH).toFixed(2);
  const balance = (vet * VET + bch * BCH).toFixed(2);
  const calculatedVetBch = (vet / bch).toFixed(10);
  const diff = (vet / bch - vetBch).toFixed(10);

  const vetToBchDiff = (VET * vetBch * bch - Number(currentVetValue)).toFixed(
    2
  );
  const vetToBch = {
    amount: (VET * vetBch).toFixed(6),
    value: (VET * vetBch * bch).toFixed(2),
    diff: vetToBchDiff,
  };

  const bchToVetDiff = ((BCH / vetBch) * vet - Number(currentBchValue)).toFixed(
    2
  );
  const bchToVet = {
    amount: (BCH / vetBch).toFixed(2),
    value: ((BCH / vetBch) * vet).toFixed(2),
    diff: bchToVetDiff,
  };

  const result = {
    type: "vet-bch",
    rq,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    vet,
    bch,
    vetBch,
    currentVetValue,
    currentBchValue,
    balance,
    calculatedVetBch,
    diff,
    vetToBch,
    bchToVet,
  };

  // console.log(result);

  if (Number(bchToVetDiff) > 0.03 || Number(vetToBchDiff) > 0.03) {
    fs.appendFile("resultVetBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

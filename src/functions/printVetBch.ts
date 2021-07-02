import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  vet: number;
  bch: number;
  vetBch: number;
}

export const printVetBch = (response: IResponse, wallet: TWallet) => {
  const { vet, bch, vetBch, requestNumber } = response;
  const { VET_WALLET, BCH_WALLET } = wallet;

  const currentVetValue = (vet * VET_WALLET).toFixed(2);
  const currentBchValue = (bch * BCH_WALLET).toFixed(2);
  const balance = (vet * VET_WALLET + bch * BCH_WALLET).toFixed(2);
  const calculatedVetBch = (vet / bch).toFixed(10);
  const diff = (vet / bch - vetBch).toFixed(10);

  const vetToBchDiff = (
    VET_WALLET * vetBch * bch -
    Number(currentVetValue)
  ).toFixed(2);
  const vetToBch = {
    amount: (VET_WALLET * vetBch).toFixed(6),
    value: (VET_WALLET * vetBch * bch).toFixed(2),
    diff: vetToBchDiff,
  };

  const bchToVetDiff = (
    (BCH_WALLET / vetBch) * vet -
    Number(currentBchValue)
  ).toFixed(2);
  const bchToVet = {
    amount: (BCH_WALLET / vetBch).toFixed(2),
    value: ((BCH_WALLET / vetBch) * vet).toFixed(2),
    diff: bchToVetDiff,
  };

  const result = {
    type: "vet-bch",
    rq: requestNumber,
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

  console.log(result);

  if (Number(bchToVetDiff) > 0.3 || Number(vetToBchDiff) > 0.3) {
    fs.appendFile("resultVetBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

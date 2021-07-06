import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  vet: number;
  btc: number;
  vetBtc: number;
}

export const printVetBtc = (response: IResponse, wallet: TWallet) => {
  const { vet, btc, vetBtc, requestNumber } = response;
  const { VET, BTC } = wallet;

  const currentVetValue = (vet * VET).toFixed(2);
  const currentBtcValue = (btc * BTC).toFixed(2);
  const balance = (vet * VET + btc * BTC).toFixed(2);
  const calculatedVetBtc = (vet / btc).toFixed(10);
  const diff = (vet / btc - vetBtc).toFixed(10);

  const vetToBtcDiff = (VET * vetBtc * btc - Number(currentVetValue)).toFixed(
    2
  );
  const vetToBtc = {
    amount: (VET * vetBtc).toFixed(6),
    value: (VET * vetBtc * btc).toFixed(2),
    diff: vetToBtcDiff,
  };

  const btcToVetDiff = ((BTC / vetBtc) * vet - Number(currentBtcValue)).toFixed(
    2
  );
  const btcToVet = {
    amount: (BTC / vetBtc).toFixed(2),
    value: ((BTC / vetBtc) * vet).toFixed(2),
    diff: btcToVetDiff,
  };

  const result = {
    type: "vet-btc",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    vet,
    btc,
    vetBtc,
    currentVetValue,
    currentBtcValue,
    balance,
    calculatedVetBtc,
    diff,
    vetToBtc,
    btcToVet,
  };

  console.log(result);

  if (Number(btcToVetDiff) > 0.3 || Number(vetToBtcDiff) > 0.3) {
    fs.appendFile("resultVetBtc.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

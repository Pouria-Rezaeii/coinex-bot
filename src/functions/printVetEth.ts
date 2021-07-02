import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  vet: number;
  eth: number;
  vetEth: number;
}

export const printVetEth = (response: IResponse, wallet: TWallet) => {
  const { vet, eth, vetEth, requestNumber } = response;
  const { VET_WALLET, ETH_WALLET } = wallet;

  const currentVetValue = (vet * VET_WALLET).toFixed(2);
  const currentEthValue = (eth * ETH_WALLET).toFixed(2);
  const balance = (vet * VET_WALLET + eth * ETH_WALLET).toFixed(2);
  const calculatedVetEth = (vet / eth).toFixed(10);
  const diff = (vet / eth - vetEth).toFixed(10);

  const vetToEthDiff = (
    VET_WALLET * vetEth * eth -
    Number(currentVetValue)
  ).toFixed(2);
  const vetToEth = {
    amount: (VET_WALLET * vetEth).toFixed(6),
    value: (VET_WALLET * vetEth * eth).toFixed(2),
    diff: vetToEthDiff,
  };

  const ethToVetDiff = (
    (ETH_WALLET / vetEth) * vet -
    Number(currentEthValue)
  ).toFixed(2);
  const ethToVet = {
    amount: (ETH_WALLET / vetEth).toFixed(2),
    value: ((ETH_WALLET / vetEth) * vet).toFixed(2),
    diff: ethToVetDiff,
  };

  const result = {
    type: "vet-eth",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    vet,
    eth,
    vetEth,
    currentVetValue,
    currentEthValue,
    balance,
    calculatedVetEth,
    diff,
    vetToEth,
    ethToVet,
  };

  console.log(result);

  if (Number(ethToVetDiff) > 0.3 || Number(vetToEthDiff) > 0.3) {
    fs.appendFile("resultVetEth.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

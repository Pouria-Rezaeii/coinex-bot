import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  vet: number;
  eth: number;
  vetEth: number;
}

export const printVetEth = (response: IResponse, wallet: TWallet) => {
  const { vet, eth, vetEth, requestNumber } = response;
  const { VET, ETH } = wallet;

  const currentVetValue = (vet * VET).toFixed(2);
  const currentEthValue = (eth * ETH).toFixed(2);
  const balance = (vet * VET + eth * ETH).toFixed(2);
  const calculatedVetEth = (vet / eth).toFixed(10);
  const diff = (vet / eth - vetEth).toFixed(10);

  const vetToEthDiff = (VET * vetEth * eth - Number(currentVetValue)).toFixed(
    2
  );
  const vetToEth = {
    amount: (VET * vetEth).toFixed(6),
    value: (VET * vetEth * eth).toFixed(2),
    diff: vetToEthDiff,
  };

  const ethToVetDiff = ((ETH / vetEth) * vet - Number(currentEthValue)).toFixed(
    2
  );
  const ethToVet = {
    amount: (ETH / vetEth).toFixed(2),
    value: ((ETH / vetEth) * vet).toFixed(2),
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

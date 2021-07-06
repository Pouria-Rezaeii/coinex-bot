import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  eth: number;
  bch: number;
  ethBch: number;
}

export const printEthBch = (response: IResponse, wallet: TWallet) => {
  const { eth, bch, ethBch, requestNumber } = response;
  const { ETH, BCH } = wallet;

  const currentEthValue = (eth * ETH).toFixed(2);
  const currentBchValue = (bch * BCH).toFixed(2);
  const balance = (eth * ETH + bch * BCH).toFixed(2);
  const calculatedEthBch = (eth / bch).toFixed(10);
  const diff = (eth / bch - ethBch).toFixed(10);

  const ethToBchDiff = (ETH * ethBch * bch - Number(currentEthValue)).toFixed(
    2
  );
  const ethToBch = {
    amount: (ETH * ethBch).toFixed(6),
    value: (ETH * ethBch * bch).toFixed(2),
    diff: ethToBchDiff,
  };

  const bchToEthDiff = ((BCH / ethBch) * eth - Number(currentBchValue)).toFixed(
    2
  );
  const bchToEth = {
    amount: (BCH / ethBch).toFixed(5),
    value: ((BCH / ethBch) * eth).toFixed(2),
    diff: bchToEthDiff,
  };

  const result = {
    type: "eth-bch",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    eth,
    bch,
    ethBch,
    currentEthValue,
    currentBchValue,
    balance,
    calculatedEthBch,
    diff,
    ethToBch,
    bchToEth,
  };

  console.log(result);

  if (Number(bchToEthDiff) > 0.3 || Number(ethToBchDiff) > 0.3) {
    fs.appendFile("resultEthBch.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};
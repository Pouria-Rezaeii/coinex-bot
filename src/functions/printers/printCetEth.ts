import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  cet: number;
  eth: number;
  cetEth: number;
}

export const printCetEth = (response: IResponse, wallet: TWallet) => {
  const { cet, eth, cetEth, requestNumber } = response;
  const { CET, ETH } = wallet;

  const currentCetValue = (cet * CET).toFixed(2);
  const currentEthValue = (eth * ETH).toFixed(2);
  const balance = (cet * CET + eth * ETH).toFixed(2);
  const calculatedCetEth = (cet / eth).toFixed(10);
  const diff = (cet / eth - cetEth).toFixed(10);

  const cetToEthDiff = (CET * cetEth * eth - Number(currentCetValue)).toFixed(
    2
  );
  const cetToEth = {
    amount: (CET * cetEth).toFixed(6),
    value: (CET * cetEth * eth).toFixed(2),
    diff: cetToEthDiff,
  };

  const ethToCetDiff = ((ETH / cetEth) * cet - Number(currentEthValue)).toFixed(
    2
  );
  const ethToCet = {
    amount: (ETH / cetEth).toFixed(2),
    value: ((ETH / cetEth) * cet).toFixed(2),
    diff: ethToCetDiff,
  };

  const result = {
    type: "cet-eth",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    cet,
    eth,
    cetEth,
    currentCetValue,
    currentEthValue,
    balance,
    calculatedCetEth,
    diff,
    cetToEth,
    ethToCet,
  };

  console.log(result);

  if (Number(ethToCetDiff) > 0.3 || Number(cetToEthDiff) > 0.3) {
    fs.appendFile("resultCetEth.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

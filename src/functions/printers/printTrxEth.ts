import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  trx: number;
  eth: number;
  trxEth: number;
}

export const printTrxEth = (response: IResponse, wallet: TWallet) => {
  const { trx, eth, trxEth, requestNumber } = response;
  const { TRX, ETH } = wallet;

  const currentTrxValue = (trx * TRX).toFixed(2);
  const currentEthValue = (eth * ETH).toFixed(2);
  const balance = (trx * TRX + eth * ETH).toFixed(2);
  const calculatedTrxEth = (trx / eth).toFixed(10);
  const diff = (trx / eth - trxEth).toFixed(10);

  const trxToEthDiff = (TRX * trxEth * eth - Number(currentTrxValue)).toFixed(
    2
  );
  const trxToEth = {
    amount: (TRX * trxEth).toFixed(6),
    value: (TRX * trxEth * eth).toFixed(2),
    diff: trxToEthDiff,
  };

  const ethToTrxDiff = ((ETH / trxEth) * trx - Number(currentEthValue)).toFixed(
    2
  );
  const ethToTrx = {
    amount: (ETH / trxEth).toFixed(2),
    value: ((ETH / trxEth) * trx).toFixed(2),
    diff: ethToTrxDiff,
  };

  const result = {
    type: "trx-eth",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    trx,
    eth,
    trxEth,
    currentTrxValue,
    currentEthValue,
    balance,
    calculatedTrxEth,
    diff,
    trxToEth,
    ethToTrx,
  };

  console.log(result);

  if (Number(ethToTrxDiff) > 0.3 || Number(trxToEthDiff) > 0.3) {
    fs.appendFile("resultTrxEth.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  trx: number;
  eth: number;
  trxEth: number;
}

export const printTrxEth = (response: IResponse, wallet: TWallet) => {
  const { trx, eth, trxEth, requestNumber } = response;
  const { TRX_WALLET, ETH_WALLET } = wallet;

  const currentTrxValue = (trx * TRX_WALLET).toFixed(2);
  const currentEthValue = (eth * ETH_WALLET).toFixed(2);
  const balance = (trx * TRX_WALLET + eth * ETH_WALLET).toFixed(2);
  const calculatedTrxEth = (trx / eth).toFixed(10);
  const diff = (trx / eth - trxEth).toFixed(10);

  const trxToEthDiff = (
    TRX_WALLET * trxEth * eth -
    Number(currentTrxValue)
  ).toFixed(2);
  const trxToEth = {
    amount: (TRX_WALLET * trxEth).toFixed(6),
    value: (TRX_WALLET * trxEth * eth).toFixed(2),
    diff: trxToEthDiff,
  };

  const ethToTrxDiff = (
    (ETH_WALLET / trxEth) * trx -
    Number(currentEthValue)
  ).toFixed(2);
  const ethToTrx = {
    amount: (ETH_WALLET / trxEth).toFixed(2),
    value: ((ETH_WALLET / trxEth) * trx).toFixed(2),
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

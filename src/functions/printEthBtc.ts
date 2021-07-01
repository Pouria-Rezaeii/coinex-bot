import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  eth: number;
  btc: number;
  ethBtc: number;
}

export const printEthBtc = (response: IResponse, wallet: TWallet) => {
  const { eth, btc, ethBtc, requestNumber } = response;
  const { ETH_WALLET, BTC_WALLET } = wallet;

  const currentEthValue = (eth * ETH_WALLET).toFixed(2);
  const currentBtcValue = (btc * BTC_WALLET).toFixed(2);
  const balance = (eth * ETH_WALLET + btc * BTC_WALLET).toFixed(2);
  const calculatedEthBtc = (eth / btc).toFixed(10);
  const diff = (eth / btc - ethBtc).toFixed(10);

  const ethToBtcDiff = (
    ETH_WALLET * ethBtc * btc -
    Number(currentEthValue)
  ).toFixed(2);
  const ethToBtc = {
    amount: (ETH_WALLET * ethBtc).toFixed(6),
    value: (ETH_WALLET * ethBtc * btc).toFixed(2),
    diff: ethToBtcDiff,
  };

  const btcToEthDiff = (
    (BTC_WALLET / ethBtc) * eth -
    Number(currentBtcValue)
  ).toFixed(2);
  const btcToEth = {
    amount: (BTC_WALLET / ethBtc).toFixed(5),
    value: ((BTC_WALLET / ethBtc) * eth).toFixed(2),
    diff: btcToEthDiff,
  };

  const result = {
    type: "eth-btc",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    eth,
    btc,
    ethBtc,
    currentEthValue,
    currentBtcValue,
    balance,
    calculatedEthBtc,
    diff,
    ethToBtc,
    btcToEth,
  };

  console.log(result);

  if (Number(btcToEthDiff) > 0.3 || Number(ethToBtcDiff) > 0.3) {
    fs.appendFile("resultEthBtc.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

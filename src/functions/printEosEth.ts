import { TWallet } from "..";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  eos: number;
  eth: number;
  eosEth: number;
}

export const printEosEth = (response: IResponse, wallet: TWallet) => {
  const { eos, eth, eosEth, requestNumber } = response;
  const { EOS_WALLET, ETH_WALLET } = wallet;

  const currentEosValue = (eos * EOS_WALLET).toFixed(2);
  const currentEthValue = (eth * ETH_WALLET).toFixed(2);
  const balance = (eos * EOS_WALLET + eth * ETH_WALLET).toFixed(2);
  const calculatedEosEth = (eos / eth).toFixed(10);
  const diff = (eos / eth - eosEth).toFixed(10);

  const eosToEthDiff = (
    EOS_WALLET * eosEth * eth -
    Number(currentEosValue)
  ).toFixed(2);
  const eosToEth = {
    amount: (EOS_WALLET * eosEth).toFixed(6),
    value: (EOS_WALLET * eosEth * eth).toFixed(2),
    diff: eosToEthDiff,
  };

  const ethToEosDiff = (
    (ETH_WALLET / eosEth) * eos -
    Number(currentEthValue)
  ).toFixed(2);
  const ethToEos = {
    amount: (ETH_WALLET / eosEth).toFixed(2),
    value: ((ETH_WALLET / eosEth) * eos).toFixed(2),
    diff: ethToEosDiff,
  };

  const result = {
    type: "eos-eth",
    rq: requestNumber,
    time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
    eos,
    eth,
    eosEth,
    currentEosValue,
    currentEthValue,
    balance,
    calculatedEosEth,
    diff,
    eosToEth,
    ethToEos,
  };

  console.log(result);

  if (Number(ethToEosDiff) > 0.3 || Number(eosToEthDiff) > 0.3) {
    fs.appendFile("resultEosEth.txt", `${JSON.stringify(result)}\n`, () => {});
  }
};

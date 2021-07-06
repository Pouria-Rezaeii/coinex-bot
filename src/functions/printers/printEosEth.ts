import { TWallet } from "../../types";
const fs = require("fs");

interface IResponse {
  requestNumber: number;
  eos: number;
  eth: number;
  eosEth: number;
}

export const printEosEth = (response: IResponse, wallet: TWallet) => {
  const { eos, eth, eosEth, requestNumber } = response;
  const { EOS, ETH } = wallet;

  const currentEosValue = (eos * EOS).toFixed(2);
  const currentEthValue = (eth * ETH).toFixed(2);
  const balance = (eos * EOS + eth * ETH).toFixed(2);
  const calculatedEosEth = (eos / eth).toFixed(10);
  const diff = (eos / eth - eosEth).toFixed(10);

  const eosToEthDiff = (EOS * eosEth * eth - Number(currentEosValue)).toFixed(
    2
  );
  const eosToEth = {
    amount: (EOS * eosEth).toFixed(6),
    value: (EOS * eosEth * eth).toFixed(2),
    diff: eosToEthDiff,
  };

  const ethToEosDiff = ((ETH / eosEth) * eos - Number(currentEthValue)).toFixed(
    2
  );
  const ethToEos = {
    amount: (ETH / eosEth).toFixed(2),
    value: ((ETH / eosEth) * eos).toFixed(2),
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

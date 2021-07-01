import { getAccountInfo } from "./api/getAccountInfo";
import { getMarket } from "./utils";
import * as printers from "./functions";

const wallet = {
  CET_WALLET: 50 / 0.057072,
  ETH_WALLET: 50 / 2130.5,
  BTC_WALLET: 50 / 33375.5,
  BCH_WALLET: 50 / 494.89,
};

export type TWallet = typeof wallet;

let requestNumber = 1;

const getPrices = async () => {
  const results = await Promise.all([
    getMarket("CETUSDT"),
    getMarket("BTCUSDT"),
    getMarket("CETBTC"),
    getMarket("ETHUSDT"),
    getMarket("ETHBTC"),
    getMarket("CETETH"),
    getMarket("BCHUSDT"),
    getMarket("BCHBTC"),
    getMarket("CETBCH"),
    getMarket("ETHBCH"),
  ]);
  const cet = results[0];
  const btc = results[1];
  const cetBtc = results[2];
  const eth = results[3];
  const ethBtc = results[4];
  const cetEth = results[5];
  const bch = results[6];
  const bchBtc = results[7];
  const cetBch = results[8];
  const ethBch = results[9];

  printers.printCetBtc({ requestNumber, cet, btc, cetBtc }, wallet);
  printers.printEthBtc({ requestNumber, eth, btc, ethBtc }, wallet);
  printers.printCetEth({ requestNumber, cet, eth, cetEth }, wallet);
  printers.printBchBtc({ requestNumber, bch, btc, bchBtc }, wallet);
  printers.printCetBch({ requestNumber, cet, bch, cetBch }, wallet);
  printers.printEthBch({ requestNumber, eth, bch, ethBch }, wallet);

  requestNumber++;
};

getAccountInfo();

setInterval(() => {
  getPrices();
}, 30000);

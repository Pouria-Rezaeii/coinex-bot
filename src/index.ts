import { getAccountInfo } from "./api/getAccountInfo";
import { getMarket } from "./utils";
import * as printers from "./functions";

const wallet = {
  ADA_WALLET: 50 / 1.312004,
  BCH_WALLET: 50 / 487,
  BNB_WALLET: 50 / 282.5198,
  BTC_WALLET: 50 / 33297.2,
  CET_WALLET: 50 / 0.057365,
  DOGE_WALLET: 50 / 0.24256157,
  ETH_WALLET: 50 / 2055.76,
  LTC_WALLET: 50 / 133.51,
  VET_WALLET: 50 / 0.084079,
  XRP_WALLET: 50 / 0.648156,
};

export type TWallet = typeof wallet;

let requestNumber = 1115;

const getPrices = async () => {
  const results = await Promise.all([
    getMarket("BTCUSDT"),
    // bch
    getMarket("BCHUSDT"),
    getMarket("BCHBTC"),
    // eth
    getMarket("ETHUSDT"),
    getMarket("ETHBTC"),
    getMarket("ETHBCH"),
    // cet
    getMarket("CETUSDT"),
    getMarket("CETBTC"),
    getMarket("CETBCH"),
    getMarket("CETETH"),
    // ada
    getMarket("ADAUSDT"),
    getMarket("ADABTC"),
    getMarket("ADABCH"),
    // doge
    getMarket("DOGEUSDT"),
    getMarket("DOGEBTC"),
    getMarket("DOGEBCH"),
    // ltc
    getMarket("LTCUSDT"),
    getMarket("LTCBTC"),
    getMarket("LTCBCH"),
    // vet
    getMarket("VETUSDT"),
    getMarket("VETBTC"),
    getMarket("VETBCH"),
    getMarket("VETETH"),
    // bnb
    getMarket("BNBUSDT"),
    getMarket("BNBBTC"),
    getMarket("BNBBCH"),
    // xrp
    getMarket("XRPUSDT"),
    getMarket("XRPBTC"),
    getMarket("XRPBCH"),
  ]);
  const btc = results[0];
  // bch
  const bch = results[1];
  const bchBtc = results[2];
  // eth
  const eth = results[3];
  const ethBtc = results[4];
  const ethBch = results[5];
  // cet
  const cet = results[6];
  const cetBtc = results[7];
  const cetBch = results[8];
  const cetEth = results[9];
  // ada
  const ada = results[10];
  const adaBtc = results[11];
  const adaBch = results[12];
  // doge
  const doge = results[13];
  const dogeBtc = results[14];
  const dogeBch = results[15];
  // ltc
  const ltc = results[16];
  const ltcBtc = results[17];
  const ltcBch = results[18];
  // vet
  const vet = results[19];
  const vetBtc = results[20];
  const vetBch = results[21];
  const vetEth = results[22];
  // bnb
  const bnb = results[23];
  const bnbBtc = results[24];
  const bnbBch = results[25];
  // xrp
  const xrp = results[26];
  const xrpBtc = results[27];
  const xrpBch = results[28];

  printers.printBchBtc({ requestNumber, bch, btc, bchBtc }, wallet);
  // eth
  printers.printEthBtc({ requestNumber, eth, btc, ethBtc }, wallet);
  printers.printEthBch({ requestNumber, eth, bch, ethBch }, wallet);
  // cet
  printers.printCetBtc({ requestNumber, cet, btc, cetBtc }, wallet);
  printers.printCetBch({ requestNumber, cet, bch, cetBch }, wallet);
  printers.printCetEth({ requestNumber, cet, eth, cetEth }, wallet);
  // ada
  printers.printAdaBtc({ requestNumber, ada, btc, adaBtc }, wallet);
  printers.printAdaBch({ requestNumber, ada, bch, adaBch }, wallet);
  // doge
  printers.printDogeBtc({ requestNumber, doge, btc, dogeBtc }, wallet);
  printers.printDogeBch({ requestNumber, doge, bch, dogeBch }, wallet);
  // ltc
  printers.printLtcBtc({ requestNumber, ltc, btc, ltcBtc }, wallet);
  printers.printLtcBch({ requestNumber, ltc, bch, ltcBch }, wallet);
  // vet
  printers.printVetBtc({ requestNumber, vet, btc, vetBtc }, wallet);
  printers.printVetBch({ requestNumber, vet, bch, vetBch }, wallet);
  printers.printVetEth({ requestNumber, vet, eth, vetEth }, wallet);
  // bnb
  printers.printBnbBtc({ requestNumber, bnb, btc, bnbBtc }, wallet);
  printers.printBnbBch({ requestNumber, bnb, bch, bnbBch }, wallet);
  // xrp
  printers.printXrpBtc({ requestNumber, xrp, btc, xrpBtc }, wallet);
  printers.printXrpBch({ requestNumber, xrp, bch, xrpBch }, wallet);

  requestNumber++;
};

getAccountInfo();

setInterval(() => {
  getPrices();
}, 15000);

import { getAccountInfo } from "./api/getAccountInfo";
import { getMarket } from "./utils";
import * as printers from "./functions";

const wallet = {
  CET_WALLET: 50 / 0.057365,
  ETH_WALLET: 50 / 2055.76,
  BTC_WALLET: 50 / 33297.2,
  BCH_WALLET: 50 / 487,
  ADA_WALLET: 50 / 1.312004,
  DOGE_WALLET: 50 / 0.24256157,
  BNB_WALLET: 50 / 282.5198,
  XRP_WALLET: 50 / 0.648156,
  LTC_WALLET: 50 / 133.51,
  VET_WALLET: 50 / 0.084079,
};

export type TWallet = typeof wallet;

let requestNumber = 1115;

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
    // bnb
    getMarket("BNBUSDT"),
    getMarket("BNBBTC"),
    getMarket("BNBBCH"),
    // xrp
    getMarket("XRPUSDT"),
    getMarket("XRPBTC"),
    getMarket("XRPBCH"),
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
  // bnb
  const bnb = results[22];
  const bnbBtc = results[23];
  const bnbBch = results[24];
  // xrp
  const xrp = results[25];
  const xrpBtc = results[26];
  const xrpBch = results[27];

  printers.printCetBtc({ requestNumber, cet, btc, cetBtc }, wallet);
  printers.printEthBtc({ requestNumber, eth, btc, ethBtc }, wallet);
  printers.printCetEth({ requestNumber, cet, eth, cetEth }, wallet);
  printers.printBchBtc({ requestNumber, bch, btc, bchBtc }, wallet);
  printers.printCetBch({ requestNumber, cet, bch, cetBch }, wallet);
  printers.printEthBch({ requestNumber, eth, bch, ethBch }, wallet);
  // - - - - - - - - - -
  printers.printAdaBtc({ requestNumber, ada, btc, adaBtc }, wallet);
  printers.printAdaBch({ requestNumber, ada, bch, adaBch }, wallet);
  printers.printDogeBtc({ requestNumber, doge, btc, dogeBtc }, wallet);
  printers.printDogeBch({ requestNumber, doge, bch, dogeBch }, wallet);
  printers.printLtcBtc({ requestNumber, ltc, btc, ltcBtc }, wallet);
  printers.printLtcBch({ requestNumber, ltc, bch, ltcBch }, wallet);
  printers.printVetBtc({ requestNumber, vet, btc, vetBtc }, wallet);
  printers.printVetBch({ requestNumber, vet, bch, vetBch }, wallet);
  printers.printBnbBtc({ requestNumber, bnb, btc, bnbBtc }, wallet);
  printers.printBnbBch({ requestNumber, bnb, bch, bnbBch }, wallet);
  printers.printXrpBtc({ requestNumber, xrp, btc, xrpBtc }, wallet);
  printers.printXrpBch({ requestNumber, xrp, bch, xrpBch }, wallet);

  requestNumber++;
};

getAccountInfo();

setInterval(() => {
  getPrices();
}, 15000);

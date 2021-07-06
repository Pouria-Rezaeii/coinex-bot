import { getAccountInfo } from "./api";
import { getMarket } from "./utils";
import * as printers from "./functions/printers";
import * as traders from "./functions/traders";

const WALLET = {
  ADA: 50 / 1.3562,
  BCH: 50 / 491.2,
  BNB: 50 / 284.01,
  BTC: 50 / 33540,
  CET: 50 / 0.05854,
  DOGE: 50 / 0.24385698,
  DOT: 50 / 15.25,
  EOS: 50 / 3.8622,
  ETC: 50 / 53.1,
  ETH: 50 / 2115,
  LTC: 50 / 134.62,
  SOL: 50 / 32.8384,
  TRX: 50 / 0.064825,
  VET: 50 / 0.086159,
  XMR: 50 / 209.7,
  XRP: 50 / 0.647171,
};

export type TWallet = typeof WALLET;

let requestNumber = 1;

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
    // etc
    getMarket("ETCUSDT"),
    getMarket("ETCBTC"),
    getMarket("ETCBCH"),
    // dot
    getMarket("DOTUSDT"),
    getMarket("DOTBTC"),
    getMarket("DOTBCH"),
    // sol
    getMarket("SOLUSDT"),
    getMarket("SOLBTC"),
    getMarket("SOLBCH"),
    // trx
    getMarket("TRXUSDT"),
    getMarket("TRXBTC"),
    getMarket("TRXBCH"),
    getMarket("TRXETH"),
    // eos
    getMarket("EOSUSDT"),
    getMarket("EOSBTC"),
    getMarket("EOSBCH"),
    getMarket("EOSETH"),
    // xmr
    getMarket("XMRUSDT"),
    getMarket("XMRBTC"),
    getMarket("XMRBCH"),
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
  // etc
  const etc = results[29];
  const etcBtc = results[30];
  const etcBch = results[31];
  // dot
  const dot = results[32];
  const dotBtc = results[33];
  const dotBch = results[34];
  // sol
  const sol = results[35];
  const solBtc = results[36];
  const solBch = results[37];
  // trx
  const trx = results[38];
  const trxBtc = results[39];
  const trxBch = results[40];
  const trxEth = results[41];
  // eos
  const eos = results[42];
  const eosBtc = results[43];
  const eosBch = results[44];
  const eosEth = results[45];
  // xmr
  const xmr = results[46];
  const xmrBtc = results[47];
  const xmrBch = results[48];

  console.log("rq: ", requestNumber);

  traders.trader_30(requestNumber, results);
  traders.trader_35(requestNumber, results);
  traders.trader_40(requestNumber, results);
  traders.trader_45(requestNumber, results);
  traders.trader_50(requestNumber, results);
  traders.trader_55(requestNumber, results);
  traders.trader_60(requestNumber, results);

  printers.printAdaBch({ requestNumber, ada, bch, adaBch }, WALLET);
  printers.printLtcBch({ requestNumber, ltc, bch, ltcBch }, WALLET);
  printers.printVetBch({ requestNumber, vet, bch, vetBch }, WALLET);
  printers.printBnbBch({ requestNumber, bnb, bch, bnbBch }, WALLET);
  printers.printEtcBch({ requestNumber, etc, bch, etcBch }, WALLET);
  printers.printDotBch({ requestNumber, dot, bch, dotBch }, WALLET);
  printers.printSolBch({ requestNumber, sol, bch, solBch }, WALLET);
  printers.printTrxBch({ requestNumber, trx, bch, trxBch }, WALLET);
  printers.printEosBch({ requestNumber, eos, bch, eosBch }, WALLET);

  requestNumber++;
};

getAccountInfo();

setInterval(() => {
  getPrices();
}, 3000);

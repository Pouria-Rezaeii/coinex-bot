import { getAccountInfo } from "./api/getAccountInfo";
import { getMarket } from "./utils";
import * as printers from "./functions";

const wallet = {
  ADA_WALLET: 50 / 1.3562,
  BCH_WALLET: 50 / 491.2,
  BNB_WALLET: 50 / 284.01,
  BTC_WALLET: 50 / 33540,
  CET_WALLET: 50 / 0.05854,
  DOGE_WALLET: 50 / 0.24385698,
  DOT_WALLET: 50 / 15.25,
  EOS_WALLET: 50 / 3.8622,
  ETC_WALLET: 50 / 53.1,
  ETH_WALLET: 50 / 2115,
  LTC_WALLET: 50 / 134.62,
  SOL_WALLET: 50 / 32.8384,
  TRX_WALLET: 50 / 0.064825,
  VET_WALLET: 50 / 0.086159,
  XMR_WALLET: 50 / 209.7,
  XRP_WALLET: 50 / 0.647171,
};

export type TWallet = typeof wallet;

let requestNumber = 2776;

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
  // etc
  printers.printEtcBtc({ requestNumber, etc, btc, etcBtc }, wallet);
  printers.printEtcBch({ requestNumber, etc, bch, etcBch }, wallet);
  // dot
  printers.printDotBtc({ requestNumber, dot, btc, dotBtc }, wallet);
  printers.printDotBch({ requestNumber, dot, bch, dotBch }, wallet);
  // sol
  printers.printSolBtc({ requestNumber, sol, btc, solBtc }, wallet);
  printers.printSolBch({ requestNumber, sol, bch, solBch }, wallet);
  // trx
  printers.printTrxBtc({ requestNumber, trx, btc, trxBtc }, wallet);
  printers.printTrxBch({ requestNumber, trx, bch, trxBch }, wallet);
  printers.printTrxEth({ requestNumber, trx, eth, trxEth }, wallet);
  // eos
  printers.printEosBtc({ requestNumber, eos, btc, eosBtc }, wallet);
  printers.printEosBch({ requestNumber, eos, bch, eosBch }, wallet);
  printers.printEosEth({ requestNumber, eos, eth, eosEth }, wallet);
  // xmr
  printers.printXmrBtc({ requestNumber, xmr, btc, xmrBtc }, wallet);
  printers.printXmrBch({ requestNumber, xmr, bch, xmrBch }, wallet);

  requestNumber++;
};

getAccountInfo();

setInterval(() => {
  getPrices();
}, 15000);

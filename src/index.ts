import { getAccountInfo, getMarket } from "./api";
import * as printers from "./functions/printers";
import { realTrader } from "./functions/realTrader";
import * as traders from "./functions/traders";
import { AccountInfoResponse, Wallet } from "./types";

let requestNumber = 1;

const getPrices = async () => {
  const results = await Promise.all([
    // wallet
    getAccountInfo(),
    // bch
    getMarket("BCHUSDT"),
    // ada
    getMarket("ADAUSDT"),
    getMarket("ADABCH"),
    // doge
    getMarket("DOGEUSDT"),
    getMarket("DOGEBCH"),
    // ltc
    getMarket("LTCUSDT"),
    getMarket("LTCBCH"),
    // vet
    getMarket("VETUSDT"),
    getMarket("VETBCH"),
    // bnb
    getMarket("BNBUSDT"),
    getMarket("BNBBCH"),
    // xrp
    getMarket("XRPUSDT"),
    getMarket("XRPBCH"),
    // etc
    getMarket("ETCUSDT"),
    getMarket("ETCBCH"),
    // dot
    getMarket("DOTUSDT"),
    getMarket("DOTBCH"),
    // sol
    getMarket("SOLUSDT"),
    getMarket("SOLBCH"),
    // trx
    getMarket("TRXUSDT"),
    getMarket("TRXBCH"),
    // eos
    getMarket("EOSUSDT"),
    getMarket("EOSBCH"),
  ]);

  const accountInfo = results[0] as AccountInfoResponse;
  if (accountInfo.code === 0) {
    const _wallet = accountInfo.data;
    const isUnexecutedOrder = Object.keys(_wallet).some(
      (item) => !!Number(_wallet[item].frozen)
    );

    const extractor = (key: keyof AccountInfoResponse["data"]) =>
      _wallet[key] ? Number(_wallet[key].available) : 0;

    const wallet: Wallet = {
      bch: extractor("BCH"),
      ada: extractor("ADA"),
      bnb: extractor("BNB"),
      dot: extractor("DOT"),
      eos: extractor("EOS"),
      etc: extractor("ETC"),
      ltc: extractor("LTC"),
      sol: extractor("SOL"),
      trx: extractor("TRX"),
      vet: extractor("VET"),
      xrp: extractor("XRP"),
      doge: extractor("DOGE"),
    };

    printers.printAdaBch(requestNumber, results, wallet);
    printers.printLtcBch(requestNumber, results, wallet);
    printers.printVetBch(requestNumber, results, wallet);
    printers.printBnbBch(requestNumber, results, wallet);
    printers.printEtcBch(requestNumber, results, wallet);
    printers.printDotBch(requestNumber, results, wallet);
    printers.printSolBch(requestNumber, results, wallet);
    printers.printTrxBch(requestNumber, results, wallet);
    printers.printEosBch(requestNumber, results, wallet);
    printers.printXrpBch(requestNumber, results, wallet);
    printers.printDogeBch(requestNumber, results, wallet);

    traders.trader_30(requestNumber, results);

    if (!isUnexecutedOrder) {
      realTrader(requestNumber, results, wallet);
    }
  }

  console.log("rq: ", requestNumber, new Date().toLocaleTimeString());
  requestNumber++;
};

setInterval(() => {
  getPrices();
}, 10000);

// import { TWallet } from "../../types";
import { extractCurrencies } from "../../utils";
import fs from "fs";

// let wallet = {
//   BCH: 250 / 491.2,
//   ADA: 0,
//   BNB: 0,
//   DOGE: 0,
//   DOT: 0,
//   EOS: 0,
//   ETC: 0,
//   ETH: 0,
//   LTC: 0,
//   SOL: 0,
//   TRX: 0,
//   VET: 0,
//   XRP: 0,
// };
let wallet = {
  BCH: 0,
  ADA: 0,
  BNB: 0,
  DOGE: 226.5973794095009,
  DOT: 3.189916110279542,
  EOS: 0,
  ETC: 0.9695734440563909,
  ETH: 0,
  LTC: 0,
  SOL: 1.5467606715175186,
  TRX: 0,
  VET: 625.2128599703055,
  XRP: 0,
};

let avPortion = 0;

export const trader_35 = (rq: number, results: any[]) => {
  const rs = extractCurrencies(results);

  // bch each portion
  const bchEachP = avPortion ? wallet.BCH / avPortion : 0;
  // bch each portion value
  const bchEachPVal = bchEachP * rs.bch;

  const bchToAdaDiff = (bchEachP / rs.adaBch) * rs.ada - bchEachPVal;
  const bchToVetDiff = (bchEachP / rs.vetBch) * rs.vet - bchEachPVal;
  const bchToBnbDiff = (bchEachP / rs.bnbBch) * rs.bnb - bchEachPVal;
  const bchToSolDiff = (bchEachP / rs.solBch) * rs.sol - bchEachPVal;
  const bchToDotDiff = (bchEachP / rs.dotBch) * rs.dot - bchEachPVal;
  const bchToEosDiff = (bchEachP / rs.eosBch) * rs.eos - bchEachPVal;
  const bchToLtcDiff = (bchEachP / rs.ltcBch) * rs.ltc - bchEachPVal;
  const bchToEtcDiff = (bchEachP / rs.etcBch) * rs.etc - bchEachPVal;
  const bchToTrxDiff = (bchEachP / rs.trxBch) * rs.trx - bchEachPVal;
  const bchToXrpDiff = (bchEachP / rs.xrpBch) * rs.xrp - bchEachPVal;
  const bchToDogeDiff = (bchEachP / rs.dogeBch) * rs.doge - bchEachPVal;

  const adaToBchDiff = wallet.ADA * rs.adaBch * rs.bch - wallet.ADA * rs.ada;
  const vetToBchDiff = wallet.VET * rs.vetBch * rs.bch - wallet.VET * rs.vet;
  const bnbToBchDiff = wallet.BNB * rs.bnbBch * rs.bch - wallet.BNB * rs.bnb;
  const solToBchDiff = wallet.SOL * rs.solBch * rs.bch - wallet.SOL * rs.sol;
  const dotToBchDiff = wallet.DOT * rs.dotBch * rs.bch - wallet.DOT * rs.dot;
  const eosToBchDiff = wallet.EOS * rs.eosBch * rs.bch - wallet.EOS * rs.eos;
  const ltcToBchDiff = wallet.LTC * rs.ltcBch * rs.bch - wallet.LTC * rs.ltc;
  const etcToBchDiff = wallet.ETC * rs.etcBch * rs.bch - wallet.ETC * rs.etc;
  const trxToBchDiff = wallet.TRX * rs.trxBch * rs.bch - wallet.TRX * rs.trx;
  const xrpToBchDiff = wallet.XRP * rs.xrpBch * rs.bch - wallet.XRP * rs.xrp;
  const dogeToBchDiff =
    wallet.DOGE * rs.dogeBch * rs.bch - wallet.DOGE * rs.doge;

  // ada - - - - - - - - - - - - - - - - - - - - -
  if (bchToAdaDiff > 0.35 && wallet.ADA === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      ADA: bchEachP / rs.adaBch,
    };
    avPortion -= 1;
    printer("bch to ada");
  }

  if (adaToBchDiff > 0.35 && wallet.ADA > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH + wallet.ADA * rs.adaBch,
      ADA: 0,
    };
    avPortion += 1;
    printer("ada to bch");
  }
  // vet - - - - - - - - - - - - - - - - - - - - -
  if (bchToVetDiff > 0.35 && wallet.VET === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      VET: bchEachP / rs.vetBch,
    };
    avPortion -= 1;
    printer("bch to vet");
  }

  if (vetToBchDiff > 0.35 && wallet.VET > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH + wallet.VET * rs.vetBch,
      VET: 0,
    };
    avPortion += 1;
    printer("vet to bch");
  }
  // bnb - - - - - - - - - - - - - - - - - - - - -
  if (bchToBnbDiff > 0.35 && wallet.BNB === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      BNB: bchEachP / rs.bnbBch,
    };
    avPortion -= 1;
    printer("bch to bnb");
  }

  if (bnbToBchDiff > 0.35 && wallet.BNB > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH + wallet.BNB * rs.bnbBch,
      BNB: 0,
    };
    avPortion += 1;
    printer("bnb to bch");
  }
  // sol - - - - - - - - - - - - - - - - - - - - -
  if (bchToSolDiff > 0.35 && wallet.SOL === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      SOL: bchEachP / rs.solBch,
    };
    avPortion -= 1;
    printer("bch to sol");
  }

  if (solToBchDiff > 0.35 && wallet.SOL > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH + wallet.SOL * rs.solBch,
      SOL: 0,
    };
    avPortion += 1;
    printer("sol to bch");
  }
  // dot - - - - - - - - - - - - - - - - - - - - -
  if (bchToDotDiff > 0.35 && wallet.DOT === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      DOT: bchEachP / rs.dotBch,
    };
    avPortion -= 1;
    printer("bch to dot");
  }

  if (dotToBchDiff > 0.35 && wallet.DOT > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH + wallet.DOT * rs.dotBch,
      DOT: 0,
    };
    avPortion += 1;
    printer("dot to bch");
  }
  // eos - - - - - - - - - - - - - - - - - - - - -
  if (bchToEosDiff > 0.35 && wallet.EOS === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      EOS: bchEachP / rs.eosBch,
    };
    avPortion -= 1;
    printer("bch to eos");
  }

  if (eosToBchDiff > 0.35 && wallet.EOS > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH + wallet.EOS * rs.eosBch,
      EOS: 0,
    };
    avPortion += 1;
    printer("eos to bch");
  }
  // ltc - - - - - - - - - - - - - - - - - - - - -
  if (bchToLtcDiff > 0.35 && wallet.LTC === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      LTC: bchEachP / rs.ltcBch,
    };
    avPortion -= 1;
    printer("bch to ltc");
  }

  if (ltcToBchDiff > 0.35 && wallet.LTC > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH + wallet.LTC * rs.ltcBch,
      LTC: 0,
    };
    avPortion += 1;
    printer("ltc to bch");
  }
  // etc - - - - - - - - - - - - - - - - - - - - -
  if (bchToEtcDiff > 0.35 && wallet.ETC === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      ETC: bchEachP / rs.etcBch,
    };
    avPortion -= 1;
    printer("bch to etc");
  }

  if (etcToBchDiff > 0.35 && wallet.ETC > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH + wallet.ETC * rs.etcBch,
      ETC: 0,
    };
    avPortion += 1;
    printer("etc to bch");
  }
  // trx - - - - - - - - - - - - - - - - - - - - -
  if (bchToTrxDiff > 0.35 && wallet.TRX === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      TRX: bchEachP / rs.trxBch,
    };
    avPortion -= 1;
    printer("bch to trx");
  }

  if (trxToBchDiff > 0.35 && wallet.TRX > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH + wallet.TRX * rs.trxBch,
      TRX: 0,
    };
    avPortion += 1;
    printer("trx to bch");
  }
  // xrp - - - - - - - - - - - - - - - - - - - - -
  if (bchToXrpDiff > 0.35 && wallet.XRP === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      XRP: bchEachP / rs.xrpBch,
    };
    avPortion -= 1;
    printer("bch to xrp");
  }

  if (xrpToBchDiff > 0.35 && wallet.XRP > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH + wallet.XRP * rs.xrpBch,
      XRP: 0,
    };
    avPortion += 1;
    printer("xrp to bch");
  }
  // doge - - - - - - - - - - - - - - - - - - - - -
  if (bchToDogeDiff > 0.35 && wallet.DOGE === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      DOGE: bchEachP / rs.dogeBch,
    };
    avPortion -= 1;
    printer("bch to doge");
  }

  if (dogeToBchDiff > 0.35 && wallet.DOGE > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH + wallet.DOGE * rs.dogeBch,
      DOGE: 0,
    };
    avPortion += 1;
    printer("doge to bch");
  }

  // logs
  function printer(type: string) {
    const info = {
      rq,
      time: `date: ${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
      type,
      wallet,
      avPortion,
    };
    fs.appendFile(
      "fakeTradesResult-35.txt",
      `${JSON.stringify(info)}\n`,
      () => {}
    );
  }
};

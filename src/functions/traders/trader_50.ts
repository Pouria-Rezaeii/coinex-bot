// import { TWallet } from "../../types";
import { extractCurrencies } from "../../utils";
import fs from "fs";

let wallet = {
  BCH: 250 / 491.2,
  ADA: 0,
  BNB: 0,
  DOGE: 0,
  DOT: 0,
  EOS: 0,
  ETC: 0,
  ETH: 0,
  LTC: 0,
  SOL: 0,
  TRX: 0,
  VET: 0,
  XRP: 0,
};

let avPortion = 5;

export const trader_50 = (rq: number, results: any[]) => {
  const rs = extractCurrencies(results);

  // bch each portion
  const bchEachP = wallet.BCH / avPortion;
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

  // ada - - - - - - - - - - - - - - - - - - - - -
  if (bchToAdaDiff >= 0.5 && wallet.ADA === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      ADA: bchEachP / rs.adaBch,
    };
    avPortion -= 1;
    printer("bch to ada");
  }

  if (bchToAdaDiff <= -0.5 && wallet.ADA > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.ADA * rs.adaBch,
      ADA: 0,
    };
    avPortion += 1;
    printer("ada to bch");
  }
  // vet - - - - - - - - - - - - - - - - - - - - -
  if (bchToVetDiff >= 0.5 && wallet.VET === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      VET: bchEachP / rs.vetBch,
    };
    avPortion -= 1;
    printer("bch to vet");
  }

  if (bchToVetDiff <= -0.5 && wallet.VET > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.VET * rs.vetBch,
      VET: 0,
    };
    avPortion += 1;
    printer("vet to bch");
  }
  // bnb - - - - - - - - - - - - - - - - - - - - -
  if (bchToBnbDiff >= 0.5 && wallet.BNB === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      BNB: bchEachP / rs.bnbBch,
    };
    avPortion -= 1;
    printer("bch to bnb");
  }

  if (bchToBnbDiff <= -0.5 && wallet.BNB > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BNB * rs.bnbBch,
      BNB: 0,
    };
    avPortion += 1;
    printer("bnb to bch");
  }
  // sol - - - - - - - - - - - - - - - - - - - - -
  if (bchToSolDiff >= 0.5 && wallet.SOL === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      SOL: bchEachP / rs.solBch,
    };
    avPortion -= 1;
    printer("bch to sol");
  }

  if (bchToSolDiff <= -0.5 && wallet.SOL > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.SOL * rs.solBch,
      SOL: 0,
    };
    avPortion += 1;
    printer("sol to bch");
  }
  // dot - - - - - - - - - - - - - - - - - - - - -
  if (bchToDotDiff >= 0.5 && wallet.DOT === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      DOT: bchEachP / rs.dotBch,
    };
    avPortion -= 1;
    printer("bch to dot");
  }

  if (bchToDotDiff <= -0.5 && wallet.DOT > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.DOT * rs.dotBch,
      DOT: 0,
    };
    avPortion += 1;
    printer("dot to bch");
  }
  // eos - - - - - - - - - - - - - - - - - - - - -
  if (bchToEosDiff >= 0.5 && wallet.EOS === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      EOS: bchEachP / rs.eosBch,
    };
    avPortion -= 1;
    printer("bch to eos");
  }

  if (bchToEosDiff <= -0.5 && wallet.EOS > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.EOS * rs.eosBch,
      EOS: 0,
    };
    avPortion += 1;
    printer("eos to bch");
  }
  // ltc - - - - - - - - - - - - - - - - - - - - -
  if (bchToLtcDiff >= 0.5 && wallet.LTC === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      LTC: bchEachP / rs.ltcBch,
    };
    avPortion -= 1;
    printer("bch to ltc");
  }

  if (bchToLtcDiff <= -0.5 && wallet.LTC > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.LTC * rs.ltcBch,
      LTC: 0,
    };
    avPortion += 1;
    printer("ltc to bch");
  }
  // etc - - - - - - - - - - - - - - - - - - - - -
  if (bchToEtcDiff >= 0.5 && wallet.ETC === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      ETC: bchEachP / rs.etcBch,
    };
    avPortion -= 1;
    printer("bch to etc");
  }

  if (bchToEtcDiff <= -0.5 && wallet.ETC > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.ETC * rs.etcBch,
      ETC: 0,
    };
    avPortion += 1;
    printer("etc to bch");
  }
  // trx - - - - - - - - - - - - - - - - - - - - -
  if (bchToTrxDiff >= 0.5 && wallet.TRX === 0 && avPortion > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.BCH - bchEachP,
      TRX: bchEachP / rs.trxBch,
    };
    avPortion -= 1;
    printer("bch to trx");
  }

  if (bchToTrxDiff <= -0.5 && wallet.TRX > 0) {
    wallet = {
      ...wallet,
      BCH: wallet.TRX * rs.trxBch,
      TRX: 0,
    };
    avPortion += 1;
    printer("trx to bch");
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
      "fakeTradesResult-50.txt",
      `${JSON.stringify(info)}\n`,
      () => {}
    );
  }
};

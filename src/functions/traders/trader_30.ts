import { extractCurrencies } from "../../utils";
import fs from "fs";
import { Wallet } from "../../types";

let avPortion = 3;

export const trader_30 = (rq: number, results: any[], wallet: Wallet) => {
  const rs = extractCurrencies(results);

  // bch each portion
  const bchEachP = avPortion ? wallet.bch / avPortion : 0;
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

  const adaToBchDiff = wallet.ada * rs.adaBch * rs.bch - wallet.ada * rs.ada;
  const vetToBchDiff = wallet.vet * rs.vetBch * rs.bch - wallet.vet * rs.vet;
  const bnbToBchDiff = wallet.bnb * rs.bnbBch * rs.bch - wallet.bnb * rs.bnb;
  const solToBchDiff = wallet.sol * rs.solBch * rs.bch - wallet.sol * rs.sol;
  const dotToBchDiff = wallet.dot * rs.dotBch * rs.bch - wallet.dot * rs.dot;
  const eosToBchDiff = wallet.eos * rs.eosBch * rs.bch - wallet.eos * rs.eos;
  const ltcToBchDiff = wallet.ltc * rs.ltcBch * rs.bch - wallet.ltc * rs.ltc;
  const etcToBchDiff = wallet.etc * rs.etcBch * rs.bch - wallet.etc * rs.etc;
  const trxToBchDiff = wallet.trx * rs.trxBch * rs.bch - wallet.trx * rs.trx;
  const xrpToBchDiff = wallet.xrp * rs.xrpBch * rs.bch - wallet.xrp * rs.xrp;
  const dogeToBchDiff =
    wallet.doge * rs.dogeBch * rs.bch - wallet.doge * rs.doge;

  console.log({
    "bch-to-Ada": bchToAdaDiff,
    "bch-to-Vet": bchToVetDiff,
    "bch-to-Bnb": bchToBnbDiff,
    "bch-to-Sol": bchToSolDiff,
    "bch-to-Dot": bchToDotDiff,
    "bch-to-Eos": bchToEosDiff,
    "bch-to-Ltc": bchToLtcDiff,
    "bch-to-Etc": bchToEtcDiff,
    "bch-to-Trx": bchToTrxDiff,
    "bch-to-Xrp": bchToXrpDiff,
    "bch-to-Doge": bchToDogeDiff,
    "ada-to-bch": adaToBchDiff,
    "vet-to-bch": vetToBchDiff,
    "bnb-to-bch": bnbToBchDiff,
    "sol-to-bch": solToBchDiff,
    "dot-to-bch": dotToBchDiff,
    "eos-to-bch": eosToBchDiff,
    "ltc-to-bch": ltcToBchDiff,
    "etc-to-bch": etcToBchDiff,
    "trx-to-bch": trxToBchDiff,
    "xrp-to-bch": xrpToBchDiff,
    "doge-to-bch": dogeToBchDiff,
  });

  // ada - - - - - - - - - - - - - - - - - - - - -
  if (bchToAdaDiff > 0.03 && wallet.ada === 0 && avPortion > 0) {
    printer("bch to ada");
  }
  if (adaToBchDiff > 0.03 && wallet.ada > 0) {
    printer("ada to bch");
  }
  // vet - - - - - - - - - - - - - - - - - - - - -
  if (bchToVetDiff > 0.03 && wallet.vet === 0 && avPortion > 0) {
    printer("bch to vet");
  }
  if (vetToBchDiff > 0.03 && wallet.vet > 0) {
    printer("vet to bch");
  }
  // bnb - - - - - - - - - - - - - - - - - - - - -
  if (bchToBnbDiff > 0.03 && wallet.bnb === 0 && avPortion > 0) {
    printer("bch to bnb");
  }
  if (bnbToBchDiff > 0.03 && wallet.bnb > 0) {
    printer("bnb to bch");
  }
  // sol - - - - - - - - - - - - - - - - - - - - -
  if (bchToSolDiff > 0.03 && wallet.sol === 0 && avPortion > 0) {
    printer("bch to sol");
  }
  if (solToBchDiff > 0.03 && wallet.sol > 0) {
    printer("sol to bch");
  }
  // dot - - - - - - - - - - - - - - - - - - - - -
  if (bchToDotDiff > 0.03 && wallet.dot === 0 && avPortion > 0) {
    printer("bch to dot");
  }
  if (dotToBchDiff > 0.03 && wallet.dot > 0) {
    printer("dot to bch");
  }
  // eos - - - - - - - - - - - - - - - - - - - - -
  if (bchToEosDiff > 0.03 && wallet.eos === 0 && avPortion > 0) {
    printer("bch to eos");
  }

  if (eosToBchDiff > 0.03 && wallet.eos > 0) {
    printer("eos to bch");
  }
  // ltc - - - - - - - - - - - - - - - - - - - - -
  if (bchToLtcDiff > 0.03 && wallet.ltc === 0 && avPortion > 0) {
    printer("bch to ltc");
  }

  if (ltcToBchDiff > 0.03 && wallet.ltc > 0) {
    printer("ltc to bch");
  }
  // etc - - - - - - - - - - - - - - - - - - - - -
  if (bchToEtcDiff > 0.03 && wallet.etc === 0 && avPortion > 0) {
    printer("bch to etc");
  }

  if (etcToBchDiff > 0.03 && wallet.etc > 0) {
    printer("etc to bch");
  }
  // trx - - - - - - - - - - - - - - - - - - - - -
  if (bchToTrxDiff > 0.03 && wallet.trx === 0 && avPortion > 0) {
    printer("bch to trx");
  }

  if (trxToBchDiff > 0.03 && wallet.trx > 0) {
    printer("trx to bch");
  }
  // xrp - - - - - - - - - - - - - - - - - - - - -
  if (bchToXrpDiff > 0.03 && wallet.xrp === 0 && avPortion > 0) {
    printer("bch to xrp");
  }

  if (xrpToBchDiff > 0.03 && wallet.xrp > 0) {
    printer("xrp to bch");
  }
  // doge - - - - - - - - - - - - - - - - - - - - -
  if (bchToDogeDiff > 0.03 && wallet.doge === 0 && avPortion > 0) {
    printer("bch to doge");
  }

  if (dogeToBchDiff > 0.03 && wallet.doge > 0) {
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
      "fakeTradesResult-30.txt",
      `${JSON.stringify(info)}\n`,
      () => {}
    );
  }
};

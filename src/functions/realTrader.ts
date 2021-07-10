import fs from "fs";
import { axios } from "../axiosInstance";
import { extractCurrencies, signatureMaker } from "../utils";
import dotenv from "dotenv";
import { Wallet, BchWithOthersPair } from "../types";
dotenv.config();

export const realTrader = (
  requestNumber: number,
  prices: string[],
  wallet: Wallet
) => {
  type WalletKey = keyof Wallet;
  type OmittedWalletKey = keyof Omit<Wallet, "bch">;

  let canOrder: boolean = true;
  const rs = extractCurrencies(prices);

  const availableInWalletChecker = (param: OmittedWalletKey) =>
    wallet[param] * rs[param] > 1;

  const bchAvPortion =
    3 -
    Object.keys(wallet).filter(
      (item: WalletKey) => item !== "bch" && availableInWalletChecker(item)
    ).length;

  const isFreeBch = bchAvPortion > 0;
  const bchPortion = isFreeBch ? wallet.bch / bchAvPortion : 0;
  const bchPortionValue = bchPortion * rs.bch;

  const bchToOthersDiffCalc = (param: OmittedWalletKey) => {
    // example: bchToAdaDiff = (bchPortion / rs.adaBch) * rs.ada - bchPortionValue;
    const currencyIsInWallet = availableInWalletChecker(param);
    return isFreeBch && !currencyIsInWallet
      ? (bchPortion / rs[`${param}Bch`]) * rs[param] - bchPortionValue >
          bchPortionValue * 0.008
      : false;
  };

  const othersToBchDiffCalc = (param: OmittedWalletKey) => {
    // example: adaToBchDiff = wallet.ada * rs.adaBch * rs.bch - wallet.ada * rs.ada
    const currencyIsInWallet = availableInWalletChecker(param);
    return currencyIsInWallet
      ? wallet[param] * rs[`${param}Bch`] * rs.bch - wallet[param] * rs[param] >
          wallet[param] * rs[param] * 0.008
      : false;
  };

  const orderer = async (market: BchWithOthersPair, type: "sell" | "buy") => {
    if (canOrder) {
      const currency = market
        .slice(0, -3)
        .toLocaleLowerCase() as OmittedWalletKey;
      const postData = {
        access_id: process.env.ACCESS_ID,
        amount:
          type === "buy"
            ? String(((bchPortion / rs[`${currency}Bch`]) * 99) / 100)
            : String((wallet[currency] * 99) / 100),
        market,
        price:
          type === "buy"
            ? (rs[`${currency}Bch`] * 100.36) / 100
            : (rs[`${currency}Bch`] * 99.64) / 100,
        tonce: new Date().getDate() + 30000,
        type,
      };

      const beforeOrderInfo = {
        rq: requestNumber,
        date: `${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
        market,
        type,
        other: rs[currency],
        bch: rs.bch,
        relative: rs[`${currency}Bch`],
        price: postData.price,
        amount: postData.amount,
        otherValue: Number(postData.amount) * rs[currency],
        bchPortionValue,
        wallet,
        bchAvPortion,
      };

      fs.appendFile(
        "tradeResult.txt",
        `before: ${JSON.stringify(beforeOrderInfo)}\n`,
        () => {}
      );

      const { data } = await axios.post("order/limit", postData, {
        headers: { authorization: signatureMaker(postData) },
      });
      console.log(JSON.stringify(data), "data");

      const afterOrderInfo = {
        date: `${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
        response: data,
      };
      fs.appendFile(
        "tradeResult.txt",
        `after: ${JSON.stringify(afterOrderInfo)}\n`,
        () => {}
      );
    }
    canOrder = false;
  };

  const bchToOthersDiffIsEnough = {
    ada: bchToOthersDiffCalc("ada"),
    bnb: bchToOthersDiffCalc("bnb"),
    dot: bchToOthersDiffCalc("dot"),
    eos: bchToOthersDiffCalc("eos"),
    etc: bchToOthersDiffCalc("etc"),
    ltc: bchToOthersDiffCalc("ltc"),
    sol: bchToOthersDiffCalc("sol"),
    trx: bchToOthersDiffCalc("trx"),
    vet: bchToOthersDiffCalc("vet"),
    xrp: bchToOthersDiffCalc("xrp"),
    doge: bchToOthersDiffCalc("doge"),
  };

  if (!!bchPortion) {
    if (bchToOthersDiffIsEnough.ada) {
      orderer("ADABCH", "buy");
    }
    if (bchToOthersDiffIsEnough.bnb) {
      orderer("BNBBCH", "buy");
    }
    if (bchToOthersDiffIsEnough.dot) {
      orderer("DOTBCH", "buy");
    }
    if (bchToOthersDiffIsEnough.eos) {
      orderer("EOSBCH", "buy");
    }
    if (bchToOthersDiffIsEnough.etc) {
      orderer("ETCBCH", "buy");
    }
    if (bchToOthersDiffIsEnough.ltc) {
      orderer("LTCBCH", "buy");
    }
    if (bchToOthersDiffIsEnough.sol) {
      orderer("SOLBCH", "buy");
    }
    if (bchToOthersDiffIsEnough.trx) {
      orderer("TRXBCH", "buy");
    }
    if (bchToOthersDiffIsEnough.vet) {
      orderer("VETBCH", "buy");
    }
    if (bchToOthersDiffIsEnough.xrp) {
      orderer("XRPBCH", "buy");
    }
    if (bchToOthersDiffIsEnough.doge) {
      orderer("DOGEBCH", "buy");
    }
  }

  const othersToBchDiffIsEnough = {
    ada: othersToBchDiffCalc("ada"),
    bnb: othersToBchDiffCalc("bnb"),
    dot: othersToBchDiffCalc("dot"),
    eos: othersToBchDiffCalc("eos"),
    etc: othersToBchDiffCalc("etc"),
    ltc: othersToBchDiffCalc("ltc"),
    sol: othersToBchDiffCalc("sol"),
    trx: othersToBchDiffCalc("trx"),
    vet: othersToBchDiffCalc("vet"),
    xrp: othersToBchDiffCalc("xrp"),
    doge: othersToBchDiffCalc("doge"),
  };

  if (bchAvPortion !== 4) {
    if (othersToBchDiffIsEnough.ada) {
      orderer("ADABCH", "sell");
    }
    if (othersToBchDiffIsEnough.bnb) {
      orderer("BNBBCH", "sell");
    }
    if (othersToBchDiffIsEnough.dot) {
      orderer("DOTBCH", "sell");
    }
    if (othersToBchDiffIsEnough.eos) {
      orderer("EOSBCH", "sell");
    }
    if (othersToBchDiffIsEnough.etc) {
      orderer("ETCBCH", "sell");
    }
    if (othersToBchDiffIsEnough.ltc) {
      orderer("LTCBCH", "sell");
    }
    if (othersToBchDiffIsEnough.sol) {
      orderer("SOLBCH", "sell");
    }
    if (othersToBchDiffIsEnough.trx) {
      orderer("TRXBCH", "sell");
    }
    if (othersToBchDiffIsEnough.vet) {
      orderer("VETBCH", "sell");
    }
    if (othersToBchDiffIsEnough.xrp) {
      orderer("XRPBCH", "sell");
    }
    if (othersToBchDiffIsEnough.doge) {
      orderer("DOGEBCH", "sell");
    }
  }
};

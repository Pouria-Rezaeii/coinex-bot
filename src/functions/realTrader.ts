import fs from "fs";
import { axios } from "../axiosInstance";
import { extractCurrencies, signatureMaker } from "../utils";
import dotenv from "dotenv";
import { Market } from "./type";
import { Wallet } from "../types";
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
    wallet[param] * rs[param] > 0.5;

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
          bchPortionValue * 0.006
      : false;
  };

  const othersToBchDiffCalc = (param: OmittedWalletKey) => {
    // example: adaToBchDiff = wallet.ada * rs.adaBch * rs.bch - wallet.ada * rs.ada
    const currencyIsInWallet = availableInWalletChecker(param);
    return currencyIsInWallet
      ? wallet[param] * rs[`${param}Bch`] * rs.bch - wallet[param] * rs[param] >
          wallet[param] * rs[param] * 0.006
      : false;
  };

  const orderer = async (
    market: Market,
    type: "sell" | "buy",
    currency: OmittedWalletKey
  ) => {
    if (canOrder) {
      const postData = {
        access_id: process.env.ACCESS_ID,
        amount:
          type === "buy"
            ? String((bchPortion * 99) / 100)
            : String((wallet[currency] * 99) / 100),
        market,
        tonce: new Date().getDate() + 30000,
        type,
      };

      const beforeOrderInfo = {
        rq: requestNumber,
        date: `${new Date().toLocaleDateString()}, time: ${new Date().toLocaleTimeString()}`,
        market,
        type,
        bchAvPortion,
        amount: postData.amount,
        wallet,
      };

      fs.appendFile(
        "tradeResult.txt",
        `before: ${JSON.stringify(beforeOrderInfo)}\n`,
        () => {}
      );

      const { data } = await axios.post("order/market", postData, {
        headers: { authorization: signatureMaker(postData) },
      });
      canOrder = false;
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
      // orderer("ADABCH", "buy", "ada");
    }
    if (bchToOthersDiffIsEnough.bnb) {
      // orderer("BNBBCH", "buy", "bnb");
    }
    if (bchToOthersDiffIsEnough.dot) {
      // orderer("DOTBCH", "buy", "dot");
    }
    if (bchToOthersDiffIsEnough.eos) {
      // orderer("EOSBCH", "buy", "eos");
    }
    if (bchToOthersDiffIsEnough.etc) {
      // orderer("ETCBCH", "buy", "etc");
    }
    if (bchToOthersDiffIsEnough.ltc) {
      // orderer("LTCBCH", "buy", "ltc");
    }
    if (bchToOthersDiffIsEnough.sol) {
      // orderer("SOLBCH", "buy", "sol");
    }
    if (bchToOthersDiffIsEnough.trx) {
      // orderer("TRXBCH", "buy", "trx");
    }
    if (bchToOthersDiffIsEnough.vet) {
      // orderer("VETBCH", "buy", "vet");
    }
    if (bchToOthersDiffIsEnough.xrp) {
      // orderer("XRPBCH", "buy", "xrp");
    }
    if (bchToOthersDiffIsEnough.doge) {
      // orderer("DOGEBCH", "buy", "doge");
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
      // orderer("ADABCH", "sell", "ada");
    }
    if (othersToBchDiffIsEnough.bnb) {
      // orderer("BNBBCH", "sell", "bnb");
    }
    if (othersToBchDiffIsEnough.dot) {
      // orderer("DOTBCH", "sell", "dot");
    }
    if (othersToBchDiffIsEnough.eos) {
      // orderer("EOSBCH", "sell", "eos");
    }
    if (othersToBchDiffIsEnough.etc) {
      // orderer("ETCBCH", "sell", "etc");
    }
    if (othersToBchDiffIsEnough.ltc) {
      // orderer("LTCBCH", "sell", "ltc");
    }
    if (othersToBchDiffIsEnough.sol) {
      // orderer("SOLBCH", "sell", "sol");
    }
    if (othersToBchDiffIsEnough.trx) {
      // orderer("TRXBCH", "sell", "trx");
    }
    if (othersToBchDiffIsEnough.vet) {
      // orderer("VETBCH", "sell", "vet");
    }
    if (othersToBchDiffIsEnough.xrp) {
      // orderer("XRPBCH", "sell", "xrp");
    }
    if (othersToBchDiffIsEnough.doge) {
      // orderer("DOGEBCH", "sell", "doge");
    }
  }

  console.log(bchToOthersDiffIsEnough);
  console.log(othersToBchDiffIsEnough);
};

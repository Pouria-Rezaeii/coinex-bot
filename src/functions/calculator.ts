import fs from "fs";
import { TCalculator } from "../types";

export const calculator: TCalculator = (
  response,
  currentCet,
  currentBtc,
  wallet,
  ratio,
  fileName
) => {
  const { requestNumber, cet, btc, cetBtc } = response;
  let cetValue = currentCet;
  let btcValue = currentBtc;
  let walletInfo = { ...wallet };

  fs.appendFile(
    fileName,
    `${JSON.stringify({ rq: requestNumber, cet, btc, cetBtc })}\n`,
    () => {}
  );
  fs.appendFile(
    fileName,
    `cur: ${currentCet * cetBtc} dif:  ${
      currentBtc + ratio / btc - currentCet * cetBtc
    }\n`,
    () => {}
  );

  if (wallet.type === "cet") {
    if (currentCet * cetBtc > currentBtc + ratio / btc) {
      change();
    }
  } else {
    if (currentBtc / cetBtc > currentCet + ratio / cet) {
      change();
    }
  }

  function change() {
    fs.appendFileSync(
      fileName,
      `rn: ${requestNumber}, Change happened!!\nOld wallet: { type: ${wallet.type}, value: ${wallet.value} }\n`
    );
    if (wallet.type === "cet") {
      btcValue = currentCet * cetBtc;
      walletInfo = { type: "btc", value: btcValue };
    } else {
      cetValue = currentBtc / cetBtc;
      walletInfo = { type: "cet", value: cetValue };
    }
    fs.appendFileSync(
      fileName,
      `new wallet: { type: ${walletInfo.type}, value: ${walletInfo.value} }\n`
    );
  }

  return { cetValue, btcValue, walletInfo };
};

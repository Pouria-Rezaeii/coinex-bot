import { calculator } from "./calculator";
import { TFakeTrader, IWallet } from "../types";

let currentCet = 946.16;
let currentBtc = 0.002538133;

let wallet: IWallet = { type: "cet", value: currentCet };
const ratio = 0.4;
const fileName = "result.txt";

export const fakeTrader: TFakeTrader = (response) => {
  const { cetValue, btcValue, walletInfo } = calculator(
    response,
    currentCet,
    currentBtc,
    wallet,
    ratio,
    fileName
  );
  currentCet = cetValue;
  currentBtc = btcValue;
  wallet = { ...walletInfo };
};

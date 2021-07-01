import { IWallet, IResponse } from ".";

export type TCalculator = (
  response: IResponse,
  currentCet: number,
  currentBtc: number,
  wallet: IWallet,
  ratio: number,
  fileName: string
) => { cetValue: number; btcValue: number; walletInfo: IWallet };

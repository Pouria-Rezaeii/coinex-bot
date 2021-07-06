export interface IResponse {
  requestNumber: number;
  cet: number;
  btc: number;
  cetBtc: number;
}

export interface IWallet {
  type: "cet" | "btc";
  value: number;
}

export type TCalculator = (
  response: IResponse,
  currentCet: number,
  currentBtc: number,
  wallet: IWallet,
  ratio: number,
  fileName: string
) => { cetValue: number; btcValue: number; walletInfo: IWallet };

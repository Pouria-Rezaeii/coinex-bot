import { ResponseCode, ResponseMessage } from ".";

enum WalletCurrencies {
  USDT,
  CET,
  BCH,
  ADA,
  BNB,
  DOT,
  DOGE,
  EOS,
  ETC,
  LTC,
  SOL,
  TRX,
  VET,
  XRP,
}

export interface AccountInfoResponse {
  code: ResponseCode;
  message: ResponseMessage;
  data: {
    [key in keyof typeof WalletCurrencies]?: {
      available: string;
      frozen: string;
    };
  };
}

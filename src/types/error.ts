const errorObject = {
  0: "Success",
  1: "Error",
  2: "Parameter error",
  3: "Internal error",
  23: "IP not allow",
  24: "Access id not exist",
  25: "Signature error",
  35: "Service unavailable",
  36: "Service timeout",
  40: "Main and sub accounts unpaired",
  49: "Transfer to sub account rejected",
  107: "Insufficient balance",
  115: "forbid trading",
  227: "tonce check error, correct tonce should be within one minute of the current time",
  600: "Order number does not exist",
  601: 'Other user"s order',
  602: "Below min. buy/sell limit",
  606: "Order price and the latest price deviation is too large",
  651: "Merge depth error",
} as const;

type ErrorObject = typeof errorObject;
export type ResponseCode = keyof ErrorObject;
export type ResponseMessage = ErrorObject[keyof ErrorObject];

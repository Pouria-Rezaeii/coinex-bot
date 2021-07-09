export const extractCurrencies = (results: any[]) => {
  return {
    // bch
    bch: results[0 + 1],
    // ada
    ada: results[1 + 1],
    adaBch: results[2 + 1],
    // doge
    doge: results[3 + 1],
    dogeBch: results[4 + 1],
    // ltc
    ltc: results[5 + 1],
    ltcBch: results[6 + 1],
    // vet
    vet: results[7 + 1],
    vetBch: results[8 + 1],
    // bnb
    bnb: results[9 + 1],
    bnbBch: results[10 + 1],
    // xrp
    xrp: results[11 + 1],
    xrpBch: results[12 + 1],
    // etc
    etc: results[13 + 1],
    etcBch: results[14 + 1],
    // dot
    dot: results[15 + 1],
    dotBch: results[16 + 1],
    // sol
    sol: results[17 + 1],
    solBch: results[18 + 1],
    // trx
    trx: results[19 + 1],
    trxBch: results[20 + 1],
    // eos
    eos: results[21 + 1],
    eosBch: results[22 + 1],
  };
};

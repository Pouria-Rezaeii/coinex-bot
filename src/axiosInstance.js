const defaultAxios = require('axios');

export const axios = defaultAxios.create({
  baseURL: 'https://api.coinex.com/v1/'
})

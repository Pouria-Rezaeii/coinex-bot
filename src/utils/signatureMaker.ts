import md5 from 'md5';

interface Param {
  [key: string]: string | number
}

export const signatureMaker = (param: Param) => {
  let sign = '';
  for (let i in param) {
    sign = sign.concat(`${i}=${param[i]}&`)
  }
  sign = sign.concat(`secret_key=${process.env.SECRET_KEY}`)
  const signature = md5(sign).toUpperCase();
  return signature;
}

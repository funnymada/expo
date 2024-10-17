import { appAxios } from './Crypto';

export const getCryptoList = async () => {
  const params = {
    currency: "USD",
    sort: "rank",
    order: "ascending",
    meta: true
  }
  const { data } = await appAxios.post('/coins/list', params)
  console.log({ data })
  return data
}
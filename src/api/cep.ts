import axios from 'axios'

const baseURL = 'https://viacep.com.br/ws/'

export const getCep = async (cep: string): Promise<any> => {
  const response = await axios.get(`${baseURL}${cep}/json`)
  return response.data
}

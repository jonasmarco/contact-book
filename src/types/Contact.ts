export type ContactBook = {
  id: string
  name: string
  photo?: string
  phoneNumbers: {
    number: string
  }[]
  addressList: {
    cep: string
    logradouro: string
    numero: string
    complemento?: string
    bairro: string
    localidade: string
    uf: string
  }[]
}

import { rest } from 'msw'

const handlers = {
  success: rest.get('http://localhost:5000/contactBook', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: '1',
          name: 'John Doe',
          photo: 'https://i.pravatar.cc/150?u=joao.silva',
          phoneNumbers: [{ number: '11998765432' }],
          addressList: [
            {
              logradouro: 'Rua 1',
              numero: '1',
              bairro: 'Bairro 1',
              localidade: 'Localidade 1',
              uf: 'UF 1',
              cep: '11111-111'
            }
          ]
        },
        {
          id: '2',
          name: 'Jane Doe',
          photo: undefined,
          phoneNumbers: [{ number: '43998765432' }, { number: '44987654321' }],
          addressList: [
            {
              logradouro: 'Rua 100',
              numero: '100',
              bairro: 'Bairro 100',
              localidade: 'Localidade 100',
              uf: 'UF 100',
              cep: '10011-111'
            },
            {
              logradouro: 'Rua 200',
              numero: '200',
              bairro: 'Bairro 200',
              localidade: 'Localidade 200',
              uf: 'UF 200',
              cep: '20022-222'
            }
          ]
        }
      ])
    )
  }),
  error: rest.get('http://localhost:5000/contactBook', (req, res, ctx) => {
    return res(ctx.status(500))
  }),
  loading: rest.get('http://localhost:5000/contactBook', (req, res, ctx) => {
    return res(ctx.delay(2000))
  }),
  empty: rest.get('http://localhost:5000/contactBook', (req, res, ctx) => {
    return res(ctx.json([]))
  })
}

export default handlers

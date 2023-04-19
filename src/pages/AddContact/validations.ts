import * as yup from 'yup'

export const AddContactSchema = yup.object().shape({
  name: yup.string().required('Por favor, informe um nome'),
  phoneNumbers: yup
    .array()
    .of(
      yup.object().shape({
        number: yup.string().required('Por favor, informe um telefone')
      })
    )
    .required('Por favor, informe um telefone')
    .min(1, 'Por favor adicione ao menos um telefone'),
  addressList: yup
    .array()
    .of(
      yup.object().shape({
        cep: yup.string().required('Por favor, informe um CEP'),
        logradouro: yup.string().required('Por favor, informe um logradouro'),
        numero: yup.string().required('Por favor, informe um número'),
        bairro: yup.string().required('Por favor, informe um bairro'),
        localidade: yup.string().required('Por favor, informe uma cidade'),
        uf: yup.string().required('Por favor, informe um estado')
      })
    )
    .required('Por favor, informe um endereço')
    .min(1, 'Por favor adicione ao menos um endereço')
})

export type AddContactSchema = yup.InferType<typeof AddContactSchema>

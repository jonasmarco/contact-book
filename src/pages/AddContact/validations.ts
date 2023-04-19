import * as yup from 'yup'

export const addContactSchema = yup.object().shape({
  name: yup.string().required('Por favor, informe um nome'),
  phoneNumbers: yup
    .array()
    .of(
      yup.object().shape({
        number: yup
          .string()
          .required('Por favor, informe um telefone')
          .min(1, 'Por favor adicione ao menos um telefone')
      })
    )
    .required(),
  addressList: yup
    .array()
    .of(
      yup.object().shape({
        cep: yup
          .string()
          .required('Por favor, informe um CEP')
          .min(1, 'Por favor adicione ao menos um CEP'),
        logradouro: yup
          .string()
          .required('Por favor, informe um logradouro')
          .min(1, 'Por favor adicione ao menos um logradouro'),
        numero: yup
          .string()
          .required('Por favor, informe um número')
          .min(1, 'Por favor adicione ao menos um número'),
        bairro: yup
          .string()
          .required('Por favor, informe um bairro')
          .min(1, 'Por favor adicione ao menos um bairro'),
        localidade: yup
          .string()
          .required('Por favor, informe uma cidade')
          .min(1, 'Por favor adicione ao menos uma cidade'),
        uf: yup
          .string()
          .required('Por favor, informe um estado')
          .min(1, 'Por favor adicione ao menos um estado')
      })
    )
    .required()
})

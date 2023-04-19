import * as yup from 'yup'

export const addContactSchema = yup.object().shape({
  name: yup.string().required('Por favor, informe um nome'),
  phoneNumbers: yup
    .array()
    .of(
      yup.object().shape({
        numbers: yup.string().required('form.required_message')
      })
    )
    .required()
    .min(1, 'Por favor adicione ao menos um telefone'),
  addressList: yup
    .array()
    .of(
      yup.object().shape({
        addresses: yup.string().required('form.required_message')
      })
    )
    .required()
    .min(1, 'Por favor adicione ao menos um endereço')
})

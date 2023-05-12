import React from 'react'

import Button from '@/components/Button'
import Container from '@/components/Container'
import FormItem from '@/components/FormItem'
import Text from '@/components/Text'
import Title from '@/components/Title'

import { Close } from '@styled-icons/evil'
import MaskedInput from 'react-text-mask'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'

import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ContactBookSchema } from '@/utils/validations/contactBookValidations'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'

import { onlyNumbers } from '@/utils/onlyNumbers'
import { ContactBook } from '@/types/Contact'
import { setContactBook } from '@/api/contactBook'
import { getCep } from '@/api/cep'

import * as S from './styles'

const NewContact = () => {
  const [disableCep, setDisableCep] = React.useState<boolean>(false)
  const [currentAddressIndex, setCurrentAddressIndex] =
    React.useState<number>(0)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    setFocus,
    clearErrors
  } = useForm<ContactBook>({
    resolver: yupResolver(ContactBookSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      phoneNumbers: [{ number: '' }],
      addressList: [
        {
          cep: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          localidade: '',
          uf: ''
        }
      ]
    }
  })

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone
  } = useFieldArray({
    name: 'phoneNumbers',
    control
  })

  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress
  } = useFieldArray({
    name: 'addressList',
    control
  })

  const handleAddNewAddress = () => {
    appendAddress({
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: ''
    })
    setCurrentAddressIndex(addressFields.length)
    clearErrors(['addressList'])
  }

  const handleRemoveAddress = (index: number) => {
    removeAddress(index)
    setCurrentAddressIndex(0)
  }

  const handleCepChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget

    handleCepDebounced.debouncedCallback(onlyNumbers(value))
  }

  const handleCepDebounced = useDebouncedCallback(async (value: string) => {
    if (value.length === 8) {
      setDisableCep(true)

      const response = await getCep(value)

      const { logradouro, complemento, bairro, localidade, uf } = response
      setValue(`addressList.${currentAddressIndex}.logradouro`, logradouro, {
        shouldValidate: true
      })
      setValue(`addressList.${currentAddressIndex}.complemento`, complemento, {
        shouldValidate: true
      })
      setValue(`addressList.${currentAddressIndex}.bairro`, bairro, {
        shouldValidate: true
      })
      setValue(`addressList.${currentAddressIndex}.localidade`, localidade, {
        shouldValidate: true
      })
      setValue(`addressList.${currentAddressIndex}.uf`, uf, {
        shouldValidate: true
      })

      setDisableCep(false)

      setFocus(`addressList.${currentAddressIndex}.numero`)
    }
  }, 500)

  const handleCepBlur = () => {
    handleCepDebounced.cancel()
  }

  const setContactBookMutation = useMutation(setContactBook, {
    onSuccess: () => {
      navigate('/')
    },
    onError: () => {
      console.log('error')
    }
  })

  const onSubmit: SubmitHandler<ContactBook> = async (data) => {
    try {
      await setContactBookMutation.mutateAsync(data)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  React.useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <S.Section>
      <Container>
        <S.Wrapper>
          <S.Header>
            <Title>Criar um novo contato</Title>
          </S.Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormItem>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                placeholder="Nome completo"
                {...register('name')}
              />
            </FormItem>
            {errors.name && <Text danger>{errors.name.message}</Text>}

            <FormItem>
              <label htmlFor="photo">Foto</label>
              <input
                type="text"
                placeholder="URL da foto"
                {...register('photo')}
              />
            </FormItem>

            <FormItem>
              <label>Telefones</label>
              {phoneFields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <div>
                    <Controller
                      control={control}
                      name={`phoneNumbers.${index}.number`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <MaskedInput
                          {...field}
                          mask={(rawValue: string) => {
                            if (rawValue.replace(/[^0-9,]/g, '').length > 10) {
                              return [
                                '(',
                                /[1-9]/,
                                /\d/,
                                ')',
                                ' ',
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                '-',
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/
                              ]
                            } else {
                              return [
                                '(',
                                /[1-9]/,
                                /\d/,
                                ')',
                                ' ',
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                '-',
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/
                              ]
                            }
                          }}
                          placeholder="(00) 99999-8888"
                          ref={(ref) => {
                            field.ref({
                              focus: ref?.props.onBlur
                            })
                          }}
                        />
                      )}
                    />
                    <Button
                      category="danger"
                      onClick={() => removePhone(index)}
                      icon={<Close />}
                    >
                      {}
                    </Button>
                  </div>
                  {errors.phoneNumbers?.length && (
                    <Text danger>
                      {errors.phoneNumbers?.[index]?.number?.message}
                    </Text>
                  )}
                </React.Fragment>
              ))}
              {errors.phoneNumbers?.message && (
                <Text danger>{errors.phoneNumbers.message}</Text>
              )}
              <Button
                category="secondary"
                onClick={() => {
                  appendPhone({
                    number: ''
                  })
                  clearErrors(['phoneNumbers'])
                }}
              >
                Adicionar novo telefone
              </Button>
            </FormItem>

            <FormItem multiple disabled={disableCep}>
              <label>Endereços</label>
              {addressFields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <div>
                    <Controller
                      control={control}
                      name={`addressList.${index}.cep`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <MaskedInput
                          {...field}
                          mask={[
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            '-',
                            /\d/,
                            /\d/,
                            /\d/
                          ]}
                          placeholder="CEP"
                          onKeyUp={handleCepChange}
                          onBlur={handleCepBlur}
                          ref={(ref) => {
                            field.ref({
                              focus: ref?.props.onBlur
                            })
                          }}
                        />
                      )}
                    />
                    {errors.addressList?.length && (
                      <Text danger>
                        {errors.addressList?.[index]?.cep?.message}
                      </Text>
                    )}
                    <Controller
                      control={control}
                      name={`addressList.${index}.logradouro`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input {...field} placeholder="Logradouro" />
                      )}
                    />
                    {errors.addressList?.length && (
                      <Text danger>
                        {errors.addressList?.[index]?.logradouro?.message}
                      </Text>
                    )}
                    <Controller
                      control={control}
                      name={`addressList.${index}.numero`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input {...field} placeholder="Número" />
                      )}
                    />
                    {errors.addressList?.length && (
                      <Text danger>
                        {errors.addressList?.[index]?.numero?.message}
                      </Text>
                    )}
                    <Controller
                      control={control}
                      name={`addressList.${index}.complemento`}
                      render={({ field }) => (
                        <input {...field} placeholder="Complemento" />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`addressList.${index}.bairro`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input {...field} placeholder="Bairro" />
                      )}
                    />
                    {errors.addressList?.length && (
                      <Text danger>
                        {errors.addressList?.[index]?.bairro?.message}
                      </Text>
                    )}
                    <Controller
                      control={control}
                      name={`addressList.${index}.localidade`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input {...field} placeholder="Cidade" />
                      )}
                    />
                    {errors.addressList?.length && (
                      <Text danger>
                        {errors.addressList?.[index]?.localidade?.message}
                      </Text>
                    )}
                    <Controller
                      control={control}
                      name={`addressList.${index}.uf`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input {...field} placeholder="UF" />
                      )}
                    />
                    {errors.addressList?.length && (
                      <Text danger>
                        {errors.addressList?.[index]?.uf?.message}
                      </Text>
                    )}
                    <Button
                      category="danger"
                      onClick={() => handleRemoveAddress(index)}
                      icon={<Close />}
                    >
                      {}
                    </Button>
                  </div>
                </React.Fragment>
              ))}
              {errors.addressList && (
                <Text danger>{errors.addressList.message}</Text>
              )}
              <Button category="secondary" onClick={handleAddNewAddress}>
                Adicionar novo endereço
              </Button>
            </FormItem>

            <FormItem>
              <Button type="submit" disabled={isSubmitting}>
                Salvar
              </Button>
            </FormItem>
          </form>
          <Link to="/">
            <Button category="danger">Voltar a lista</Button>
          </Link>
        </S.Wrapper>
      </Container>
    </S.Section>
  )
}

export default NewContact

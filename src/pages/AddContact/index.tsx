import React from 'react'

import Button from '@/components/Button'
import Container from '@/components/Container'
import FormItem from '@/components/FormItem'
import Text from '@/components/Text'
import Title from '@/components/Title'
import { useMutation } from 'react-query'

import { Close } from '@styled-icons/evil'
import MaskedInput from 'react-text-mask'
import { Link, useNavigate } from 'react-router-dom'

import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addContactSchema } from './validations'

import { onlyNumbers } from '@/utils/onlyNumbers'
import { ContactBook } from '@/types/Contact'
import { setContactBook } from '@/api/contactBook'
import { getCep } from '@/api/cep'

import * as S from './styles'

const AddContact = () => {
  const [disableCep, setDisableCep] = React.useState<boolean>(false)
  const [addressData, setAddressData] = React.useState(null)
  const [currentAddressIndex, setCurrentAddressIndex] =
    React.useState<number>(0)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    setFocus
  } = useForm<ContactBook>({
    resolver: yupResolver(addContactSchema),
    defaultValues: {
      name: '',
      phoneNumbers: [{ number: '' }],
      addressList: [
        {
          cep: '',
          logradouro: '',
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
      complemento: '',
      bairro: '',
      localidade: '',
      uf: ''
    })
    setCurrentAddressIndex(addressFields.length)
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
      setAddressData(response)

      const { logradouro, complemento, bairro, localidade, uf } = response
      setValue(`addressList.${currentAddressIndex}.logradouro`, logradouro, {
        shouldDirty: true
      })
      setValue(`addressList.${currentAddressIndex}.complemento`, complemento, {
        shouldDirty: true
      })
      setValue(`addressList.${currentAddressIndex}.bairro`, bairro, {
        shouldDirty: true
      })
      setValue(`addressList.${currentAddressIndex}.localidade`, localidade, {
        shouldDirty: true
      })
      setValue(`addressList.${currentAddressIndex}.uf`, uf, {
        shouldDirty: true
      })

      setDisableCep(false)
    }
  }, 500)

  const handleCepBlur = () => {
    handleCepDebounced.cancel()
  }

  function useDebouncedCallback(callback: Function, delay: number) {
    const [timerId, setTimerId] = React.useState<number | null>(null)

    const debouncedCallback = (...args: any[]) => {
      if (timerId) {
        clearTimeout(timerId)
      }
      const newTimerId = window.setTimeout(() => {
        callback(...args)
      }, delay)
      setTimerId(newTimerId)
    }

    const cancel = () => {
      if (timerId) {
        clearTimeout(timerId)
        setTimerId(null)
      }
    }

    return { debouncedCallback, cancel }
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
    console.log(data)

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
            <Title>Criar um novo Contato</Title>
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
                <>
                  <div key={field.id}>
                    <MaskedInput
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
                      {...register(`phoneNumbers.${index}.number` as const, {
                        required: true
                      })}
                      placeholder="(00) 91234-5678"
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
                    <Text danger>Informe um telefone válido</Text>
                  )}
                </>
              ))}
              {errors.phoneNumbers?.message && (
                <Text danger>{errors.phoneNumbers.message}</Text>
              )}
              <Button
                category="secondary"
                onClick={() =>
                  appendPhone({
                    number: ''
                  })
                }
              >
                Adicionar novo telefone
              </Button>
            </FormItem>

            <FormItem multiple disabled={disableCep}>
              <label>Endereços</label>
              {addressFields.map((field, index) => (
                <>
                  <div key={field.id}>
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
                    <Controller
                      control={control}
                      name={`addressList.${index}.logradouro`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input {...field} placeholder="Logradouro" />
                      )}
                    />
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
                    <Controller
                      control={control}
                      name={`addressList.${index}.localidade`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input {...field} placeholder="Cidade" />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`addressList.${index}.uf`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input {...field} placeholder="UF" />
                      )}
                    />
                    <Button
                      category="danger"
                      onClick={() => handleRemoveAddress(index)}
                      icon={<Close />}
                    >
                      {}
                    </Button>
                  </div>
                  {errors.addressList?.length && (
                    <Text danger>Informe um CEP válido</Text>
                  )}
                </>
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

export default AddContact

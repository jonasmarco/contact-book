import React from 'react'

import Button from '@/components/Button'
import Text from '@/components/Text'

import { Link } from 'react-router-dom'

import { onlyNumbers } from '@/utils/onlyNumbers'
import { ContactBook } from '@/types/Contact'

import { Eye, Edit, Delete } from '@styled-icons/fluentui-system-regular'
import Rodal from 'rodal'

import 'rodal/lib/rodal.css'
import * as S from './styles'

const DEFAULT_AVATAR_URL = '/avatar.svg'

interface ContactItemProps extends ContactBook {
  handleDelete: () => void
}

const ContactItem = ({
  id,
  name,
  photo,
  phoneNumbers,
  addressList,
  handleDelete
}: ContactItemProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  const handleShowDetails = () => {
    setIsModalOpen(true)
  }

  return (
    <S.ContactItem>
      <div>
        <a href={`tel:55${onlyNumbers(phoneNumbers[0].number)}`}>
          <S.Avatar src={photo ? photo : DEFAULT_AVATAR_URL} />
          <h3>{name}</h3>
          <span>{phoneNumbers[0].number}</span>
        </a>
      </div>
      <div>
        <Button category="success" icon={<Eye />} onClick={handleShowDetails}>
          {}
        </Button>
        <Link to={`/contacts/${id}/edit-contact`}>
          <Button category="warning" icon={<Edit />}>
            {}
          </Button>
        </Link>
        <Button category="danger" icon={<Delete />} onClick={handleDelete}>
          {}
        </Button>
      </div>
      {isModalOpen && (
        <Rodal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <S.ModalBody>
            <S.Avatar src={photo ? photo : DEFAULT_AVATAR_URL} />
            <h2>{name}</h2>
            <Text>Telefones:</Text>
            <div>
              {phoneNumbers.map((phoneNumber) => {
                return (
                  <a
                    key={phoneNumber.number}
                    href={`tel:55${onlyNumbers(phoneNumber.number)}`}
                  >
                    {phoneNumber.number}
                  </a>
                )
              })}
            </div>
            <Text>Endereços:</Text>
            <div>
              {addressList.map((address) => {
                return (
                  <a
                    key={`${address.logradouro}-${address.numero}`}
                    href={`https://www.google.com/maps/place/${address.cep} ${address.logradouro} ${address.numero} ${address.bairro} ${address.localidade} - ${address.uf}`}
                    target="blank"
                  >
                    {`${address.logradouro} - ${address.numero}, ${address.bairro}, ${address.localidade}-${address.uf}`}
                  </a>
                )
              })}
            </div>
          </S.ModalBody>
        </Rodal>
      )}
    </S.ContactItem>
  )
}

export default ContactItem

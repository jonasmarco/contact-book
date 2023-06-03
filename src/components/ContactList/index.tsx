import React from 'react'

import Button from '@/components/Button'
import ContactItem from '@/components/ContactItem'
import GroupButtons from '@/components/GroupButtons'
import Text from '@/components/Text'
import Title from '@/components/Title'
import Search from '@/components/Search'
import Skeleton from 'react-loading-skeleton'

import { Plus } from '@styled-icons/bootstrap'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import Rodal from 'rodal'
import toast from 'react-hot-toast'

import { ContactBook } from '@/types/Contact'
import {
  getContactBook,
  groupContactsByInitial,
  deleteContact
} from '@/api/contactBook'

import 'react-loading-skeleton/dist/skeleton.css'
import 'rodal/lib/rodal.css'
import * as S from './styles'

const ContactList = () => {
  const { data, isError, isLoading, refetch } = useQuery(['contacts'], () =>
    getContactBook()
  )

  const [contactToDelete, setContactToDelete] =
    React.useState<ContactBook | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const deleteContactMutation = useMutation(deleteContact, {
    onSuccess: () => {
      refetch()
      setIsDeleting(false)

      toast.success('Contato excluído com sucesso!', {
        style: {
          border: '1px solid #4FB6FF',
          borderRadius: '1rem',
          color: '#596E7D',
          fontSize: '14px',
          padding: '16px'
        },
        iconTheme: {
          primary: '#33CC33',
          secondary: '#FCFCFC'
        }
      })
    },
    onError: (error: any) => {
      setIsDeleting(false)

      toast.error(`Erro ao excluir contato: ${error.message}`, {
        style: {
          border: '1px solid #4FB6FF',
          borderRadius: '1rem',
          color: '#596E7D',
          fontSize: '14px',
          padding: '16px'
        },
        iconTheme: {
          primary: '#FF6565',
          secondary: '#FCFCFC'
        }
      })
    }
  })

  const handleDeleteConfirm = () => {
    setIsDeleting(true)

    if (contactToDelete) {
      deleteContactMutation.mutate(contactToDelete.id)
    }

    setContactToDelete(null)
  }

  const handleOpenDeleteModal = (contact: ContactBook) => {
    setContactToDelete(contact)
  }

  React.useEffect(() => {
    refetch()
  }, [])

  if (isError) {
    return (
      <>
        <S.Header>
          <div>
            <Title>Meus Contatos</Title>
          </div>
        </S.Header>
        <Text danger>
          Tivemos algum problema ao realizar a sua solicitação, por favor tente
          novamente mais tarde.
        </Text>
      </>
    )
  }

  if (!data || isLoading) {
    return (
      <>
        <S.Header>
          <div>
            <Title>Meus Contatos</Title>
          </div>
        </S.Header>
        <div data-testid="skeleton">
          <Skeleton
            height={90}
            count={5}
            borderRadius={10}
            baseColor="#4FB6FF"
            containerClassName="skeletons"
          />
        </div>
      </>
    )
  }

  if (data && data.length === 0) {
    return (
      <>
        <S.Header>
          <div>
            <Title>Meus Contatos</Title>
          </div>
          <Link to="/contacts/new-contact">
            <Button icon={<Plus />} otherSide>
              Adicionar Contato
            </Button>
          </Link>
        </S.Header>
        <Text>Nenhum contato cadastrado.</Text>
      </>
    )
  }

  const groups = groupContactsByInitial(data)
  const sortedGroups = Object.keys(groups).sort()

  return (
    <>
      <Search />
      <S.Header>
        <div>
          <Title>Meus Contatos</Title>
          <span>({data.length} total)</span>
        </div>
        <Link to="/contacts/new-contact">
          <Button icon={<Plus />} otherSide>
            Adicionar Contato
          </Button>
        </Link>
      </S.Header>
      <S.List>
        {sortedGroups.map((initial) => (
          <React.Fragment key={initial}>
            <S.GroupHeader>{initial}</S.GroupHeader>
            {groups[initial].map((contact) => (
              <ContactItem
                key={contact.id}
                {...contact}
                handleDelete={() => handleOpenDeleteModal(contact)}
              />
            ))}
          </React.Fragment>
        ))}
      </S.List>
      <Rodal
        visible={!!contactToDelete}
        onClose={() => setContactToDelete(null)}
        showCloseButton={false}
        closeOnEsc={false}
        closeMaskOnClick={false}
      >
        <S.ModalBody>
          <Text>Tem certeza que deseja excluir este contato?</Text>
          <GroupButtons>
            <Button
              category="danger"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? 'Excluindo...' : 'Sim'}
            </Button>
            <Button onClick={() => setContactToDelete(null)}>Não</Button>
          </GroupButtons>
        </S.ModalBody>
      </Rodal>
    </>
  )
}

export default ContactList

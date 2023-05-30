import { render, screen, fireEvent } from '../../utils/test-utils'
import { useQuery, useMutation } from 'react-query'

import ContactList from '.'

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn()
}))

// Reset all mocks after each test
afterEach(() => {
  jest.resetAllMocks()
})

describe('ContactList Component', () => {
  // renderiza a ContactList com loading
  // ensure that the ContactList will contain a loading (skeleton) if the loading state is true
  test('should render the loading', () => {
    // Mock useQuery to return isLoading as true and refetch as a jest function
    ;(useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      refetch: jest.fn()
    })

    render(<ContactList />)

    expect(screen.getByText(/Meus Contatos/i)).toBeInTheDocument()
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  // renderiza a ContactList com erro
  // ensure that the ContactList will contain a error message if the error state is true
  test('should render the error message', () => {
    // ensure that the Mock useQuery to return isError as true and refetch as a jest function
    ;(useQuery as jest.Mock).mockReturnValue({
      isError: true,
      refetch: jest.fn()
    })

    const { getByText } = render(<ContactList />)
    expect(
      getByText(/Tivemos algum problema ao realizar a sua solicitação/)
    ).toBeInTheDocument()
  })

  // renderiza a ContactList com os contatos corretamente, busca e botão de adicionar
  // ensures the ContactList will correctly render the contact list, the search and the add button
  test('should render the contact list', () => {
    const mockContacts = [
      {
        id: '1',
        name: 'John Doe',
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
      }
    ]

    // ensure that the Mock useQuery to return refetch as a jest function and data as mockContacts
    ;(useQuery as jest.Mock).mockReturnValue({
      data: mockContacts,
      refetch: jest.fn()
    })

    const { getByText, getAllByText, getByPlaceholderText } = render(
      <ContactList />
    )
    expect(getAllByText(/John Doe/)).toHaveLength(2)
    expect(getAllByText(/Jane Doe/)).toHaveLength(2)
    expect(getByPlaceholderText('Buscar contatos')).toBeInTheDocument()
    expect(getByText(/Adicionar Contato/)).toBeInTheDocument()
  })

  // testa o deletar contato
  // make sure the delete works correctly
  test('should delete a contact', async () => {
    const mockContacts = [
      {
        id: '1',
        name: 'John Doe',
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
      }
    ]

    // ensure that the Mock useQuery to return refetch as a jest function and data as mockContacts
    ;(useQuery as jest.Mock).mockReturnValue({
      data: mockContacts,
      refetch: jest.fn()
    })
    // ensure that the Mock useMutation to return mutate as a jest function
    const mockMutate = jest.fn()
    ;(useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate
    })

    const { getByText, getAllByText } = render(<ContactList />)

    const deleteButtons = screen.getAllByTestId('btn-delete')

    // Clicar no botão de excluir
    fireEvent.click(deleteButtons[0])

    // Verificar se o modal apareceu
    expect(
      getByText(/Tem certeza que deseja excluir este contato?/)
    ).toBeInTheDocument()

    // Clicar no botão de confirmação
    const confirmButton = screen.getByText(/Sim/i)
    fireEvent.click(confirmButton)

    // Verificar se a mutation foi chamada com o id do contato correto
    expect(mockMutate).toHaveBeenCalledWith('1')
  })

  // renderiza a ContactList sem nenhum contato
  // ensure that the ContactList will contain a empty message if the data is empty
  test('should show no contacts message when the list is empty', () => {
    // Mock useQuery to return refetch as a jest function and data as an empty array
    ;(useQuery as jest.Mock).mockReturnValue({
      data: [],
      refetch: jest.fn()
    })

    const { getByText } = render(<ContactList />)
    expect(getByText(/Nenhum contato cadastrado./)).toBeInTheDocument()
  })
})

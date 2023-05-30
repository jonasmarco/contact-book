import { render, waitFor, screen, act } from '../../utils/test-utils'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ContactBook } from '@/types/Contact'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Search from '.'

type SearchResult = Pick<ContactBook, 'name' | 'phoneNumbers'>[]

// Defina um servidor mock para interceptar as solicitações de API
const server = setupServer(
  rest.get('http://localhost:5000/contactBook', (req, res, ctx) => {
    // Responda com um resultado de busca mockado
    const mockResponse: SearchResult = [
      { name: 'John Doe', phoneNumbers: [{ number: '1234567890' }] },
      { name: 'Jane Doe', phoneNumbers: [{ number: '0987654321' }] }
    ]

    return res(ctx.json<SearchResult>(mockResponse))
  })
)

beforeAll(() => {
  server.listen()
  global.open = jest.fn()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Search Component', () => {
  // renderiza o Search corretamente e garante que as funcionalidade de busca e escolha de um resultado funcionam
  // ensures that Search renders correctly and that your core functionality is correct
  test('renders correctly and handles user typing and suggestions', async () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>
    )

    // Verifique se o input está na tela
    const input = screen.getByPlaceholderText('Buscar contatos')
    expect(input).toBeInTheDocument()

    // Simule a digitação do usuário
    await act(async () => {
      userEvent.type(input, 'John Doe')
    })

    // Aguarde o debouncing e a chamada de API
    await waitFor(() =>
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    )

    // Verifique se as sugestões corretas estão sendo exibidas
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()

    // Simule o clique em uma sugestão
    await act(async () => {
      userEvent.click(screen.getByText('John Doe'))
    })

    // Verifique se a sugestão foi corretamente preenchida no input
    expect(input).toHaveValue('John Doe')

    // Verifique se as sugestões foram limpas
    expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument()
  })

  // verifica se a funcionalidade de limpar a sugestão ao clicar no body está correta
  // ensures that suggestions are removed from the screen when clicking on the body
  test('clears suggestions when clicking outside of suggestions', async () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>
    )

    const input = screen.getByPlaceholderText('Buscar contatos')

    await act(async () => {
      userEvent.type(input, 'John Doe')
    })

    await waitFor(() =>
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    )

    // Clicando fora do elemento de sugestão
    await act(async () => {
      userEvent.click(document.body)
    })

    await waitFor(() =>
      expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument()
    )
  })

  // verifica se a funcionalidade de limpar a sugestão ao clicar na tecla esc
  // ensures that suggestions are removed from the screen when clicking on esc key
  test('clears suggestions when Esc key is pressed', async () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>
    )

    const input = screen.getByPlaceholderText('Buscar contatos')

    await act(async () => {
      userEvent.type(input, 'John Doe')
    })

    await waitFor(() =>
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    )

    // Pressionando a tecla Esc
    await act(async () => {
      userEvent.type(document.body, '{esc}')
    })

    await waitFor(() =>
      expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument()
    )
  })
})

import { render, screen, fireEvent } from '../../utils/test-utils'

import ContactItem, { DEFAULT_AVATAR_URL } from '.'

// Cria um mock para o objeto Props
const mockProps = {
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
  ],
  handleDelete: jest.fn()
}

const mockPropsMultiple = {
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
  ],
  handleDelete: jest.fn()
}

// Cria um mock para a lib Rodal
jest.mock('rodal', () => {
  return {
    __esModule: true,
    default: ({
      visible,
      onClose,
      children
    }: {
      visible: boolean
      onClose: () => void
      children: React.ReactNode
    }) => {
      if (visible) {
        return (
          <div role="dialog">
            <button role="close" onClick={onClose} />
            {children}
          </div>
        )
      }
      return null
    }
  }
})

describe('ContactItem Component', () => {
  // renderiza o ContactItem com nome e telefone correto
  // ensure the ContactItem renders with the correct data
  it('should render the contact name and phone number', () => {
    render(<ContactItem {...mockProps} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('11998765432')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://i.pravatar.cc/150?u=joao.silva'
    )
  })

  // chama a função de detalhar quando clicar no botão correto
  // ensures that the details modal will be opened when clicking on the details button
  it('should open and close the modal when the details button is clicked', () => {
    render(<ContactItem {...mockProps} />)

    const detailsButton = screen.getByTestId('btn-details')

    fireEvent.click(detailsButton)
    expect(screen.getByText('Telefones:')).toBeInTheDocument()
    expect(screen.getByText('Endereços:')).toBeInTheDocument()

    const closeButton = screen.getByRole('close')
    fireEvent.click(closeButton)
    expect(screen.queryByText('Telefones:')).not.toBeInTheDocument()
  })

  // chama a função de excluir quando clicar no botão correto
  // ensures that the delete function is called on clicking the correct button
  it('should call the delete function when the delete button is clicked', () => {
    render(<ContactItem {...mockProps} />)

    const deleteButton = screen.getByTestId('btn-delete')

    fireEvent.click(deleteButton)
    expect(mockProps.handleDelete).toHaveBeenCalledTimes(1)
  })

  // verifica se o avatar padrão é usado quando a foto não é fornecida
  // ensures that the ContactItem will render the default avatar if the photo property is not passed
  it('should use the default avatar when photo is not provided', () => {
    render(<ContactItem {...mockPropsMultiple} />)

    expect(screen.getByRole('img')).toHaveAttribute('src', DEFAULT_AVATAR_URL)
  })

  // verifica se o Rodal não é renderizado quando isModalOpen é falso
  // ensure the modal is not rendered
  it('should not render Rodal when isModalOpen is false', () => {
    render(<ContactItem {...mockPropsMultiple} />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  // verifica se o ContactItem é renderizado corretamente quando há mais de um número de telefone e mais de um endereço
  // ensure that the ContactItem renders correctly with multiple phones and addresses
  it('should render correctly when there are multiple phone numbers and addresses', () => {
    render(<ContactItem {...mockPropsMultiple} />)

    fireEvent.click(screen.getByTestId('btn-details'))

    expect(screen.getAllByRole('link', { name: /43998765432/i })).toHaveLength(
      2
    )
    expect(screen.getAllByRole('link', { name: /44987654321/i })).toHaveLength(
      1
    )
    expect(
      screen.getAllByRole('link', {
        name: /Rua 100 - 100, Bairro 100, Localidade 100-UF 100/i
      })
    ).toHaveLength(1)
    expect(
      screen.getAllByRole('link', {
        name: /Rua 200 - 200, Bairro 200, Localidade 200-UF 200/i
      })
    ).toHaveLength(1)
  })
})

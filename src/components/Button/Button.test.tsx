import { render, screen, fireEvent } from '../../utils/test-utils'
import { Peace } from '@styled-icons/bootstrap'

import Button from '.'

describe('Button Component', () => {
  // (renderiza com o texto correto):
  // ensures that the button renders with the correct text that was passed in as a child component.
  it('renders with the correct text', () => {
    const { getByText } = render(<Button>Click Me</Button>)
    expect(getByText('Click Me')).toBeInTheDocument()
  })

  // (renderiza com o tamanho correto):
  // ensures that the button renders with the correct size, based on the prop that was passed in.
  it('renders with the correct size', () => {
    render(<Button size="large">Click Me</Button>)
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveStyle(
      'min-height: 5rem'
    )
  })

  // (renderiza com a categoria correta):
  // ensures that the button renders with the correct category, based on the prop that was passed in.
  it('renders with the correct category', () => {
    render(<Button category="secondary">Click Me</Button>)
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveStyle(
      'background-color: #FCFCFC'
    )
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveStyle(
      'border: 1px solid #596E7D'
    )
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveStyle(
      'color: #596E7D'
    )
  })

  // (renderiza com a largura total):
  // ensures that the button is rendered with the correct width
  it('renders with the correct width', () => {
    render(<Button fullWidth>Click Me</Button>)
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveStyle(
      'width: 100%'
    )
  })

  // (renderiza com um ícone)
  // ensures that the button is rendered with an icon
  it('renders with an icon', () => {
    render(<Button icon={<Peace data-testid="icon" />}>Click Me</Button>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  // (renderiza como desabilitado):
  // ensures that the button renders as disabled when the disabled prop is passed in.
  it('renders as disabled', () => {
    render(<Button disabled>Click Me</Button>)
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveStyle(
      'cursor: not-allowed'
    )
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveStyle(
      'opacity: 0.3'
    )
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveStyle(
      'pointer-events: none'
    )
  })

  // (renderiza como um link):
  // ensures that the button renders as a link
  it('renders as a link', () => {
    render(
      <Button as="a" href="/link">
        Click Me
      </Button>
    )
    expect(screen.getByRole('link', { name: /Click Me/i })).toHaveAttribute(
      'href',
      '/link'
    )
  })

  // (chama a função onClick quando clicado):
  // ensures that the onClick function is called when the button is clicked.
  it('calls onClick function when clicked', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>
    )
    fireEvent.click(getByText('Click Me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})

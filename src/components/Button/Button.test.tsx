import { render, screen, fireEvent } from '../../utils/test-utils'
import { Peace } from '@styled-icons/bootstrap'

import theme from '@/styles/theme'
import Button from '.'

describe('Button Component', () => {
  // (renderiza sem erros):
  // ensures that the Button is rendered without errors
  test('is rendered without error', () => {
    render(<Button>Click Me</Button>)
  })

  // (renderiza com o texto correto):
  // ensures that the Button is rendered with the correct text that was passed in as a child component
  it('is rendered with the correct text', () => {
    const { getByText } = render(<Button>Click Me</Button>)
    expect(getByText('Click Me')).toBeInTheDocument()
  })

  // (renderiza com o tamanho correto):
  // ensures that the Button is rendered with the correct size, based on the prop that was passed in.
  it('is rendered with the correct size', () => {
    render(<Button size="large">Click Me</Button>)
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveStyle(
      'min-height: 5rem'
    )
  })

  // (renderiza com a categoria correta (secondary)):
  // ensures that the Button is rendered with the correct category, based on the prop that was passed in
  it('is rendered with the correct category', () => {
    render(<Button category="secondary">Click Me</Button>)
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveStyle(`
      background-color: ${theme.colors.secondary};
      border: 1px solid ${theme.colors.secondary};
      color: ${theme.colors.white};
    `)
  })

  // (renderiza com a categoria correta (success)):
  // ensures that the Button is rendered with the correct category, based on the prop that was passed in
  it('is rendered with the correct category', () => {
    render(<Button category="success">Click Me</Button>)
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveStyle(`
      background-color: ${theme.colors.green};
      border: 1px solid ${theme.colors.green};
      color: ${theme.colors.white};
    `)
  })

  // (renderiza com a categoria correta (warning)):
  // ensures that the Button is rendered with the correct category, based on the prop that was passed in
  it('is rendered with the correct category', () => {
    render(<Button category="warning">Click Me</Button>)
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveStyle(`
      background-color: ${theme.colors.yellow};
      border: 1px solid ${theme.colors.yellow};
      color: ${theme.colors.white};
    `)
  })

  // (renderiza com a largura total):
  // ensures that the Button is rendered with the correct width
  it('is rendered with the correct width', () => {
    render(<Button fullWidth>Click Me</Button>)
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveStyle(
      'width: 100%'
    )
  })

  // (renderiza com um ícone)
  // ensures that the Button is rendered with an icon
  it('is rendered with an icon', () => {
    render(<Button icon={<Peace data-testid="icon" />}>Click Me</Button>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  // (renderiza com um ícone no lado esquerdo):
  // ensure that the Button is rendered with an icon on the left
  it('is rendered with the icon on the opposite side when otherSide prop is true', () => {
    render(
      <Button icon={<Peace data-testid="icon" />} otherSide>
        Click Me
      </Button>
    )
    const button = screen.getByRole('button', { name: /Click Me/i })
    const icon = screen.getByTestId('icon')
    expect(button).toContainElement(icon)
    expect(button.firstChild).toBe(icon)
  })

  // (renderiza como desabilitado):
  // ensures that the Button is rendered as disabled when the disabled prop is passed in
  it('is rendered as disabled', () => {
    render(<Button disabled>Click Me</Button>)
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveStyle(`
      cursor: not-allowed;
      opacity: 0.3;
      pointer-events: none;
    `)
  })

  // (renderiza como um link):
  // ensures that the Button is rendered as a link
  it('is rendered as a link', () => {
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
  // ensures that the onClick function is called when the Button is clicked
  it('calls onClick function when clicked', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>
    )
    fireEvent.click(getByText('Click Me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // (renderiza com um tipo diferente de botão):
  // ensure that the Button is rendered as a different type of Button, based on the prop that was passed
  it('is rendered with a different type of button', () => {
    render(<Button type="submit">Click Me</Button>)
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveAttribute(
      'type',
      'submit'
    )
  })

  // (renderiza com uma classe passada por className):
  // ensure that the Button is rendered with the class passed by className
  it('applies custom CSS class when className prop is provided', () => {
    render(<Button className="custom-button">Click Me</Button>)
    expect(screen.getByRole('button', { name: /Click Me/i })).toHaveClass(
      'custom-button'
    )
  })

  // (testa a propagação de eventos quando o botão contém elementos filhos interativos):
  // Este teste garante que quando há elementos filhos interativos no botão, os eventos de clique são propagados corretamente.
  // Neste caso, quando o elemento filho é clicado, o manipulador de cliques definido para o elemento filho é chamado exatamente uma vez.
  // ensures that if the Button has an interactive child element, the click event is correctly propagated
  it('tests event propagation when the button contains interactive child elements', () => {
    const handleChildClick = jest.fn()
    const { getByText } = render(
      <Button onClick={() => {}}>
        <span onClick={handleChildClick}>Child Element</span>
      </Button>
    )
    fireEvent.click(getByText('Child Element'))
    expect(handleChildClick).toHaveBeenCalledTimes(1)
  })

  // (snapshot)
  it('matches the snapshot in different configurations', () => {
    const { container } = render(
      <div>
        <Button>Default</Button>
        <Button size="large">Large</Button>
        <Button category="secondary">Secondary</Button>
        <Button fullWidth>Full Width</Button>
        <Button icon={<Peace />}>{}</Button>
        <Button disabled>Disabled</Button>
        <Button as="a" href="/link">
          Link
        </Button>
      </div>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})

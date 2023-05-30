import { render, screen } from '../../utils/test-utils'
import Navigation from '.'

describe('Navigation Component', () => {
  // (renderiza sem erros):
  // ensures that the Navigation is rendered without errors
  test('is rendered without error', () => {
    render(<Navigation />)
  })

  // (renderiza com a Navigation com dois links):
  // ensure Navigation is rendered with two links
  test('is rendered the correct list items', () => {
    render(<Navigation />)

    const menuItems = screen.getAllByRole('listitem')
    expect(menuItems.length).toBe(2)
  })

  // (renderiza com a lista de links corretos):
  // ensure Navigation is rendered with correct links
  test('is rendered correct navigation links', () => {
    render(<Navigation />)

    const bookContactsLink = screen.getByTestId('book-contacts')
    const gearLink = screen.getByTestId('gear')

    expect(bookContactsLink).toBeInTheDocument()
    expect(bookContactsLink).toHaveAttribute('href', '/')

    expect(gearLink).toBeInTheDocument()
    expect(gearLink).toHaveAttribute('href', '/contacts/import-contacts')
  })

  // (snapshot)
  test('matches snapshot', () => {
    const { asFragment } = render(<Navigation />)
    expect(asFragment()).toMatchSnapshot()
  })
})

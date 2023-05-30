import { render } from '../../utils/test-utils'

import theme from '@/styles/theme'
import Title from '.'

describe('Title Component', () => {
  // (renderiza sem erros):
  // ensures that the Title is rendered without errors
  test('is rendered without error', () => {
    render(<Title>My Title</Title>)
  })

  // (renderiza com o texto correto):
  // ensures that the Title is rendered with the correct text
  test('is rendered the correct text', () => {
    const { getByText } = render(<Title>My Title</Title>)
    const titleElement = getByText('My Title')
    expect(titleElement).toBeInTheDocument()
  })

  // (renderiza com o estilo correto):
  // ensures that the Title is rendered with the correct styles
  test('applies the correct styles', () => {
    const { getByText } = render(<Title>My Title</Title>)
    const titleElement = getByText('My Title')
    expect(titleElement).toHaveStyle(`
      color: ${theme.colors.primary};
      font-size: ${theme.fonts.sizes.normal};
      font-weight: ${theme.fonts.weights.slim};
      letter-spacing: ${theme.text.letterSpacing};
    `)
  })

  // (renderiza com o estilo correto em diferentes resoluções):
  // ensure that the Title is rendered with the correct styles according to the resolution
  test('applies different styles for tablet and notebook screens', () => {
    const { getByText } = render(<Title>My Title</Title>)
    const titleElement = getByText('My Title')
    expect(titleElement).toHaveStyleRule(
      'font-size',
      theme.fonts.sizes.extraLarge,
      {
        media: '(min-width: 769px)'
      }
    )
    expect(titleElement).toHaveStyleRule(
      'font-size',
      theme.fonts.sizes.bigger,
      {
        media: '(min-width: 1367px)'
      }
    )
  })

  // (snapshot)
  test('matches the snapshot', () => {
    const { asFragment } = render(<Title>My Title</Title>)
    expect(asFragment()).toMatchSnapshot()
  })
})

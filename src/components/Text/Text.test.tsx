import { render } from '../../utils/test-utils'

import theme from '@/styles/theme'
import Text from '.'

describe('Text Component', () => {
  // (renderiza sem erros):
  // ensures that the Text is rendered without errors
  test('is rendered without error', () => {
    render(<Text>Lorem ipsum</Text>)
  })

  // (renderiza com o texto correto):
  // ensures that the Text is rendered with the correct text
  test('is rendered with correct text', () => {
    const { getByText } = render(<Text>Lorem ipsum</Text>)
    const textElement = getByText('Lorem ipsum')
    expect(textElement).toBeInTheDocument()
  })

  // (renderiza com o estilo correto)
  // ensures that the Text is rendered with the correct styles
  test('applies the correct default styles', () => {
    const { getByText } = render(<Text>Lorem ipsum</Text>)
    const textElement = getByText('Lorem ipsum')
    expect(textElement).toHaveStyle(`
      color: ${theme.colors.white};
      font-size: ${theme.fonts.sizes.small};
      line-height: ${theme.text.lineHeight};
      margin-bottom: ${theme.margin.textMargin};
    `)
  })

  // (renderiza com o estilo danger)
  // ensures that Text is rendered with the correct "danger" styles
  test('applies the correct danger styles', () => {
    const { getByText } = render(<Text danger>Lorem ipsum</Text>)
    const textElement = getByText('Lorem ipsum')
    expect(textElement).toHaveStyle(`
      color: ${theme.colors.red};
      font-size: ${theme.fonts.sizes.small};
      line-height: ${theme.text.lineHeight};
      margin-bottom: ${theme.margin.textMargin};
    `)
  })

  // (renderiza com o estilo correto em diferentes resoluções):
  // ensure that the Title is rendered with the correct styles according to the resolution
  test('applies different styles for tablet and notebook screens', () => {
    const { getByText } = render(<Text danger>Lorem ipsum</Text>)
    const textElement = getByText('Lorem ipsum')
    expect(textElement).toHaveStyleRule('font-size', theme.fonts.sizes.normal, {
      media: '(min-width: 769px)'
    })
    expect(textElement).toHaveStyleRule('font-size', theme.fonts.sizes.large, {
      media: '(min-width: 1367px)'
    })
  })

  // (snapshot)
  test('matches the snapshot', () => {
    const { asFragment } = render(<Text danger>Lorem ipsum</Text>)
    expect(asFragment()).toMatchSnapshot()
  })
})

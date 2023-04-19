import styled, { css } from 'styled-components'
import { customMedia } from '../MediaMatch'

export const Wrapper = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-size: ${theme.fonts.sizes.normal};
    font-weight: ${theme.fonts.weights.slim};
    letter-spacing: ${theme.text.letterSpacing};
    ${customMedia.greaterThan('tabletUp')`
      font-size: ${theme.fonts.sizes.extraLarge};
    `};
    ${customMedia.greaterThan('notebookUp')`
      font-size: ${theme.fonts.sizes.bigger};
    `};
  `}
`

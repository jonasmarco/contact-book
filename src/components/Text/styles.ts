import styled, { css } from 'styled-components'
import { customMedia } from '../MediaMatch'

import { Props } from '.'

type WrapperProps = Pick<Props, 'danger'>

export const Wrapper = styled.p<WrapperProps>`
  ${({ theme, danger }) => css`
    color: ${danger ? theme.colors.red : theme.colors.white};
    font-size: ${theme.fonts.sizes.small};
    line-height: ${theme.text.lineHeight};
    margin-bottom: ${theme.margin.textMargin};
    ${customMedia.greaterThan('tabletUp')`
      font-size: ${theme.fonts.sizes.normal};
    `};
    ${customMedia.greaterThan('notebookUp')`
      font-size: ${theme.fonts.sizes.large};
    `};
  `}
`

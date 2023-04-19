import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    margin: 0 auto;
    max-width: ${theme.grid.container};
    padding-left: ${theme.grid.defaultPadding};
    padding-right: ${theme.grid.defaultPadding};
  `}
`

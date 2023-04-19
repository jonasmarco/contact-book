import styled, { css } from 'styled-components'

export const Main = styled.main`
  ${({ theme }) => css`
    background-color: ${theme.colors.darkBlue};
    display: flex;
    min-height: 100vh;
  `}
`

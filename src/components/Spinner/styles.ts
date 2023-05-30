import styled, { css, keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const Spinner = styled.section`
  ${({ theme }) => css`
    -webkit-animation: ${spin} 2s linear infinite; /* Safari */
    animation: ${spin} 2s linear infinite;
    border-radius: ${theme.border.rounded};
    border: 2px solid ${theme.colors.black};
    border-top: 2px solid ${theme.colors.primary};
    height: 30px;
    margin: 1rem;
    width: 30px;
  `}
`

import styled, { css } from 'styled-components'
import { NavLink as Link } from 'react-router-dom'

export const Nav = styled.nav`
  ${({ theme }) => css`
    border-right: 0.1rem solid rgba(255, 255, 255, 0.1);
    box-shadow: inset 5px 0px 10px -8px rgb(0 0 0 / 12%);
    display: flex;
    height: 100vh;
    justify-content: center;
    padding-top: 6rem;
    width: 6rem;
    > ul {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  `}
`

export const MenuItem = styled(Link)`
  ${({ theme }) => css`
    align-items: center;
    border-bottom: 0.1rem solid rgba(255, 255, 255, 0.1);
    display: flex;
    height: 4rem;
    justify-content: center;
    svg {
      color: ${theme.colors.white};
      width: 1.8rem;
    }
    &:hover,
    &:focus {
      background-color: ${theme.colors.gray};
    }
    &.active {
      background-color: ${theme.colors.gray};
      border-left: 0.1rem solid ${theme.colors.primary};
    }
  `}
`

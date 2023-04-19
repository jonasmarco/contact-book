import styled, { css } from 'styled-components'
import { customMedia } from '../MediaMatch'

export const ContactItem = styled.article`
  ${({ theme }) => css`
    align-items: center;
    background-color: ${theme.colors.white};
    border-radius: ${theme.border.radius};
    box-shadow: rgb(255 255 255 / 50%) 0px 5px 10px -5px;
    display: flex;
    flex-direction: column;
    gap: ${theme.layout.mobile.gap};
    justify-content: space-between;
    padding: 1.5rem;
    width: 100%;
    ${customMedia.greaterThan('tabletUp')`
      flex-flow: row wrap;
      gap: 0;
    `};
    > div {
      &:nth-child(1) {
        flex-grow: 2;
      }
      &:nth-child(2) {
        display: flex;
        gap: ${theme.layout.gapForm};
        justify-content: end;
      }
      > a {
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: ${theme.layout.gapForm};
        ${customMedia.greaterThan('tabletUp')`
          flex-direction: row;
        `};
        > h3 {
          font-size: ${theme.fonts.sizes.normal};
        }
        > span {
          font-size: ${theme.fonts.sizes.large};
        }
      }
    }
  `}
`

export const Avatar = styled.img`
  ${({ theme }) => css`
    border-radius: ${theme.border.rounded};
    border: 0.2rem solid ${theme.colors.primary};
    height: 6rem;
  `}
`

export const ModalBody = styled.section`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: ${theme.layout.gapForm};
    justify-content: center;
    h2 {
      font-size: ${theme.fonts.sizes.extraLarge};
    }
    a {
      color: ${theme.colors.black};
      display: block;
      font-size: ${theme.fonts.sizes.normal};
      margin-bottom: ${theme.margin.textMargin};
    }
    p {
      color: ${theme.colors.black};
    }
  `}
`

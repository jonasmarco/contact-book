import styled, { css } from 'styled-components'
import { customMedia } from '@/components/MediaMatch'

export const Header = styled.header`
  ${({ theme }) => css`
    align-items: baseline;
    display: flex;
    justify-content: space-between;
    > div {
      align-items: baseline;
      display: flex;
      gap: 1rem;
      margin-bottom: ${theme.margin.textMargin};
      ${customMedia.greaterThan('tabletUp')`
        gap: 2rem;
        margin-bottom: 2rem;
      `};
      ${customMedia.greaterThan('notebookUp')`
        margin-bottom: 3rem;
      `};
      > span {
        color: ${theme.colors.secondary};
        font-size: ${theme.fonts.sizes.small};
        font-weight: ${theme.fonts.weights.bold};
        ${customMedia.greaterThan('tabletUp')`
          font-size: ${theme.fonts.sizes.normal};
        `};
      }
    }
    > a {
      > button {
        > span {
          display: none;
          ${customMedia.greaterThan('tabletUp')`
            display: block;
          `};
        }
      }
    }
  `}
`

export const GroupHeader = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-size: ${theme.fonts.sizes.large};
    font-weight: ${theme.fonts.weights.normal};
  `}
`

export const List = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.layout.mobile.gap};
  `}
`

export const ModalBody = styled.section`
  ${({ theme }) => css`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: ${theme.layout.gapForm};
    justify-content: center;
    text-align: center;
    p {
      color: ${theme.colors.black};
    }
  `}
`

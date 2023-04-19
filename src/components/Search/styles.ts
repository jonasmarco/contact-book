import styled, { css } from 'styled-components'
import { customMedia } from '@/components/MediaMatch'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${theme.margin.textMargin};
    ${customMedia.greaterThan('tabletUp')`
      gap: 2rem;
      margin-bottom: 2rem;
    `};
    ${customMedia.greaterThan('notebookUp')`
      margin-bottom: 3rem;
    `};
    > h1 {
      margin-bottom: ${theme.margin.textMargin};
      ${customMedia.greaterThan('tabletUp')`
        gap: 2rem;
        margin-bottom: 2rem;
      `};
    }
  `};
`

export const Suggestions = styled.ul`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    border-radius: 0rem 0rem ${theme.border.radius} ${theme.border.radius};
    list-style: none;
    margin-left: auto;
    margin-right: auto;
    max-width: 98%;
    width: 100%;
  `};
`

export const Suggestion = styled.li`
  ${({ theme }) => css`
    cursor: pointer;
    font-size: ${theme.fonts.sizes.small};
    padding: 2rem;
  `};
`

import styled, { css } from 'styled-components'
import { customMedia } from '@/components/MediaMatch'

export const Section = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.colors.tertiary};
    width: 100%;
  `}
`

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding-bottom: ${theme.layout.mobile.gap};
    padding-top: ${theme.layout.mobile.gap};
    ${customMedia.greaterThan('tabletUp')`
      padding-bottom: ${theme.layout.tablet.gap};
      padding-top: ${theme.layout.tablet.gap};
    `};
    ${customMedia.greaterThan('notebookUp')`
      padding-bottom: ${theme.layout.notebook.gap};
      padding-top: ${theme.layout.notebook.gap};
    `};
  `}
`

export const Header = styled.header`
  ${({ theme }) => css`
    margin-bottom: ${theme.margin.normal};
  `}
`

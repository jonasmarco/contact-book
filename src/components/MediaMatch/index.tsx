import styled, { css } from 'styled-components'
import media, { DefaultBreakpoints, generateMedia } from 'styled-media-query'

export const NOTEBOOK_UP = 1367
export const NOTEBOOK_DOWN = 1366
export const TABLET_UP = 769
export const TABLET_DOWN = 768
export const MOBILE_UP = 461
export const MOBILE_DOWN = 460

export const customMedia = generateMedia({
  notebookUp: `${NOTEBOOK_UP}px`,
  notebookDown: `${NOTEBOOK_DOWN}px`,
  tabletUp: `${TABLET_UP}px`,
  tabletDown: `${TABLET_DOWN}px`,
  mobileUp: `${MOBILE_UP}px`,
  mobileDown: `${MOBILE_DOWN}px`
})

type breakpoint = keyof DefaultBreakpoints
// {
//   huge: '1440px',
//   large: '1170px',
//   medium: '768px',
//   small: '450px',
// }

export type MediaMatchProps = {
  lessThan?: breakpoint
  greaterThan?: breakpoint
}

const mediaMatchModifiers = {
  lessThan: (size: breakpoint) => css`
    ${media.lessThan(size)` display: block `}
  `,

  greaterThan: (size: breakpoint) => css`
    ${media.greaterThan(size)` display: block `}
  `
}

export default styled.div<MediaMatchProps>`
  ${({ lessThan, greaterThan }) => css`
    display: none;

    ${!!lessThan && mediaMatchModifiers.lessThan(lessThan)}
    ${!!greaterThan && mediaMatchModifiers.greaterThan(greaterThan)}
  `}
`

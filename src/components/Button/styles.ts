import styled, { css, DefaultTheme } from 'styled-components'
import { Props } from '.'
import { customMedia } from '../MediaMatch'

type WrapperProps = {
  hasIcon: boolean
} & Pick<Props, 'size' | 'category' | 'fullWidth' | 'otherSide'>

const wrapperModifiers = {
  normal: (theme: DefaultTheme) => css`
    font-size: ${theme.fonts.sizes.normal};
    min-height: 4rem;
  `,
  large: (theme: DefaultTheme) => css`
    font-size: ${theme.fonts.sizes.large};
    min-height: 5rem;
  `,

  primary: (theme: DefaultTheme) => css`
    background: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary};
    color: ${theme.colors.white};
    position: relative;
    z-index: ${theme.layers.behindMenu};
    span {
      line-height: ${theme.text.lineHeight};
    }
    &:not(:disabled):hover,
    &:not(:disabled):focus {
      background-color: ${theme.colors.gray};
      border-color: ${theme.colors.gray};
      box-shadow: 0 15px 20px rgba(0, 0, 0, 0.16), 0 5px 8px rgba(0, 0, 0, 0.08);
      span {
        color: ${theme.colors.white};
      }
      svg {
        fill: ${theme.colors.white};
      }
    }
  `,
  secondary: (theme: DefaultTheme) => css`
    background: ${theme.colors.secondary};
    border: 1px solid ${theme.colors.secondary};
    color: ${theme.colors.white};
    position: relative;
    z-index: ${theme.layers.behindMenu};
    span {
      line-height: ${theme.text.lineHeight};
    }
    &:not(:disabled):hover,
    &:not(:disabled):focus {
      background-color: ${theme.colors.blue};
      border-color: ${theme.colors.blue};
      box-shadow: 0 15px 20px rgba(0, 0, 0, 0.16), 0 5px 8px rgba(0, 0, 0, 0.08);
      span {
        color: ${theme.colors.white};
      }
      svg {
        fill: ${theme.colors.white};
      }
    }
  `,
  danger: (theme: DefaultTheme) => css`
    background: ${theme.colors.red};
    border: 1px solid ${theme.colors.red};
    color: ${theme.colors.white};
    position: relative;
    z-index: ${theme.layers.behindMenu};
    span {
      line-height: ${theme.text.lineHeight};
    }
    &:not(:disabled):hover,
    &:not(:disabled):focus {
      background-color: ${theme.colors.black};
      border-color: ${theme.colors.black};
      box-shadow: 0 15px 20px rgba(0, 0, 0, 0.16), 0 5px 8px rgba(0, 0, 0, 0.08);
      span {
        color: ${theme.colors.white};
      }
      svg {
        fill: ${theme.colors.white};
      }
    }
  `,
  success: (theme: DefaultTheme) => css`
    background: ${theme.colors.green};
    border: 1px solid ${theme.colors.green};
    color: ${theme.colors.white};
    position: relative;
    z-index: ${theme.layers.behindMenu};
    span {
      line-height: ${theme.text.lineHeight};
    }
    &:not(:disabled):hover,
    &:not(:disabled):focus {
      background-color: ${theme.colors.black};
      border-color: ${theme.colors.black};
      box-shadow: 0 15px 20px rgba(0, 0, 0, 0.16), 0 5px 8px rgba(0, 0, 0, 0.08);
      span {
        color: ${theme.colors.white};
      }
      svg {
        fill: ${theme.colors.white};
      }
    }
  `,
  warning: (theme: DefaultTheme) => css`
    background: ${theme.colors.yellow};
    border: 1px solid ${theme.colors.yellow};
    color: ${theme.colors.white};
    position: relative;
    z-index: ${theme.layers.behindMenu};
    span {
      line-height: ${theme.text.lineHeight};
    }
    &:not(:disabled):hover,
    &:not(:disabled):focus {
      background-color: ${theme.colors.black};
      border-color: ${theme.colors.black};
      box-shadow: 0 15px 20px rgba(0, 0, 0, 0.16), 0 5px 8px rgba(0, 0, 0, 0.08);
      span {
        color: ${theme.colors.white};
      }
      svg {
        fill: ${theme.colors.white};
      }
    }
  `,

  fullWidth: () => css`
    width: 100%;
  `,
  withIcon: (otherSide: boolean) => css`
    align-items: center;
    justify-content: center;
    span {
      margin: ${otherSide === false ? '0 1rem 0 0' : '0 0 0 1rem'};
    }
    svg {
      width: 1.5rem;
    }
  `,
  disabled: () => css`
    &:disabled {
      cursor: not-allowed;
      opacity: 0.3;
      pointer-events: none;
      transition: none;
    }
  `
}

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, size, category, fullWidth, otherSide, hasIcon, disabled }) => css`
    align-items: center;
    border-radius: 1rem;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    padding: 0 1.6rem;
    transition: background-color 250ms ease-in-out,
      border-color 250ms ease-in-out, box-shadow 250ms ease-in-out;
    ${customMedia.greaterThan('tabletUp')`
      justify-content: start;
    `}
    span {
      transition: color 250ms ease-in-out;
    }
    svg {
      transition: fill 250ms ease-in-out;
    }

    ${!!size && wrapperModifiers[size](theme)};
    ${!!category && wrapperModifiers[category](theme)};
    ${!!fullWidth && wrapperModifiers.fullWidth()};
    ${!!hasIcon && wrapperModifiers.withIcon(otherSide!)};
    ${disabled && wrapperModifiers.disabled()};
  `}
`

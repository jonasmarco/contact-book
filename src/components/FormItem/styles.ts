import styled, { css, DefaultTheme } from 'styled-components'
import { Props } from '.'

type WrapperProps = {} & Pick<Props, 'multiple' | 'disabled'>

const wrapperModifiers = {
  multiple: () => css`
    > div {
      flex-direction: column;
    }
  `,

  disabled: (theme: DefaultTheme) => css`
    input {
      background-color: ${theme.colors.darkBlue};
      border-color: ${theme.colors.darkBlue};
      pointer-events: none;
    }
  `
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, multiple, disabled }) => css`
    display: flex;
    flex-direction: column;
    margin-bottom: ${theme.margin.normal};
    label {
      color: ${theme.colors.white};
      font-size: ${theme.fonts.sizes.large};
      margin-bottom: ${theme.margin.textMargin};
    }
    div {
      align-items: center;
      display: flex;
      gap: ${theme.layout.gapForm};
      margin-bottom: ${theme.margin.normal};
      width: 100%;
    }
    input {
      border-radius: ${theme.border.radius};
      border: 1px solid ${theme.colors.black};
      font-size: ${theme.fonts.sizes.normal};
      height: 5rem;
      padding-left: 2rem;
      width: inherit;
      &:focus,
      &:hover {
        border: 1px solid ${theme.colors.primary};
        outline: none;
      }
    }
    ${multiple && wrapperModifiers.multiple()};
    ${disabled && wrapperModifiers.disabled(theme)};
  `}
`

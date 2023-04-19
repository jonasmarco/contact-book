import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

import * as S from './styles'

type ButtonProps =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>

export type Props = {
  children: React.ReactNode
  size?: 'normal' | 'large'
  category?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
  fullWidth?: boolean
  icon?: React.ReactNode
  otherSide?: boolean
  as?: React.ElementType
} & ButtonProps

const Button = ({
  children,
  size = 'normal',
  category = 'primary',
  fullWidth = false,
  icon,
  otherSide = false,
  ...props
}: Props): JSX.Element => {
  return (
    <S.Wrapper
      size={size}
      category={category}
      fullWidth={fullWidth}
      hasIcon={!!icon}
      otherSide={otherSide}
      {...props}
    >
      {icon && otherSide && icon}
      {!!children && <span>{children}</span>}
      {icon && !otherSide && icon}
    </S.Wrapper>
  )
}

export default Button

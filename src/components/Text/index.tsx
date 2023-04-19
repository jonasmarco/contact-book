import React from 'react'
import * as S from './styles'

export type TextProps = {
  children: string | React.ReactNode
  danger?: boolean
}

const Text = ({ children, danger = false }: TextProps) => {
  return <S.Wrapper danger={danger}>{children}</S.Wrapper>
}

export default Text

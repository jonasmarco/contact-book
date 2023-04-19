import * as S from './styles'

export type Props = {
  children: React.ReactNode
  multiple?: boolean
  disabled?: boolean
  id?: string
}

const FormItem = ({ children, multiple = false, disabled = false }: Props) => {
  return (
    <S.Wrapper multiple={multiple} disabled={disabled}>
      {children}
    </S.Wrapper>
  )
}

export default FormItem

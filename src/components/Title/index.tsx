import * as S from './styles'

export type Props = {
  children: string
}

const Title = ({ children }: Props) => {
  return <S.Wrapper>{children}</S.Wrapper>
}

export default Title

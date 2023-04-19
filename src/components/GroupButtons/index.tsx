import * as S from './styles'

type Props = {
  children: React.ReactNode
}

const GroupButtons = ({ children }: Props) => {
  return <S.Wrapper>{children}</S.Wrapper>
}

export default GroupButtons

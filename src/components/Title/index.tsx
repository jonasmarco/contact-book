import * as S from './styles'

type TitleProps = {
  children: string
}

const Title = ({ children }: TitleProps) => {
  return <S.Wrapper>{children}</S.Wrapper>
}

export default Title

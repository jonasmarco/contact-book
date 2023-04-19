import * as S from './styles'

type InlineListProps = {
  children: React.ReactNode
}

const InlineList = ({ children }: InlineListProps) => {
  return <S.List>{children}</S.List>
}

export default InlineList

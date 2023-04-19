import * as S from './styles'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <S.Main>{children}</S.Main>
    </>
  )
}

export default Layout

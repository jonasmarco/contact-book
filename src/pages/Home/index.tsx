import ContactList from '@/components/ContactList'
import Container from '@/components/Container'

import * as S from './styles'

const Home = () => {
  return (
    <S.Section>
      <Container>
        <S.Wrapper>
          <ContactList />
        </S.Wrapper>
      </Container>
    </S.Section>
  )
}

export default Home

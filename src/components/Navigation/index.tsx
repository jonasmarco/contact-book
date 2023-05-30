import InlineList from '@/components/InlineList'

import { BookContacts } from '@styled-icons/fluentui-system-regular'
import { Gear } from '@styled-icons/evil'

import * as S from './styles'

const Navigation = () => {
  return (
    <S.Nav>
      <InlineList>
        <li>
          <S.MenuItem to="/" data-testid="book-contacts">
            <BookContacts />
          </S.MenuItem>
        </li>
        <li>
          <S.MenuItem to="/contacts/import-contacts" data-testid="gear">
            <Gear />
          </S.MenuItem>
        </li>
      </InlineList>
    </S.Nav>
  )
}

export default Navigation

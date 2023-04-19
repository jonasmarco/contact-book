import React from 'react'

import FormItem from '@/components/FormItem'
import Title from '@/components/Title'

import { useDebounce } from '@/hooks/useDebounce'
import { useQuery } from 'react-query'
import { ContactBook } from '@/types/Contact'
import { searchContacts } from '@/api/contactBook'
import { onlyNumbers } from '@/utils/onlyNumbers'

import * as S from './styles'

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [suggestions, setSuggestions] = React.useState<
    { name: string; phone: string }[]
  >([])

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { data: searchResults, isLoading: isSearching } = useQuery(
    ['search', debouncedSearchTerm],
    () => searchContacts(debouncedSearchTerm),
    {
      enabled: !!debouncedSearchTerm
    }
  )

  React.useEffect(() => {
    if (searchResults) {
      setSuggestions(
        searchResults?.map((result: ContactBook) => ({
          name: result.name,
          phone: result.phoneNumbers[0].number
        }))
      )
    } else {
      setSuggestions([])
    }
  }, [searchResults])

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const term = event.target.value
    setSearchTerm(term)
  }

  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSuggestionClick = (suggestion: {
    name: string
    phone: string
  }) => {
    setSearchTerm(suggestion.name)
    setSuggestions([])
  }

  const handleSuggestionsClose = () => {
    setSuggestions([])
    if (inputRef.current && inputRef.current.value) {
      setSearchTerm(inputRef.current.value)
    }
  }

  React.useEffect(() => {
    const handleCloseOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      if (
        !target.closest('#suggestions') &&
        !document.querySelector('#suggestions')?.contains(target)
      ) {
        handleSuggestionsClose()
      }
    }

    const handleCloseOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleSuggestionsClose()
      }
    }

    document.addEventListener('click', handleCloseOnOutsideClick)
    document.addEventListener('keydown', handleCloseOnEscape)

    return () => {
      document.removeEventListener('click', handleCloseOnOutsideClick)
      document.removeEventListener('keydown', handleCloseOnEscape)
    }
  }, [])

  return (
    <S.Wrapper>
      <Title>Buscar Contatos</Title>
      <FormItem>
        <input
          placeholder="Buscar contatos"
          value={searchTerm}
          onChange={handleSearchInputChange}
          ref={inputRef}
        />
        {suggestions.length > 0 && (
          <S.Suggestions id="suggestions">
            {suggestions.map((suggestion) => (
              <S.Suggestion
                key={suggestion.name}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <a href={`tel:${onlyNumbers(suggestion.phone)}`}>
                  {suggestion.name}
                </a>
              </S.Suggestion>
            ))}
          </S.Suggestions>
        )}
      </FormItem>
    </S.Wrapper>
  )
}

export default Search

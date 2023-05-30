import { Meta, StoryFn } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import handlers from './mock'
import { setupServer } from 'msw/node'
import styled, { css } from 'styled-components'

const queryClient = new QueryClient()

import ContactList from '.'

const Background = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.tertiary};
    min-height: 100vh;
  `};
`

export default {
  title: 'ContactList',
  component: ContactList,
  args: {},
  argTypes: {},
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Background>
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </Background>
      </MemoryRouter>
    )
  ],
  parameters: {
    layout: 'fullscreen'
  }
} as Meta<typeof ContactList>

const Template: StoryFn = (args) => <ContactList {...args} />

export const Success = Template.bind({})
Success.parameters = {
  msw: [handlers.success]
}

export const Error = Template.bind({})
Error.parameters = {
  msw: [handlers.error]
}

export const Loading = Template.bind({})
Loading.parameters = {
  msw: [handlers.loading]
}

export const Empty = Template.bind({})
Empty.parameters = {
  msw: [handlers.empty]
}

import { Meta, StoryFn } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import styled, { css } from 'styled-components'

import Navigation from '.'

const Background = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.tertiary};
    height: 100vh;
    padding: 0;
    width: 100vw;
  `};
`

export default {
  title: 'Navigation',
  component: Navigation,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Background>
          <Story />
        </Background>
      </MemoryRouter>
    )
  ],
  parameters: {
    layout: 'fullscreen'
  }
} as Meta<typeof Navigation>

const Template: StoryFn<typeof Navigation> = () => <Navigation />

export const SimpleNavigation = Template.bind({})

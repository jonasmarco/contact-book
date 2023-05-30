import { Meta, StoryFn } from '@storybook/react'
import styled, { css } from 'styled-components'

import Text, { Props } from '.'

const Background = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.tertiary};
    padding: 0;
  `};
`

export default {
  title: 'Text',
  component: Text,
  args: {
    children: 'Lorem ipsum'
  },
  argTypes: {
    children: {
      type: 'string'
    },
    danger: {
      type: 'boolean',
      defaultValue: false
    }
  },
  decorators: [
    (Story) => (
      <Background>
        <Story />
      </Background>
    )
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' }
  }
} as Meta<typeof Text>

const Template: StoryFn<typeof Text> = (args: Props) => <Text {...args} />

export const NormalText = Template.bind({})
NormalText.args = {
  children: 'Lorem ipsum'
}

export const DangerText = Template.bind({})
DangerText.args = {
  children: "I'm dangerous baby!",
  danger: true
}

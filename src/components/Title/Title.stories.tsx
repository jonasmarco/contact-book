import { Meta, StoryFn } from '@storybook/react'

import Title, { Props } from '.'

export default {
  title: 'Title',
  component: Title,
  args: {
    children: 'Simple title'
  },
  argTypes: {
    children: {
      type: 'string'
    }
  }
} as Meta<typeof Title>

const Template: StoryFn<typeof Title> = (args: Props) => <Title {...args} />

export const SimpleTitle = Template.bind({})
SimpleTitle.args = {
  children: 'Simple title'
}

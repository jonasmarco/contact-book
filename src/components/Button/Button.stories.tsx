import { Meta, StoryFn } from '@storybook/react'

import { HeartFill, Peace } from '@styled-icons/bootstrap'

import Button, { Props } from '.'

export default {
  title: 'Button',
  component: Button,
  args: {
    children: 'Click me!',
    size: 'normal',
    category: 'primary'
  },
  argTypes: {
    children: {
      type: 'string'
    },
    size: {
      options: ['normal', 'large'],
      control: { type: 'radio' }
    },
    category: {
      options: ['primary', 'secondary', 'danger', 'success', 'warning'],
      control: { type: 'radio' }
    },
    fullWidth: {
      type: 'boolean',
      defaultValue: false
    },
    disabled: {
      type: 'boolean',
      defaultValue: false
    },
    otherSide: {
      type: 'boolean',
      defaultValue: false
    },
    as: {
      table: {
        disable: true
      }
    }
  }
} as Meta<typeof Button>

const Template: StoryFn<typeof Button> = (args: Props) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
  category: 'secondary'
}

export const Danger = Template.bind({})
Danger.args = {
  children: "I'm Danger",
  category: 'danger'
}

export const Success = Template.bind({})
Success.args = {
  children: 'Success for us',
  category: 'success'
}

export const Warning = Template.bind({})
Warning.args = {
  children: 'Pay attention',
  category: 'warning'
}

export const Large = Template.bind({})
Large.args = {
  children: "I'm a little bigger",
  size: 'large'
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  children: 'I"m a full width button and I"ll fill the entire screen',
  fullWidth: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'You can"t click on me',
  category: 'secondary',
  disabled: true
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  children: 'Love',
  icon: <HeartFill />
}

export const WithTheIconOnTheLeft = Template.bind({})
WithTheIconOnTheLeft.args = {
  children: 'Good vibes only',
  category: 'secondary',
  icon: <Peace />,
  otherSide: true
}

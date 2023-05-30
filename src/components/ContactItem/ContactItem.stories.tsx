import { Meta, StoryFn } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import styled, { css } from 'styled-components'

import ContactItem, { Props, DEFAULT_AVATAR_URL } from '.'

const Background = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.tertiary};
    height: 100vh;
    padding: 0;
    width: 100vw;
  `};
`

export default {
  title: 'ContactItem',
  component: ContactItem,
  args: {
    id: '1',
    name: 'John Doe',
    photo: DEFAULT_AVATAR_URL,
    phoneNumbers: [{ number: '11998765432' }],
    addressList: [
      {
        logradouro: 'Rua 1',
        numero: '1',
        bairro: 'Bairro 1',
        localidade: 'Localidade 1',
        uf: 'UF 1',
        cep: '11111-111'
      }
    ],
    handleDelete: () => console.log('Delete handler function')
  },
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    photo: { control: 'text' },
    phoneNumbers: { control: 'object' },
    addressList: { control: 'object' },
    handleDelete: { action: 'clicked' }
  },
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
} as Meta<typeof ContactItem>

const Template: StoryFn<Props> = (args) => <ContactItem {...args} />

export const Default = Template.bind({})
Default.args = {
  photo: 'https://i.pravatar.cc/150?u=joao.silva'
}

export const DefaultAvatar = Template.bind({})

export const MultiplePhones = Template.bind({})
MultiplePhones.args = {
  phoneNumbers: [{ number: '43998765432' }, { number: '44987654321' }]
}

export const MultipleAddresses = Template.bind({})
MultipleAddresses.args = {
  photo: 'https://i.pravatar.cc/150?u=lucas.souza',
  addressList: [
    {
      logradouro: 'Rua 100',
      numero: '100',
      bairro: 'Bairro 100',
      localidade: 'Localidade 100',
      uf: 'UF 100',
      cep: '10011-111'
    },
    {
      logradouro: 'Rua 200',
      numero: '200',
      bairro: 'Bairro 200',
      localidade: 'Localidade 200',
      uf: 'UF 200',
      cep: '20022-222'
    }
  ]
}

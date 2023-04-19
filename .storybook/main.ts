import type { StorybookViteConfig } from '@storybook/builder-vite'
const config: StorybookViteConfig = {
  stories: [
    // '../src/components/**/*.stories.mdx',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  core: {},
  features: {
    storyStoreV7: true
  },
  async viteFinal(config, options) {
    // Add your configuration here
    return config
  },
  docs: {
    autodocs: true
  }
}
export default config

import { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'

const customRender = (ui: ReactElement) =>
  render(
    <Router>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </Router>
  )

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

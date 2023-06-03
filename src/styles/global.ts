import { createGlobalStyle } from 'styled-components'
import { customMedia } from '@/components/MediaMatch'

const GlobalStyles = createGlobalStyle`
  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  html {
    font-size:62.5%;
  }
  html, body, #__next {
    height:100%;
  }
  body {
    color: #02020A;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  a {
    color: currentColor;
    text-decoration: none;
  }
  form {
    ${customMedia.greaterThan('tabletUp')`
      max-width: 500px;
    `}
  }
  .rodal-dialog {
    border-radius: 1rem;
    height: fit-content !important;
    max-width: 100%;
    padding: 30px 25px;
  }
  .skeletons {
    > span {
      margin-bottom: 20px;
    }
  }
`

export default GlobalStyles

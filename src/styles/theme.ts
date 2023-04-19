export default {
  grid: {
    container: '120rem',
    defaultPadding: '1rem',
    gutter: '1.5rem'
  },
  border: {
    radius: '1rem',
    rounded: '5rem'
  },
  fonts: {
    sizes: {
      small: '1.2rem',
      normal: '1.8rem',
      large: '2.2rem',
      extraLarge: '2.8rem',
      bigger: '4.2rem'
    },
    weights: {
      slim: 300,
      normal: 400,
      bold: 600,
      extraBold: 700
    }
  },
  colors: {
    black: '#02020A',
    white: '#FCFCFC',
    red: '#FF6565',
    blue: '#4FB6FF',
    darkBlue: '#273549',
    gray: '#596E7D',
    yellow: '#F5A623',
    green: '#33CC33',

    primary: '#4FB6FF',
    secondary: '#596E7D',
    tertiary: '#30425C'
  },
  layout: {
    mobile: {
      gap: '2rem'
    },
    tablet: {
      gap: '6rem'
    },
    notebook: {
      gap: '10rem'
    },
    gapForm: '1rem'
  },
  text: {
    letterSpacing: '0.135rem',
    lineHeight: '2.8rem'
  },
  margin: {
    normal: '1.8rem',
    textMargin: '1.2rem'
  },
  layers: {
    base: 0,
    behindMenu: 5,
    menu: 10,
    modal: 100
  }
} as const

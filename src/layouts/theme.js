import indigo from "@material-ui/core/colors/indigo"
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"

// A custom theme for this app
let theme = createMuiTheme({
  palette: {
    primary: indigo,
    // {
    //   main: "#3f51b5",
    // },
    secondary: {
      main: "#ffc400",
    },
    error: {
      main: "#ff1744",
    },
    background: {
      default: "#fff",
    },
    imageFilter: "#3f51b580",
  },
  typography: {
    useNextVariants: true,
    fontSize: 13,
  },
  spacing: 8,
  marginSpacing: 8,
  opacity: {
    imgWrapper: 0.85,
    img: 0.75,
  },
})

theme.margin = {
  middleElem: `${theme.marginSpacing}px`,
  edgeElem: `${theme.marginSpacing * 4}px`,
  listElem: `${theme.marginSpacing * 2}px`,
}

theme = responsiveFontSizes(theme)

export default theme

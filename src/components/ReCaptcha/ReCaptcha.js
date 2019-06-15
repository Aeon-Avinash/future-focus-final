import React from "react"
import ReCaptchaElem from "react-google-recaptcha"
import { useTheme } from "@material-ui/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"

const GOOGLE_RECAPTCHA_SITE_KEY =
  process.env.GOOGLE_RECAPTCHA_SITE_KEY ||
  process.env.GATSBY_GOOGLE_RECAPTCHA_SITE_KEY

const ReCaptcha = React.forwardRef(({ onChangeHandler }, ref) => {
  const theme = useTheme()
  const mdMediaMatch = useMediaQuery(theme.breakpoints.up("md"))
  return (
    <ReCaptchaElem
      ref={ref}
      sitekey={GOOGLE_RECAPTCHA_SITE_KEY}
      onChange={onChangeHandler}
      size={mdMediaMatch ? "normal" : "compact"}
    />
  )
})

export default ReCaptcha

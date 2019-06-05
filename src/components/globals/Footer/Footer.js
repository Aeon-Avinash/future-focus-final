import React from "react"
import { Typography, Grid, Paper, Link as MUILink } from "@material-ui/core"

import FooterSiteLinks from "../FooterItems/FooterSiteLinks"
import FooterSocialLinks from "../FooterItems/FooterSocialLinks"

const footerContentDivStyles = {
  display: "flex",
  justifyContent: "space-evenly",
  margin: "5px auto",
}

const Footer = () => {
  return (
    <Paper style={{ padding: "16px" }}>
      <Grid container alignItems="center">
        <Grid xs={12} md={9} item style={footerContentDivStyles}>
          <FooterSiteLinks />
        </Grid>
        <Grid xs={12} md={9} item style={footerContentDivStyles}>
          <FooterSocialLinks />
        </Grid>
        <Grid xs={12} md={9} item style={footerContentDivStyles}>
          <Typography
            variant="body2"
            gutterBottom
            style={{ textAlign: "center" }}
          >
            © {new Date().getFullYear()}
            {`, `}
            <MUILink
              href="https://futurefocushrservices.com"
              title="https://futurefocushrservices.com"
              target="_blank"
              rel="noopener"
            >
              FutureFocus
            </MUILink>
            {`, Built with`}
            {` `}
            <MUILink
              href="https://www.gatsbyjs.org"
              title="https://www.gatsbyjs.org"
              target="_blank"
              rel="noopener"
            >
              Gatsby
            </MUILink>
            {`, developed by`}
            {` `}
            <MUILink
              href="https://github.com/Aeon-Avinash"
              title="https://github.com/Aeon-Avinash"
              target="_blank"
              rel="noopener"
            >
              AeonDevWorks
            </MUILink>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

Footer.defaultProps = {
  siteTitle: `FutureFocus`,
}

export default Footer

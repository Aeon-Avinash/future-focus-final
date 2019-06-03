import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { Typography, Grid, Paper, Link as MUILink } from "@material-ui/core"

import FooterSiteLinks from "../FooterItems/FooterSiteLinks"
import FooterSocialLinks from "../FooterItems/FooterSocialLinks"

const styles = theme => ({
  footerPaper: {
    padding: 1 * theme.spacing(2),
    margin: "auto",
    height: "auto",
    [theme.breakpoints.up("md")]: {
      height: "auto",
      width: "66%",
    },
    [theme.breakpoints.down("md")]: {
      height: "auto",
      width: "100%",
    },
  },
  footerContentDiv: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: "5px auto",
  },
  outLinksDiv: {
    textAlign: "center",
  },
})

const Footer = ({ classes }) => {
  return (
    <Paper className={classes.footerPaper}>
      <Grid container alignItems="center">
        <Grid xs={12} md={9} item className={classes.footerContentDiv}>
          <FooterSiteLinks />
        </Grid>
        <Grid xs={12} md={9} item className={classes.footerContentDiv}>
          <FooterSocialLinks />
        </Grid>
        <Grid xs={12} md={9} item className={classes.footerContentDiv}>
          <Typography
            variant="body2"
            gutterBottom
            className={classes.outLinksDiv}
          >
            © {new Date().getFullYear()}
            {`, `}
            <MUILink
              href="https://future-focus-hr-services.netlify.com/"
              target="_blank"
              rel="noopener"
            >
              FutureFocus
            </MUILink>
            {`, Built with`}
            {` `}
            <MUILink
              href="https://www.gatsbyjs.org"
              target="_blank"
              rel="noopener"
            >
              Gatsby
            </MUILink>
            {`, developed by`}
            {` `}
            <MUILink
              href="https://github.com/Aeon-Avinash"
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

export default withStyles(styles)(Footer)

import React from "react"
// import { makeStyles } from "@material-ui/core/styles"
import { Typography, Grid, Paper, Link as MUILink } from "@material-ui/core"

import FooterSiteLinks from "../FooterItems/FooterSiteLinks"
import FooterSocialLinks from "../FooterItems/FooterSocialLinks"

// const useStyles = makeStyles(theme => ({
//   footerPaper: {
//     padding: 1 * theme.spacing(2),
//     margin: "auto",
//     height: "auto",
//     [theme.breakpoints.up("md")]: {
//       height: "auto",
//       width: "66%",
//     },
//     [theme.breakpoints.down("md")]: {
//       height: "auto",
//       width: "100%",
//     },
//   },
//   footerContentDiv: {
//     display: "flex",
//     justifyContent: "space-evenly",
//     margin: "5px auto",
//   },
//   outLinksDiv: {
//     textAlign: "center",
//   },
// }))

const footerContentDivStyles = {
  display: "flex",
  justifyContent: "space-evenly",
  margin: "5px auto",
}

const Footer = () => {
  // const classes = useStyles()
  return (
    <Paper style={{padding: "16px"}}>
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
            style={{ textAlign: "center"}}
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

export default Footer

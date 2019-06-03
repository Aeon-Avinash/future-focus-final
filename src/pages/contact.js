import React from "react"
import { graphql } from "gatsby"
import { withStyles } from "@material-ui/core/styles"
import { Typography, Paper, Grid, Container } from "@material-ui/core"

import SEO from "../components/seo"
import ContactForm from "../components/forms/ContactForm/ContactFormMUI"
import GoogleMap from "../components/GoogleMap/GoogleMap"

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  layout: {
    margin: `0 auto`,
    maxWidth: 960,
    padding: `0px 1.0875rem 1.45rem`,
    paddingTop: 0,
  },
  containerGrid: {
    "& > div": {
      margin: `${theme.margin.middleElem} auto`,
    },
    "& > div:first-child": {
      marginTop: `${theme.margin.edgeElem}`,
    },
    "& > div:last-child": {
      marginBottom: `${theme.margin.edgeElem}`,
    },
  },
  paper: {
    padding: 2 * theme.spacing(2),
  },
  paperContactGrid: {
    [theme.breakpoints.down("sm")]: {
      padding: `${2 * theme.spacing(2)}px ${1 * theme.spacing(2)}px`,
    },
    [theme.breakpoints.up("sm")]: {
      padding: 2 * theme.spacing(2),
    },
  },
  paperMapGrid: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
      padding: `${2 * theme.spacing(2)}px ${1 * theme.spacing(2)}px`,
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: 2 * theme.spacing(2),
    },
  },
  paperGoogleMap: {
    [theme.breakpoints.down("sm")]: {
      width: "76vw",
      height: "40vh",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "86vw",
      height: "40vh",
    },
    [theme.breakpoints.up("md")]: {
      width: "600px",
      height: "500px",
    },
  },
})

const ContactPage = ({ data, classes }) => {
  const { pageData } = data
  return (
    <>
      {pageData.pageName ? <SEO title={`${pageData.pageName} Page`} /> : null}
      <Container maxWidth={"lg"}>
        <Grid container spacing={2} className={classes.containerGrid}>
          <Grid xs={12} item>
            <Paper className={classes.paper}>
              {pageData.pageName ? (
                <Typography variant="overline" gutterBottom>
                  {pageData.pageName}
                </Typography>
              ) : null}
              {pageData.title ? (
                <Typography variant="h4" component="h2" gutterBottom>
                  {pageData.title}
                </Typography>
              ) : null}
            </Paper>
          </Grid>

          <Grid xs={12} item>
            {typeof window !== "undefined" ? <ContactForm /> : null}
          </Grid>

          <Grid xs={12} item>
            <Paper className={classes.paperContactGrid}>
              {pageData.blockquote1 ? (
                <Typography
                  variant="h5"
                  component="h2"
                  color="textSecondary"
                  gutterBottom
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: pageData.blockquote1.childMarkdownRemark.html,
                    }}
                  />
                </Typography>
              ) : null}
              {pageData.paragraph1 ? (
                <Typography
                  variant="h5"
                  component="h2"
                  color="textPrimary"
                  gutterBottom
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: pageData.paragraph1.childMarkdownRemark.html,
                    }}
                  />
                </Typography>
              ) : null}
            </Paper>
          </Grid>

          <Grid xs={12} item>
            <Paper className={classes.paperMapGrid}>
              {pageData.blockquote2 ? (
                <Typography
                  variant="h5"
                  component="h2"
                  color="textSecondary"
                  gutterBottom
                  style={{ marginBottom: "1rem" }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: pageData.blockquote2.childMarkdownRemark.html,
                    }}
                  />
                </Typography>
              ) : null}
              <Paper className={classes.paperGoogleMap}>
                {(typeof window !== "undefined") && pageData.paragraph1 ? (
                  <GoogleMap google={window.google} contactInfo={pageData.paragraph1.childMarkdownRemark.html}/>
                ) : null}
              </Paper>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default withStyles(styles)(ContactPage)

export const query = graphql`
  {
    pageData: contentfulTestSitePages(pageUrl: { eq: "/contact/" }) {
      pageUrl
      pageName
      title
      blockquote1 {
        childMarkdownRemark {
          html
        }
      }
      paragraph1 {
        childMarkdownRemark {
          html
        }
      }
      blockquote2 {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

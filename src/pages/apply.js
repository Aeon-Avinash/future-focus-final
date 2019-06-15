import React from "react"
import { graphql } from "gatsby"
import { withStyles } from "@material-ui/core/styles"
import { Typography, Paper, Grid, Container } from "@material-ui/core"

import SEO from "../components/seo"
// import ApplyForm from "../components/forms/ApplyForm/ApplyFormMUI"
import ApplyForm from "../components/forms/ApplyForm/ApplyFormUppy"

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
  paperContentItem: {
    padding: 2 * theme.spacing(2),
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("lg")]: {
      flexDirection: "row",
    },
  },
  paperContentImage: {
    [theme.breakpoints.up("md")]: {
      height: "100%",
      width: "40%",
    },
    [theme.breakpoints.down("md")]: {
      height: "auto",
      width: "100%",
    },
  },
  paperContentBody: {
    display: "flex",
    flexDirection: "column",
  },
  blockquoteTextStyle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.15rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.5rem",
    },
  },
  paragraphTextStyle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem",
      columnCount: 1,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.85rem",
      columnCount: 2,
      columnGap: "2rem",
      columnRule: `1px solid lightgrey`,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1rem",
      columnCount: 2,
      columnGap: "2rem",
      columnRule: `2px solid lightgrey`,
    },
  },
})

const ApplyPage = ({ data, classes }) => {
  const { pageData } = data
  return (
    <>
      {pageData.pageName ? <SEO title={`${pageData.pageName} Page`} /> : null}
      <Container maxWidth={"lg"} className={""}>
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
            {typeof window !== "undefined" ? <ApplyForm /> : null}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default withStyles(styles)(ApplyPage)

export const query = graphql`
  {
    pageData: contentfulSitePages(pageUrl: { eq: "/apply/" }) {
      pageUrl
      pageName
      title
    }
  }
`

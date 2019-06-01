import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { withStyles } from "@material-ui/core/styles"
import { Typography, Paper, Grid, Container } from "@material-ui/core"

// import Img from "../components/globals/MyImg/MyImg"
import SEO from "../components/seo"

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
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  paperContentImage: {
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      height: "auto",
      width: "60%",
    },
    [theme.breakpoints.up("md")]: {
      height: "100%",
      width: "auto",
      minWidth: "40%",
    },
  },
  paperContentBody: {
    display: "flex",
    flexDirection: "column",
  },
})

const ProcessPage = ({ data, classes }) => {
  const { pageData } = data
  const processes = data.getProcesses.edges

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

          <Grid xs={12} item style={{ margin: "20px auto" }}>
            {processes.map(({ node: process }) => (
              <Paper key={process.id} className={classes.paperContentItem}>
                {process.image ? (
                  <div className={classes.paperContentImage}>
                    <Img
                      fluid={process.image.fluid}
                      alt={process.image.title}
                    />
                  </div>
                ) : null}
                <div className={classes.paperContentBody}>
                  {process.title ? (
                    <Typography
                      variant="h4"
                      component="h2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {process.title}
                    </Typography>
                  ) : null}
                  {process.content ? (
                    <Typography
                      variant="body1"
                      component="h2"
                      gutterBottom
                      style={{ maxWidth: "36em", width: "100%" }}
                      dangerouslySetInnerHTML={{
                        __html: process.content.childMarkdownRemark.html,
                      }}
                    />
                  ) : null}
                </div>
              </Paper>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export const query = graphql`
  {
    pageData: contentfulTestSitePages(pageUrl: { eq: "/our-process/" }) {
      pageUrl
      pageName
      title
    }
    getProcesses: allContentfulTestContent(
      filter: { category: { eq: "process" } }
      sort: { fields: sortOrder, order: ASC }
    ) {
      totalCount
      edges {
        node {
          id
          title
          sortOrder
          category
          content {
            content
            childMarkdownRemark {
              html
              excerpt(pruneLength: 200)
            }
          }
          image {
            title
            fixed(width: 200) {
              ...GatsbyContentfulFixed
            }
            fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`

export default withStyles(styles)(ProcessPage)

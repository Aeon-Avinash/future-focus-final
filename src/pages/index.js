import React from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import { withStyles } from "@material-ui/core/styles"
import { Typography, Paper, Grid, Container } from "@material-ui/core"

import SEO from "../components/seo"

import ContentContext from "../components/contexts/ContentContext/ContentContext"
import ContentList from "../components/home/ContentList/ContentList"

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
  heroContent: {
    width: "100%",
    margin: "0 auto",
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
  itemGrid: {
    // margin: "20px auto",
  },
  paper: {
    padding: 2 * theme.spacing(2),
  },
  paragraphTextStyle: {
    [theme.breakpoints.down("sm")]: {
      columnCount: 1,
    },
    [theme.breakpoints.up("sm")]: {
      columnCount: 2,
      columnGap: "2rem",
      columnRule: `1px solid lightgrey`,
    },
    [theme.breakpoints.up("lg")]: {
      columnCount: 2,
      columnGap: "2rem",
      columnRule: `1px solid lightgrey`,
    },
  },
  heroImage: {
    [theme.breakpoints.down("md")]: {
      minHeight: "60vh",
    },
    [theme.breakpoints.up("md")]: {
      minHeight: "100vh",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: "1 !important",
    background: theme.palette.imageFilter,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    textAlign: "center",
    color: "white",
  },
})

const HomePage = ({ data, classes }) => {
  const pageData = data.pageData
  const processes = data.getProcesses.edges
  const services = data.getServices.edges
  const industries = data.getIndustries.edges

  return (
    <ContentContext.Consumer>
      {context => (
        <>
          {pageData.pageName ? (
            <SEO title={`${pageData.pageName} Page`} />
          ) : null}
          <div className={classes.root}>
            {pageData.heroImage ? (
              <div className={classes.heroContent}>
                <BackgroundImage
                  fluid={pageData.heroImage.fluid}
                  alt={pageData.title}
                  className={classes.heroImage}
                >
                  {pageData.title ? (
                    <Typography variant="h2" component="h2">
                      {pageData.title}
                    </Typography>
                  ) : null}
                </BackgroundImage>
              </div>
            ) : pageData.title ? (
              <Typography variant="h2" component="h2">
                {pageData.title}
              </Typography>
            ) : null}

            <Container maxWidth={"lg"} className={""}>
              <Grid container spacing={2} className={classes.containerGrid}>
                {pageData.blockquote1 ? (
                  <Grid xs={12} md={9} item className={classes.itemGrid}>
                    <Paper className={classes.paper}>
                      <Typography
                        variant="h5"
                        component="h2"
                        className={classes.blockquoteTextStyle}
                      >
                        <blockquote
                          dangerouslySetInnerHTML={{
                            __html:
                              pageData.blockquote1.childMarkdownRemark.html,
                          }}
                        />
                      </Typography>
                    </Paper>
                  </Grid>
                ) : null}
                {pageData.paragraph2 ? (
                  <Grid xs={12} item className={classes.itemGrid}>
                    <Paper className={classes.paper}>
                      <Typography variant="body1" component="h2">
                        <div
                          className={classes.paragraphTextStyle}
                          dangerouslySetInnerHTML={{
                            __html:
                              pageData.paragraph2.childMarkdownRemark.html,
                          }}
                        />
                      </Typography>
                    </Paper>
                  </Grid>
                ) : null}
                {processes && pageData.section1 ? (
                  <Grid xs={12} item className={classes.itemGrid}>
                    <ContentList
                      contentList={processes}
                      setContext={null}
                      linkTo={"/our-process/"}
                      contentHeader={pageData.section1.childMarkdownRemark.html}
                    />
                  </Grid>
                ) : null}
                {pageData.paragraph1 ? (
                  <Grid xs={12} item className={classes.itemGrid}>
                    <Paper className={classes.paper}>
                      <Typography variant="body1" component="h2">
                        <div
                          className={classes.paragraphTextStyle}
                          dangerouslySetInnerHTML={{
                            __html:
                              pageData.paragraph1.childMarkdownRemark.html,
                          }}
                        />
                      </Typography>
                    </Paper>
                  </Grid>
                ) : null}
                {services && pageData.section2 ? (
                  <Grid xs={12} item className={classes.itemGrid}>
                    <ContentList
                      contentList={services}
                      setContext={context.selectService}
                      linkTo={"/services/"}
                      contentHeader={pageData.section2.childMarkdownRemark.html}
                    />
                  </Grid>
                ) : null}
                {industries && pageData.section3 ? (
                  <Grid xs={12} item className={classes.itemGrid}>
                    <ContentList
                      contentList={industries}
                      setContext={context.selectIndustry}
                      linkTo={"/industries/"}
                      contentHeader={pageData.section3.childMarkdownRemark.html}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </Container>
          </div>
        </>
      )}
    </ContentContext.Consumer>
  )
}

export const query = graphql`
  {
    pageData: contentfulTestSitePages(pageUrl: { eq: "/" }) {
      pageName
      title
      heroImage {
        title
        fluid {
          ...GatsbyContentfulFluid
        }
      }
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
      paragraph2 {
        childMarkdownRemark {
          html
        }
      }
      section1 {
        childMarkdownRemark {
          html
        }
      }
      section2 {
        childMarkdownRemark {
          html
        }
      }
      section3 {
        childMarkdownRemark {
          html
        }
      }
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
          category
          image {
            title
            fluid(maxWidth: 500, maxHeight: 300) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
    getServices: allContentfulTestContent(
      filter: { category: { eq: "services" } }
      sort: { fields: createdAt, order: ASC }
    ) {
      totalCount
      edges {
        node {
          id
          title
          category
          content {
            content
            childMarkdownRemark {
              html
              excerpt(pruneLength: 150)
            }
          }
          image {
            title
            fluid(maxWidth: 500, maxHeight: 300) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
    getIndustries: allContentfulTestContent(
      filter: { category: { eq: "industries" } }
      sort: { fields: createdAt, order: ASC }
    ) {
      totalCount
      edges {
        node {
          id
          title
          category
          content {
            content
            childMarkdownRemark {
              html
              excerpt(pruneLength: 150)
            }
          }
          image {
            title
            fluid(maxWidth: 500, maxHeight: 300) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`

export default withStyles(styles)(HomePage)

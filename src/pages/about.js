import React from "react"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import { withStyles } from "@material-ui/core/styles"
import { Typography, Paper, Grid, Container } from "@material-ui/core"

import Img from "../components/globals/MyImg/MyImg"
import Link from "../components/globals/MyLink/MyLink"
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
  paperContentCard: {
    padding: 2 * theme.spacing(2),
    display: "flex",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-start",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
    },
  },
  paperContentImage: {
    [theme.breakpoints.up("md")]: {
      height: "100%",
      minWidth: "40%",
    },
    [theme.breakpoints.down("md")]: {
      height: "auto",
      width: "100%",
    },
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
      columnRule: `2px solid lightgrey`,
    },
  },
  heroImage: {
    [theme.breakpoints.down("md")]: {
      minHeight: "60vh",
    },
    [theme.breakpoints.up("md")]: {
      minHeight: "80vh",
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

const AboutPage = ({ data, classes }) => {
  const pageData = data.pageData

  const getSections = data => {
    let sectionArr = []
    for (let key in data) {
      if (key.includes("section")) {
        sectionArr.push(data[key])
      }
    }
    return sectionArr.map(section => (
      <Grid xs={12} item key={section.id} className={classes.itemGrid}>
        <Paper className={classes.paperContentCard}>
          <div className={classes.paperContentBody}>
            <Typography variant="body1" component="h2">
              <Link to={section.childMarkdownRemark.excerpt}>
                <div
                  className={classes.blockquoteTextStyle}
                  dangerouslySetInnerHTML={{
                    __html: section.childMarkdownRemark.html,
                  }}
                />
              </Link>
            </Typography>
          </div>
          <div className={classes.paperContentImage}>
            <Link to={section.childMarkdownRemark.excerpt}>
              <Img
                fluid={
                  data.pageImages.filter(
                    img => img.title === section.childMarkdownRemark.excerpt
                  )[0].fluid
                }
                alt={
                  data.pageImages.filter(
                    img => img.title === section.childMarkdownRemark.excerpt
                  )[0].title
                }
              />
            </Link>
          </div>
        </Paper>
      </Grid>
    ))
  }

  return (
    <>
      {pageData.pageName ? <SEO title={`${pageData.pageName} Page`} /> : null}
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

        <Container maxWidth={"lg"}>
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
                        __html: pageData.blockquote1.childMarkdownRemark.html,
                      }}
                    />
                  </Typography>
                </Paper>
              </Grid>
            ) : null}
            {pageData.paragraph1 ? (
              <Grid xs={12} item className={classes.itemGrid}>
                <Paper className={classes.paper}>
                  <Typography variant="body1" component="h2">
                    <div
                      className={classes.paragraphTextStyle}
                      dangerouslySetInnerHTML={{
                        __html: pageData.paragraph1.childMarkdownRemark.html,
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
                        __html: pageData.paragraph2.childMarkdownRemark.html,
                      }}
                    />
                  </Typography>
                </Paper>
              </Grid>
            ) : null}

            {getSections(pageData)}
          </Grid>
        </Container>
      </div>
    </>
  )
}

export const query = graphql`
  {
    pageData: contentfulTestSitePages(pageUrl: { eq: "/about/" }) {
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
      paragraph2 {
        childMarkdownRemark {
          html
        }
      }
      section1 {
        id
        childMarkdownRemark {
          excerpt
          html
        }
      }
      section2 {
        id
        childMarkdownRemark {
          excerpt
          html
        }
      }
      section3 {
        id
        childMarkdownRemark {
          excerpt
          html
        }
      }
      heroImage {
        title
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      pageImages {
        title
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`

export default withStyles(styles)(AboutPage)

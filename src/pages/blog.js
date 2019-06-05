import React from "react"
import { graphql } from "gatsby"
import slugify from "slugify"
import { withStyles } from "@material-ui/core/styles"
import { Typography, Paper, Grid, Container } from "@material-ui/core"

import Img from "../components/globals/MyImg/MyImg"
import SEO from "../components/seo"
import Link from "../components/globals/MyLink/MyLink"

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
    "& > h2": {
      [theme.breakpoints.up("md")]: {
        margin: `${theme.margin.middleElem} ${theme.margin.edgeElem}`,
      },
      [theme.breakpoints.down("md")]: {
        margin: `${theme.margin.middleElem}`,
      },
    },
  },
  contentLink: {
    // textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "20%",
    },
  },
})

const BlogPage = ({ data, classes }) => {
  const posts = data.getPosts.edges
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
            {posts.map(({ node: post }) => (
              <Paper key={post.id} className={classes.paperContentItem}>
                {post.image ? (
                  <div xs={12} md={4} className={classes.paperContentImage}>
                    <Img fixed={post.image.fixed} alt={post.image.title} />
                  </div>
                ) : null}
                <div xs={12} md={8} className={classes.paperContentBody}>
                  {post.title ? (
                    <Typography variant="h5" component="h2" gutterBottom>
                      {post.title}
                    </Typography>
                  ) : null}
                  {post.content ? (
                    <>
                      <Typography
                        variant="body1"
                        component="h2"
                        color="textSecondary"
                        gutterBottom
                        dangerouslySetInnerHTML={{
                          __html: post.content.childMarkdownRemark.excerpt,
                        }}
                      />

                      <div className={classes.contentLink}>
                        <Link
                          to={`/blog/${slugify(post.title, {
                            replacement: "-",
                            lower: true,
                          })}`}
                          variant={"button"}
                        >
                          read more
                        </Link>
                      </div>
                    </>
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
    pageData: contentfulTestSitePages(pageUrl: { eq: "/blog/" }) {
      pageUrl
      pageName
      title
    }
    getPosts: allContentfulTestBlogPage(
      sort: { fields: createdAt, order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          title
          author
          date(formatString: "YYYY MMMM DD")
          image {
            title
            fixed(width: 200) {
              ...GatsbyContentfulFixed_withWebp
            }
          }
          content {
            childMarkdownRemark {
              excerpt(pruneLength: 300)
            }
          }
        }
      }
    }
  }
`

export default withStyles(styles)(BlogPage)

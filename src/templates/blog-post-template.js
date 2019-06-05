import React from "react"
import { graphql } from "gatsby"
import slugify from "slugify"
import { withStyles } from "@material-ui/core/styles"
import { Typography, Paper, Grid, Container } from "@material-ui/core"

import SEO from "../components/seo"
import Link from "../components/globals/MyLink/MyLink"
import Img from "../components/globals/MyImg/MyImg"

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
    justifyContent: "space-around",
    alignItems: "flex-start",
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
    margin: "5% auto",
    height: "auto",
    width: "100%",
  },
  paperContentBody: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  paperContentMenu: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  menuPaper: {
    padding: 2 * theme.spacing(2),
  },
  menuPaperItem: {
    margin: "10% auto",
  },
  svgTraceStyles: {
    opacity: "1",
    background: "#3f51b580",
  },
  imageStyles: {
    opacity: "0.75",
    background: "#3f51b580",
  },
  paperBlogSignature: {
    padding: 2 * theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
})

const BlogTemplate = ({ data, classes }) => {
  const post = data.contentfulTestBlogPage
  const allPosts = data.getPosts.edges.filter(
    ({ node: item }) => item.id !== post.id
  )

  return (
    <>
      {post.title ? <SEO title={`${post.title} Page`} article /> : null}
      <Container maxWidth={"lg"} className={""}>
        <Grid container spacing={2} className={classes.containerGrid}>
          <Grid xs={12} item>
            <Paper className={classes.paper}>
              {post.title ? (
                <Typography variant="h2" component="h2" gutterBottom>
                  {post.title}
                </Typography>
              ) : null}
              {post.author ? (
                <Typography
                  variant="caption"
                  color="textSecondary"
                  gutterBottom
                >
                  {post.author}
                </Typography>
              ) : null}
            </Paper>
          </Grid>

          <Grid xs={12} item>
            <Paper className={classes.paper}>
              {post.image ? (
                <Grid item xs={12} className={classes.paperContentImage}>
                  <Img fluid={post.image.fluid} alt={post.title} />
                </Grid>
              ) : null}
              <Grid container className={classes.paperContentItem}>
                {post.content ? (
                  <Grid
                    item
                    xs={12}
                    lg={7}
                    className={classes.paperContentBody}
                  >
                    <Typography
                      variant="body1"
                      component="h2"
                      gutterBottom
                      style={{ maxWidth: "36em", width: "100%" }}
                      dangerouslySetInnerHTML={{
                        __html: post.content.childMarkdownRemark.html,
                      }}
                    />
                  </Grid>
                ) : null}
                <Grid xs={12} lg={4} item className={classes.paperContentMenu}>
                  <Paper className={classes.menuPaper}>
                    <div>
                      <Typography variant="h6" component="h2" gutterBottom>
                        Related new posts
                      </Typography>
                    </div>
                    {allPosts.map(({ node: post }) => (
                      <div key={post.id} className={classes.menuPaperItem}>
                        {post.image ? (
                          <div className={classes.menuPaperImage}>
                            <Img
                              fixed={post.image.fixed}
                              alt={post.image.title}
                            />
                          </div>
                        ) : null}
                        {post.title ? (
                          <div className={classes.menuPaperBody}>
                            <Typography
                              variant="h6"
                              component="h2"
                              gutterBottom
                            >
                              {post.title}
                            </Typography>

                            <Link
                              to={`/blog/${slugify(post.title, {
                                replacement: "-",
                                lower: true,
                              })}`}
                              variant={"button"}
                            >
                              Read more
                            </Link>
                          </div>
                        ) : null}
                      </div>
                    ))}
                    <div>
                      <Link to={`/blog/`} variant={"button"}>
                        Back to Blog Index
                      </Link>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid xs={12} item>
            <Paper className={classes.paperBlogSignature}>
              {post.aboutAuthor && post.author ? (
                <Typography
                  variant="body2"
                  component="h2"
                  style={{ maxWidth: "48em", width: "100%" }}
                  gutterBottom
                >
                  <p style={{ marginBottom: "0.5rem" }}>About the author:</p>
                  <p
                    style={{ marginBottom: "0.5rem" }}
                    dangerouslySetInnerHTML={{
                      __html: post.aboutAuthor.childMarkdownRemark.html,
                    }}
                  />
                  <p style={{ textAlign: "left" }}>{post.author}</p>
                </Typography>
              ) : null}

              {post.blogSignature ? (
                <Typography
                  variant="body2"
                  component="h2"
                  style={{ maxWidth: "48em", width: "100%" }}
                  dangerouslySetInnerHTML={{
                    __html: post.blogSignature.childMarkdownRemark.html,
                  }}
                />
              ) : null}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostById($id: String!) {
    contentfulTestBlogPage(id: { eq: $id }) {
      internal {
        type
      }
      id
      title
      author
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      content {
        childMarkdownRemark {
          excerpt
          html
        }
      }
      aboutAuthor {
        childMarkdownRemark {
          html
        }
      }
      blogSignature {
        childMarkdownRemark {
          html
        }
      }
    }
    getPosts: allContentfulTestBlogPage(
      sort: { fields: createdAt, order: DESC }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          title
          image {
            title
            fixed(width: 200) {
              ...GatsbyContentfulFixed
            }
          }
        }
      }
    }
  }
`

export default withStyles(styles)(BlogTemplate)

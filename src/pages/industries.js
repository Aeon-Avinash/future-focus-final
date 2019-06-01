import React, { Component } from "react"
import { graphql } from "gatsby"
import { withStyles } from "@material-ui/core/styles"
import { Typography, Paper, Grid, Container, Button } from "@material-ui/core"

import Img from "../components/globals/MyImg/MyImg"
import SEO from "../components/seo"
import ContentContext from "../components/contexts/ContentContext/ContentContext"

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
  paperMainBody: {
    margin: "5% auto",
  },
  paperContentItem: {
    padding: 2 * theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  paperContentImage: {
    height: "auto",
    width: "100%",
  },
  paperContentBody: {
    display: "flex",
    flexDirection: "column",
  },
})

const getSelectedIndustry = (industries, id) => {
  if (industries.length === 0 || !id) {
    return undefined
  }
  const selection = industries.filter(
    ({ node: industry }) => industry.id === id
  )[0].node
  return selection
}

class IndustriesPage extends Component {
  static contextType = ContentContext

  state = {
    selectedIndustry:
      this.props.data.getIndustries.edges.length > 0
        ? this.props.data.getIndustries.edges[0].node.id
        : null,
  }

  targetRef = React.createRef()

  componentDidMount() {
    if (this.context.industrySelected) {
      this.setState({
        selectedIndustry: this.context.industrySelected,
      })
    }
  }

  scrollToTargetRef = () => {
    if (window) {
      window.scrollTo({
        behavior: "smooth",
        top: this.targetRef.current.offsetTop,
      })
    }
  }

  selectIndustry = id => {
    this.setState(
      {
        selectedIndustry: id,
      },
      () => {
        this.scrollToTargetRef()
      }
    )
  }

  render() {
    const { classes } = this.props
    const { pageData } = this.props.data
    const industries = this.props.data.getIndustries.edges
    const selectedIndustry = getSelectedIndustry(
      industries,
      this.state.selectedIndustry
    )

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

            <Grid xs={12} md={8} item>
              {selectedIndustry ? (
                <Paper className={classes.paper} ref={this.targetRef}>
                  {selectedIndustry.imageAlt ? (
                    <div className={classes.paperMainImage}>
                      <Img
                        fluid={selectedIndustry.imageAlt.fluid}
                        alt={selectedIndustry.imageAlt.title}
                      />
                    </div>
                  ) : null}
                  <div className={classes.paperMainBody}>
                    {selectedIndustry.title ? (
                      <Typography variant="h4" component="h2" gutterBottom>
                        {selectedIndustry.title}
                      </Typography>
                    ) : null}
                    {selectedIndustry.content ? (
                      <Typography
                        variant="body1"
                        component="h2"
                        gutterBottom
                        style={{ maxWidth: "36em", width: "100%" }}
                        dangerouslySetInnerHTML={{
                          __html:
                            selectedIndustry.content.childMarkdownRemark.html,
                        }}
                      />
                    ) : null}
                  </div>
                </Paper>
              ) : null}
            </Grid>

            <Grid xs={12} md={4} item>
              {industries.map(({ node: industry }) => (
                <Paper className={classes.paperContentItem} key={industry.id}>
                  {industry.image ? (
                    <div className={classes.paperContentImage}>
                      <Img
                        fluid={industry.image.fluid}
                        alt={industry.image.title}
                      />
                    </div>
                  ) : null}
                  <div className={classes.paperContentBody}>
                    <Button
                      variant="text"
                      onClick={() => {
                        this.selectIndustry(industry.id)
                      }}
                    >
                      {industry.title ? (
                        <Typography
                          variant="h6"
                          component="h6"
                          gutterBottom
                          style={{ textTransform: "capitalize" }}
                        >
                          {industry.title}
                        </Typography>
                      ) : null}
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => {
                        this.selectIndustry(industry.id)
                      }}
                    >
                      Read more
                    </Button>
                  </div>
                </Paper>
              ))}
            </Grid>
          </Grid>
        </Container>
      </>
    )
  }
}

export const query = graphql`
  {
    pageData: contentfulTestSitePages(pageUrl: { eq: "/industries/" }) {
      pageUrl
      pageName
      title
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
          imageAlt {
            title
            fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`

export default withStyles(styles)(IndustriesPage)

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

const getSelectedService = (services, id) => {
  if (services.length === 0 || !id) {
    return undefined
  }
  const selection = services.filter(({ node: service }) => service.id === id)[0]
    .node
  return selection
}

class ServicesPage extends Component {
  static contextType = ContentContext

  state = {
    selectedService:
      this.props.data.getServices.edges.length > 0
        ? this.props.data.getServices.edges[0].node.id
        : null,
  }

  targetRef = React.createRef()

  componentDidMount() {
    if (this.context.serviceSelected) {
      this.setState({
        selectedService: this.context.serviceSelected,
      })
    }
  }

  scrollToTargetRef = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        behavior: "smooth",
        top: this.targetRef.current.offsetTop,
      })
    }
  }

  selectService = id => {
    this.setState(
      {
        selectedService: id,
      },
      () => {
        this.scrollToTargetRef()
      }
    )
  }

  render() {
    const { classes } = this.props
    const services = this.props.data.getServices.edges
    const { pageData } = this.props.data
    const selectedService = getSelectedService(
      services,
      this.state.selectedService
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
              {selectedService ? (
                <Paper className={classes.paper} ref={this.targetRef}>
                  {selectedService.imageAlt ? (
                    <div className={classes.paperMainImage}>
                      <Img
                        fluid={selectedService.imageAlt.fluid}
                        alt={selectedService.imageAlt.title}
                      />
                    </div>
                  ) : null}
                  <div className={classes.paperMainBody}>
                    {selectedService.title ? (
                      <Typography variant="h4" component="h2" gutterBottom>
                        {selectedService.title}
                      </Typography>
                    ) : null}
                    {selectedService.content ? (
                      <Typography
                        variant="body1"
                        component="h2"
                        gutterBottom
                        style={{ maxWidth: "36em", width: "100%" }}
                        dangerouslySetInnerHTML={{
                          __html:
                            selectedService.content.childMarkdownRemark.html,
                        }}
                      />
                    ) : null}
                  </div>
                </Paper>
              ) : null}
            </Grid>

            <Grid xs={12} md={4} item>
              {services.map(({ node: service }) => (
                <Paper className={classes.paperContentItem} key={service.id}>
                  {service.image ? (
                    <div className={classes.paperContentImage}>
                      <Img
                        fluid={service.image.fluid}
                        alt={service.image.title}
                      />
                    </div>
                  ) : null}
                  <div className={classes.paperContentBody}>
                    <Button
                      variant="text"
                      onClick={() => {
                        this.selectService(service.id)
                      }}
                    >
                      {service.title ? (
                        <Typography
                          variant="h6"
                          component="h6"
                          gutterBottom
                          style={{ textTransform: "capitalize" }}
                        >
                          {service.title}
                        </Typography>
                      ) : null}
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => {
                        this.selectService(service.id)
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
    pageData: contentfulTestSitePages(pageUrl: { eq: "/services/" }) {
      pageUrl
      pageName
      title
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

export default withStyles(styles)(ServicesPage)

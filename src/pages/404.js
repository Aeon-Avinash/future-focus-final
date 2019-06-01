import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { Typography, Paper, Grid, Container } from "@material-ui/core"

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
})

const NotFoundPage = ({ classes }) => (
  <>
    <SEO title="404: Not found" />

    <Container maxWidth={"lg"} className={""}>
      <Grid container spacing={2} className={classes.containerGrid}>
        <Grid xs={12} item>
          <Paper className={classes.paper}>
            <Typography variant="overline" gutterBottom>
              404 Error
            </Typography>
            <Typography variant="h2" component="h2" gutterBottom>
              Not Found
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              You just hit a route that doesn&#39;t exist... the sadness.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </>
)

export default withStyles(styles)(NotFoundPage)

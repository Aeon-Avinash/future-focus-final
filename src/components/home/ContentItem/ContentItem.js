import React from "react"
import clsx from "clsx"
import { withStyles } from "@material-ui/core/styles"
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core"

import Img from "../../globals/MyImg/MyImg"
import Link from "../../globals/MyLink/MyLink"

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  headingTextStyle: {
    marginBottom: 1 * theme.spacing(2),
  },
  cardImage: {
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: "auto",
      flex: 0,
    },
    [theme.breakpoints.up("sm")]: {
      height: "100%",
      width: "auto",
      minWidth: "40%",
      flex: 0,
    },
    [theme.breakpoints.up("lg")]: {
      height: "auto",
      flex: 1,
    },
  },
  cardItemAll: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      height: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      flexDirection: "column",
      height: "500px",
    },
  },
  cardItemProcess: {
    [theme.breakpoints.up("lg")]: {
      flexDirection: "column",
      height: "400px",
    },
  },
})

const ContentItem = ({ item, linkTo, handleClick, classes }) => {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Card
        className={clsx(
          classes.cardItemAll,
          item.category === "process" ? classes.cardItemProcess : null
        )}
      >
        {item.image ? (
          <div className={classes.cardImage}>
            <Img fluid={item.image.fluid} alt={item.image.title} />
          </div>
        ) : null}
        <CardContent className={classes.cardContent}>
          {item.title ? (
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              className={classes.headingTextStyle}
            >
              {item.title}
            </Typography>
          ) : null}
          {item.content ? (
            <Typography
              variant="body2"
              component="h2"
              color="textSecondary"
              style={{ maxWidth: "30em", width: "100%" }}
              gutterBottom
            >
              {item.content.childMarkdownRemark.excerpt}
            </Typography>
          ) : null}
          <CardActions>
            <Link
              to={linkTo}
              variant="button"
              onClick={handleClick.bind(this, item.id)}
            >
              Read more
            </Link>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default withStyles(styles)(ContentItem)

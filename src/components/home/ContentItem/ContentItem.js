import React from "react"
import { withStyles, useTheme } from "@material-ui/core/styles"
import {
  Typography,
  Button,
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
})

const cardStyles = props => {
  const theme = useTheme()
  return {
    cardItem: {
      display: "flex",
      // for testing passing of variable props:
      // backgroundColor: props => {
      //   return props.category === "process" ? "salmon" : "white"
      // },
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
        height: props => (props.category === "process" ? "400px" : "500px"),
      },
    },
  }
}

const MyCardRaw = props => {
  const { classes, category, ...others } = props
  return <Card className={classes.cardItem} {...others} />
}

const MyCard = withStyles(cardStyles)(MyCardRaw)

const ContentItem = ({ item, linkTo, handleClick, classes }) => {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <MyCard category={item.category}>
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
            <Button variant="text" onClick={handleClick.bind(this, item.id)}>
              <Link to={linkTo}>Read more</Link>
            </Button>
          </CardActions>
        </CardContent>
      </MyCard>
    </Grid>
  )
}

export default withStyles(styles)(ContentItem)

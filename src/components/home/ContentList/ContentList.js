import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { Typography, Grid, Paper } from "@material-ui/core"

import ContentItem from "../ContentItem/ContentItem"

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      padding: 1 * theme.spacing(2),
    },
    [theme.breakpoints.up("lg")]: {
      padding: 2 * theme.spacing(2),
    },
    margin: "0 auto",
  },
})

const ContentList = ({
  contentList,
  setContext,
  linkTo,
  contentHeader,
  classes,
}) => {
  const handleContextualClick = contentItemId => {
    if (setContext !== null) {
      setContext(contentItemId)
    }
  }

  return (
    <Paper className={classes.paper}>
      <Typography
        variant="h5"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        <div dangerouslySetInnerHTML={{ __html: contentHeader }} />
      </Typography>
      <Grid container spacing={2} justify="space-evenly" alignItems="center">
        {contentList.map(({ node: contentItem }) => (
          <ContentItem
            key={contentItem.id}
            item={contentItem}
            linkTo={linkTo}
            handleClick={handleContextualClick}
          />
        ))}
      </Grid>
    </Paper>
  )
}

export default withStyles(styles)(ContentList)

import React from "react"
import { withStyles, useTheme } from "@material-ui/core/styles"
import { Typography, AppBar, Toolbar, IconButton } from "@material-ui/core"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import FFLogo from "../../../images/ff-icon.svg"
import MenuIcon from "@material-ui/icons/Menu"

import Link from "../MyLink/MyLink"
import NavItems from "../NavItems/NavItems"
import MenuContext from "../../contexts/MenuContext/MenuContext"

const styles = theme => ({
  appBar: {
    position: "relative",
  },
  toolbarHome: {
    flex: 1,
    display: "flex",
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  toolbar: {
    "& > a": {
      margin: theme.spacing(1, 1.5),
    },
    "& > a:last-child": {
      marginRight: theme.spacing(1),
      border: "1px groove #3f51b5",
      borderRadius: "5%",
      padding: "0.5rem 0.75rem",
    },
  },
  toolbarLogo: {
    padding: 0,
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: theme.spacing(8),
    height: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginLeft: theme.spacing(1),
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(2),
    },
  },
  toolbarTitle: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
  },
})

const Header = ({ classes }) => {
  const theme = useTheme()
  const lgMediaMatch = useMediaQuery(theme.breakpoints.up("lg"))

  return (
    <MenuContext.Consumer>
      {({ setMenu }) => {
        return (
          <header>
            <AppBar
              position="static"
              color="default"
              className={classes.appBar}
            >
              <Toolbar className={classes.toolbar}>
                <div className={classes.toolbarHome}>
                  <Link to="/">
                    <img
                      src={FFLogo}
                      alt="logo"
                      className={classes.toolbarLogo}
                    />
                  </Link>
                  {lgMediaMatch ? (
                    <Typography
                      variation="h6"
                      color="secondary"
                      className={classes.toolbarTitle}
                    >
                      <Link to="/" variant={"button"}>
                        Future Focus
                      </Link>
                    </Typography>
                  ) : null}
                </div>
                {lgMediaMatch ? (
                  <NavItems />
                ) : (
                  <IconButton
                    edge="end"
                    className={classes.menuButton}
                    color="primary"
                    aria-label="Menu"
                    title="Menu"
                    onClick={setMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
              </Toolbar>
            </AppBar>
          </header>
        )
      }}
    </MenuContext.Consumer>
  )
}

Header.defaultProps = {
  siteTitle: `FutureFocus`,
}

export default withStyles(styles)(Header)

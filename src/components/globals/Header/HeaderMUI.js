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
  toolbarTitle: {
    flex: 1,
    display: "flex",
  },
  menuButton: {
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
              <Toolbar>
                <div className={classes.toolbarTitle}>
                  <IconButton
                    edge="end"
                    className={classes.logoButton}
                    color="inherit"
                    aria-label="Menu"
                    size="small"
                    style={{ padding: "0px", marginTop: "0px" }}
                  >
                    <Link to="/">
                      <img
                        src={FFLogo}
                        alt="logo"
                        width="64px"
                        height="64px"
                        style={{
                          padding: "0px",
                          margin: "0px",
                          marginTop: "10px",
                        }}
                      />
                    </Link>
                    {lgMediaMatch ? (
                      <Typography
                        variation="h6"
                        color="secondary"
                        style={{ margin: "20px" }}
                      >
                        <Link to="/">Future Focus</Link>
                      </Typography>
                    ) : null}
                  </IconButton>
                </div>
                {lgMediaMatch ? (
                  <NavItems />
                ) : (
                  <IconButton
                    edge="end"
                    className={classes.menuButton}
                    color="primary"
                    aria-label="Menu"
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

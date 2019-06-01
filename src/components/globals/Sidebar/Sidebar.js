import React from "react"
import { withStyles, useTheme } from "@material-ui/core/styles"
import { Drawer, Toolbar, IconButton } from "@material-ui/core"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import FFLogo from "../../../images/ff-icon.svg"

import Link from "../MyLink/MyLink"
import NavItems from "../NavItems/NavItems"
import MenuContext from "../../contexts/MenuContext/MenuContext"

const styles = theme => ({
  paper: {
    minWidth: "250px",
    width: "40%",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    marginTop: "5%",
    marginLeft: "10%",
    marginRight: "20%",
    alignItems: "flex-start",
    minWidth: "200px",
  },
  sidebarTitle: {
    flex: 1,
  },
  linkButtons: {
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    // marginLeft: "10%",
    alignItems: "flex-start",
  },
})

const Sidebar = ({ classes }) => {
  const theme = useTheme()
  const lgMediaMatch = useMediaQuery(theme.breakpoints.up("lg"))

  return (
    <aside className={classes.drawer}>
      <MenuContext.Consumer>
        {({ menuOpen, setMenu }) => {
          return menuOpen && !lgMediaMatch ? (
            <Drawer
              open={menuOpen && !lgMediaMatch}
              anchor="left"
              color="default"
              onClose={setMenu}
              classes={{ paper: classes.paper }}
            >
              <Toolbar onClick={setMenu} className={classes.sidebar}>
                <IconButton
                  edge="end"
                  className={classes.sidebarTitle}
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
                </IconButton>

                <div className={classes.linkButtons}>
                  <NavItems />
                </div>
              </Toolbar>
            </Drawer>
          ) : null
        }}
      </MenuContext.Consumer>
    </aside>
  )
}

Sidebar.defaultProps = {
  siteTitle: `FutureFocus`,
}

export default withStyles(styles)(Sidebar)

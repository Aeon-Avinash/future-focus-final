import React from "react"
import { withStyles, useTheme } from "@material-ui/core/styles"
import { Drawer, Toolbar } from "@material-ui/core"
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
    alignItems: "flex-start",
    minWidth: "200px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "5%",
      marginRight: "15%",
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "10%",
      marginRight: "20%",
    },
  },
  linkButtons: {
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    [theme.breakpoints.down("sm")]: {
      "& > a": {
        margin: theme.spacing(1.5, 1),
      },
    },
    [theme.breakpoints.up("sm")]: {
      "& > a": {
        margin: theme.spacing(2, 1),
      },
    },
    "& > a:last-child": {
      border: "1px groove #3f51b5",
      borderRadius: "5px",
      padding: "0.5rem 0.75rem",
    },
  },
  sidebarLogo: {
    padding: 0,
    margin: 0,
    width: theme.spacing(8),
    height: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(4),
    },
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
                <Link to="/">
                  <img
                    src={FFLogo}
                    alt="logo"
                    className={classes.sidebarLogo}
                  />
                </Link>
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

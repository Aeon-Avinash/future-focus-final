/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import { Helmet } from "react-helmet"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider, makeStyles } from "@material-ui/styles"
import { Container } from "@material-ui/core"
import theme from "./theme.js"

import Header from "../components/globals/Header/HeaderMUI"
import Sidebar from "../components/globals/Sidebar/Sidebar"
// import Link from "../components/globals/MyLink/MyLink"
import { MenuSelector } from "../components/contexts/MenuContext/MenuContext"
import "./layout.css"
import Footer from "../components/globals/Footer/Footer"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  mainContainer: {
    padding: 0,
    marginTop: theme.spacing,
    marginBottom: theme.spacing,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  footer: {
    marginTop: "auto",
    backgroundColor: "white",
  },
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Helmet>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
            {/*  <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet" /> */}
          </Helmet>
          <ThemeProvider theme={theme}>
            <div className={classes.root}>
              <CssBaseline />
              <MenuSelector>
                <Container maxWidth="xl" className={classes.mainContainer}>
                  <Header siteTitle={data.site.siteMetadata.title} />
                  <Sidebar />
                  <main>{children}</main>
                  <footer className={classes.footer}>
                    <Footer />
                  </footer>
                </Container>
              </MenuSelector>
            </div>
          </ThemeProvider>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

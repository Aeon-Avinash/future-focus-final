import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Button } from "@material-ui/core"
import Link from "../MyLink/MyLink"

const renderNavItems = allPages => {
  return allPages.map(({ node: link }) => (
    <Button
      key={link.id}
      variant={link.pageUrl === "/apply/" ? "outlined" : "text"}
    >
      <Link 
        to={link.pageUrl} 
        activeStyle 
        partiallyActive={link.pageUrl === "/blog/" ? true : false}
      >
        {link.pageName}
      </Link>
    </Button>
  ))
}

const NavItems = () => {
  const { allPages } = useStaticQuery(
    graphql`
      query {
        allPages: allContentfulTestSitePages(
          sort: { fields: sortOrder, order: ASC }
        ) {
          totalCount
          edges {
            node {
              id
              pageUrl
              pageName
              title
            }
          }
        }
      }
    `
  )
  return renderNavItems(allPages.edges)
}

export default NavItems
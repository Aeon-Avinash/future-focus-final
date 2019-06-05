import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Link from "../MyLink/MyLink"

const renderNavItems = allPages => {
  return allPages.map(({ node: link }) => (
    <Link
      key={link.id}
      to={link.pageUrl}
      variant={"button"}
      activeStyle
      partiallyActive={link.pageUrl === "/blog/" ? true : false}
    >
      {link.pageName}
    </Link>
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

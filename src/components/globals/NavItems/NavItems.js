import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import uuid from "uuid/v4"
import Link from "../MyLink/MyLink"

const renderNavItems = allPages => {
  return allPages.map(({ node: link }) => (
    <Link
      key={link.id ? link.id : uuid()}
      to={link.pageUrl ? link.pageUrl : "/"}
      variant={"button"}
      activeStyle
      partiallyActive={(link.pageUrl && link.pageUrl === "/blog/") ? true : false}
    >
      {link.pageName ? link.pageName : "FF_Index"}
    </Link>
  ))
}

const NavItems = () => {
  let { allPages } = useStaticQuery(
    graphql`
      query {
        allPages: allContentfulSitePages(
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
  if(allPages && allPages.edges){
    allPages = allPages
  } else {
    allPages.edges = Array(7).fill(0).map((_) => ({id: uuid(), pageUrl: "/", pageName: "FF_Index", title: "FF Default Page"}))
  }
  return renderNavItems(allPages.edges)
}

export default NavItems

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import uuid from "uuid/v4"
import Link from "../MyLink/MyLink"

const renderFooterSiteLinks = footerSiteLinks => {
  return footerSiteLinks.map(({ node: link }) => (
    <Link
      key={link.id ? link.id : uuid()}
      to={link.linkTo ? link.linkTo : "/"}
      variant={"button"}
    >
      {link.linkText ? link.linkText : "Home"}
    </Link>
  ))
}

const FooterSiteLinks = () => {
  let { footerSiteLinks } = useStaticQuery(
    graphql`
      query {
        footerSiteLinks: allContentfulSiteFooterLinks(
          filter: { linkType: { eq: "siteNavLink" } }
          sort: { fields: sortOrder, order: ASC }
        ) {
          totalCount
          edges {
            node {
              id
              sortOrder
              linkType
              linkTo
              linkText
            }
          }
        }
      }
    `
  )
  if (!footerSiteLinks || !footerSiteLinks.edges) {
    footerSiteLinks.edges = Array(3)
      .fill(0)
      .map(_ => ({
        id: uuid(),
        linkTo: "/",
        linkText: "Home",
      }))
  }
  return renderFooterSiteLinks(footerSiteLinks.edges)
}

export default FooterSiteLinks

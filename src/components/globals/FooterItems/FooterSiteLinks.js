import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Link from "../MyLink/MyLink"

const renderFooterSiteLinks = footerSiteLinks => {
  return footerSiteLinks.map(({ node: link }) => (
    <Link key={link.id} to={link.linkTo} variant={"button"}>
      {link.linkText}
    </Link>
  ))
}

const FooterSiteLinks = () => {
  const { footerSiteLinks } = useStaticQuery(
    graphql`
      query {
        footerSiteLinks: allContentfulSiteFooterElement(
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
  return renderFooterSiteLinks(footerSiteLinks.edges)
}

export default FooterSiteLinks

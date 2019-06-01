import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Button } from "@material-ui/core"
import Link from "../MyLink/MyLink"

const renderFooterSiteLinks = footerSiteLinks => {
  return footerSiteLinks.map(({ node: link }) => (
    <Button key={link.id}>
      <Link to={link.linkTo}>{link.linkText}</Link>
    </Button>
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

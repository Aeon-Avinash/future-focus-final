import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link as MUILink } from "@material-ui/core"

const renderFooterOutLinks = footerOutLinks => {
  return footerOutLinks.map(({ node: link }) => (
    <MUILink key={link.id} href={link.linkTo} target="_blank" rel="noopener">
      {link.linkText}
    </MUILink>
  ))
}

const FooterOutLinks = () => {
  const { footerOutLinks } = useStaticQuery(
    graphql`
      query {
        footerOutLinks: allContentfulSiteFooterLinks(
          filter: { linkType: { eq: "outLink" } }
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
  return renderFooterOutLinks(footerOutLinks.edges)
}

export default FooterOutLinks

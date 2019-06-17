import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link as MUILink } from "@material-ui/core"
import uuid from "uuid/v4"

const renderFooterOutLinks = footerOutLinks => {
  return footerOutLinks.map(({ node: link }) => (
    <MUILink
      key={link.id ? link.id : uudi()}
      href={link.linkTo ? link.linkTo : "www.futurefocushrservices.com"}
      target="_blank"
      rel="noopener"
    >
      {link.linkText ? link.linkText : "FutureFocus"}
    </MUILink>
  ))
}

const FooterOutLinks = () => {
  let { footerOutLinks } = useStaticQuery(
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
  if (footerSiteLinks && footerSiteLinks.edges) {
    footerSiteLinks = footerSiteLinks
  } else {
    footerSiteLinks.edges = Array(3)
      .fill(0)
      .map(_ => ({
        id: uuid(),
        linkTo: "www.futurefocushrservices.com",
        linkText: "FutureFocus",
      }))
  }
  return renderFooterOutLinks(footerOutLinks.edges)
}

export default FooterOutLinks

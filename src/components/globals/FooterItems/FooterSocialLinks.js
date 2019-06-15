import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link as MUILink } from "@material-ui/core"
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin } from "react-icons/fa"
import "./FooterLinks.css"

const SelectIcon = ({ linkText }) => {
  if (linkText === "facebook") {
    return <FaFacebookSquare className={"footerSocialIcon"} />
  } else if (linkText === "twitter") {
    return <FaTwitterSquare className={"footerSocialIcon"} />
  } else if (linkText === "linked-in") {
    return <FaLinkedin className={"footerSocialIcon"} />
  } else {
    return null
  }
}

const renderFooterSocialLinks = footerSocialLinks => {
  return footerSocialLinks.map(({ node: link }) => (
    <MUILink
      key={link.id}
      href={link.linkTo}
      title={`connect on ${link.linkText}`}
      target="_blank"
      rel="noopener"
    >
      <SelectIcon linkText={link.linkText} />
    </MUILink>
  ))
}

const FooterSocialLinks = () => {
  const { footerSocialLinks } = useStaticQuery(
    graphql`
      query {
        footerSocialLinks: allContentfulSiteFooterLinks(
          filter: { linkType: { eq: "socialLink" } }
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
  return renderFooterSocialLinks(footerSocialLinks.edges)
}

export default FooterSocialLinks

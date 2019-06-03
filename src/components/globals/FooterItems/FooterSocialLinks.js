import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link as MUILink } from "@material-ui/core"
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin } from "react-icons/fa"

const footerSocialIconStyles = {
  color: "#3f51b5",
  fontSize: "1.5rem",
}

const SelectIcon = ({ linkText }) => {
  if (linkText === "facebook") {
    return <FaFacebookSquare style={footerSocialIconStyles} />
  } else if (linkText === "twitter") {
    return <FaTwitterSquare style={footerSocialIconStyles} />
  } else if (linkText === "linked-in") {
    return <FaLinkedin style={footerSocialIconStyles} />
  } else {
    return null
  }
}

const renderFooterSocialLinks = footerSocialLinks => {
  return footerSocialLinks.map(({ node: link }) => (
    <MUILink key={link.id} href={link.linkTo} target="_blank" rel="noopener">
      <SelectIcon linkText={link.linkText} />
    </MUILink>
  ))
}

const FooterSocialLinks = () => {
  const { footerSocialLinks } = useStaticQuery(
    graphql`
      query {
        footerSocialLinks: allContentfulSiteFooterElement(
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

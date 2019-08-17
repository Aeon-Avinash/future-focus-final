import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link as MUILink } from "@material-ui/core"
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin } from "react-icons/fa"
import uuid from "uuid/v4"
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
      key={link.id ? link.id : uuid()}
      href={link.linkTo ? link.linkTo : "/"}
      title={`connect on ${link.linkText ? link.linkText : "Social-Media"}`}
      target="_blank"
      rel="noopener"
    >
      <SelectIcon linkText={link.linkText ? link.linkText : "Social-Media"} />
    </MUILink>
  ))
}

const defaultIconArr = ["facebook", "twitter", "linked-in"]

const FooterSocialLinks = () => {
  let { footerSocialLinks } = useStaticQuery(
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
  if (!footerSocialLinks || !footerSocialLinks.edges) {
    footerSocialLinks.edges = Array(3)
      .fill(0)
      .map((_, index) => ({
        id: uuid(),
        linkTo: "www.futurefocushrservices.com",
        linkText: defaultIconArr[index],
      }))
  }
  return renderFooterSocialLinks(footerSocialLinks.edges)
}

export default FooterSocialLinks

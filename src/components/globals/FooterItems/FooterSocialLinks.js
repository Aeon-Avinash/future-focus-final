import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { withStyles } from "@material-ui/core/styles"
import { Link as MUILink } from "@material-ui/core"
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin } from "react-icons/fa"

const styles = theme => ({
  footerSocialIcon: {
    color: theme.palette.primary.main,
    fontSize: "1.5rem",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
})

const SelectIconRaw = ({ linkText, classes }) => {
  if (linkText === "facebook") {
    return <FaFacebookSquare className={classes.footerSocialIcon} />
  } else if (linkText === "twitter") {
    return <FaTwitterSquare className={classes.footerSocialIcon} />
  } else if (linkText === "linked-in") {
    return <FaLinkedin className={classes.footerSocialIcon} />
  } else {
    return null
  }
}

const SelectIcon = withStyles(styles)(SelectIconRaw)

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

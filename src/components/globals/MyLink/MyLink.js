import React from "react"
import { Link as RouterLink } from "gatsby"
import { Link } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"

const MyLink = props => {
  const theme = useTheme()

  const renderLink = itemProps => (
    <RouterLink
      to={props.to}
      href={props.to}
      activeStyle={
        props.activeStyle
          ? { borderBottom: `solid 0.25rem ${theme.palette.secondary.main}` }
          : null
      }
      partiallyActive={
        props.activeStyle && props.partiallyActive ? true : false
      }
      {...itemProps}
    />
  )

  return <Link component={renderLink}>{props.children}</Link>
}

export default MyLink

import React, { Component } from "react"
import { Link as RouterLink } from "gatsby"
import { Link } from "@material-ui/core"

export default class MyLink extends Component {
  renderLink = itemProps => <RouterLink to={this.props.to} {...itemProps} />

  render() {
    return <Link component={this.renderLink}>{this.props.children}</Link>
  }
}

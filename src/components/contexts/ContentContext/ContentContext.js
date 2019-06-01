import React, { Component } from "react"

const defaultState = {
  serviceSelected: null,
  industrySelected: null,
  selectService: () => {},
  selectIndustry: () => {},
}

const ContentContext = React.createContext(defaultState)

class ContentSelector extends Component {
  state = {
    serviceSelected: null,
    industrySelected: null,
  }

  selectService = serviceId => {
    this.setState({
      serviceSelected: serviceId,
    })
  }

  selectIndustry = industryId => {
    this.setState({
      industrySelected: industryId,
    })
  }

  render() {
    const { serviceSelected, industrySelected } = this.state
    return (
      <ContentContext.Provider
        value={{
          serviceSelected,
          industrySelected,
          selectService: this.selectService,
          selectIndustry: this.selectIndustry,
        }}
      >
        {this.props.children}
      </ContentContext.Provider>
    )
  }
}

export default ContentContext

export { ContentSelector }

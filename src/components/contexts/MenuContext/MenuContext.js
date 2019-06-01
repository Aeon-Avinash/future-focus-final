import React, { Component } from "react"

const defaultState = {
  menuOpen: false,
  setMenu: () => {},
}

const MenuContext = React.createContext(defaultState)

class MenuSelector extends Component {
  state = {
    menuOpen: false,
  }

  setMenu = () => {
    this.setState( prevState => ({
      menuOpen: !prevState.menuOpen,
    }))
  }

  render() {
    const { menuOpen } = this.state
    return (
      <MenuContext.Provider
        value={{
          menuOpen,
          setMenu: this.setMenu,
        }}
      >
        {this.props.children}
      </MenuContext.Provider>
    )
  }
}

export default MenuContext

export { MenuSelector }

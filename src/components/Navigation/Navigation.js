import { Component, Fragment } from "react";

import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";


class Navigation extends Component {

  state = {
    showSidebar: false
  }

  handleToggleSidebar = () => {
    this.setState({ showSidebar: !this.state.showSidebar });
  }

  render () {

    return (
      <Fragment>
        <Navbar toggledSidebar={ this.handleToggleSidebar } />
        <Sidebar show={ this.state.showSidebar } />
      </Fragment>
    );
  }
}

export default Navigation
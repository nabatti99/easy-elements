import { Component, Fragment } from "react";

import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";


class Navigation extends Component {

  state = {
    isShowedSidebar: false
  }

  handleToggleSidebar = () => {
    this.setState({ isShowedSidebar: !this.state.isShowedSidebar });
  }

  handleClickedOutside = () => {
    this.setState({ isShowedSidebar: false });
  }

  render () {

    return (
      <Fragment>
        <Navbar toggledSidebar={ this.handleToggleSidebar } isShowed={ this.state.isShowedSidebar } />
        <Sidebar clickedOutside={ this.handleClickedOutside } show={ this.state.isShowedSidebar } />
      </Fragment>
    );
  }
}

export default Navigation
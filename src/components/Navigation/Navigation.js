import { Component, Fragment } from "react";

import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";


class Navigation extends Component {

  render () {

    const className = {
    }

    return (
      <Fragment>
        <Navbar />
        <Sidebar show={false} />
      </Fragment>
    );
  }
}

export default Navigation
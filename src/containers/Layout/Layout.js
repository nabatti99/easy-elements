import { Component } from "react";

import classes from "./Layout.module.scss";
import Navigation from "../../components/Navigation/Navigation";

class Layout extends Component {

  render() {

    const className = {
      layout: `container-fluid ${classes.Layout}`
    }

    return (
      <div>
        <Navigation />

        <div className={ className.layout } style={{height: "3000px"}}>
          test
        </div>
      </div>
    );
  }
}

export default Layout;
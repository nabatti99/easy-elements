import { Component } from "react";

import classes from "./Layout.module.scss";
import Navigation from "../../components/Navigation/Navigation";
class Layout extends Component {

  render() {

    const className = {
      layout: classes.Layout
    }

    return (
      <div>
        <Navigation />

        <div className={ className.layout }>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Layout;
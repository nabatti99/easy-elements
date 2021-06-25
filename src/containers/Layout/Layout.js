import { Component } from "react";

import classes from "./Layout.module.scss";
import Navigation from "../../components/Navigation/Navigation";
import MusicFloatingController from "../../components/Music/MusicFloatingController/MusicFloatingController";
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

        <MusicFloatingController />
      </div>
    );
  }
}

export default Layout;
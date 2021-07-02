import { Component } from "react";

import classes from "./MusicList.module.scss";
import MusicController from "../MusicController/MusicController";

class MusicList extends Component {

  render () {

    let musicElementsList = null;

    const className = {
      container: "list-unstyled",
      item: `border-bottom border-gray-light ${classes.Item}`
    }

    musicElementsList = this.props.idsList && this.props.idsList.map(id => (
      <li className={ className.item } key={ id }>
        <MusicController id={ id } />
      </li>
    ));

    return (
      <ul className={ className.container }>
        { musicElementsList }
      </ul>
    );
  }
}

export default MusicList;
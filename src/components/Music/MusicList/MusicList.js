import { Component } from "react";

import classes from "./MusicList.module.scss";
import MusicController from "../MusicController/MusicController";

class MusicList extends Component {

  state = {
    loading: true,
    idsList: null
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ idsList: [9633, 34438, 16569, 57337, 63617], loading: false })
    }, 500);
  }

  render () {

    let musicElementsList = null;

    const className = {
      container: "list-unstyled",
      item: `border-bottom border-gray-light ${classes.Item}`
    }

    if (!this.state.loading)
      musicElementsList = this.state.idsList && this.state.idsList.map(id => (
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
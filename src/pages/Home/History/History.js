import { Component } from "react";

import classes from "./History.module.scss";
import MusicList from "../../../components/Music/MusicList/MusicList";

class History extends Component {

  render () {

    const className = {
      background: classes.Background,
      container: `container`,
      history: `row flex-column position-absolute`,
      title: "fw-bold text-dark text-center ls-95 mb-3",
      subTitle: "text-gray text-center"
    }

    return (
      <div className={ className.background }>
        <div className={ className.container }>
          <div className="col-auto mb-5">
            <h2 className={ className.title }>History</h2>
            <p className={ className.subTitle }>Find the musics that has been get by the experienced user</p>
          </div>

          <div className="col-auto">
            <MusicList />
          </div>
        </div>
      </div>
    );
  }
}

export default History
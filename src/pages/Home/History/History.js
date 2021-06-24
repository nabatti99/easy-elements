import { Component } from "react";

import MusicController from "../../../components/Music/MusicController/MusicController";

class History extends Component {

  render () {

    const className = {
      title: "fw-bold text-dark text-center ls-95 mb-3",
      subTitle: "text-gray text-center"
    }

    return (
      <div className="row flex-column">
        <div className="col-auto mb-5">
          <h2 className={ className.title }>History</h2>
          <p className={ className.subTitle }>Find the musics that has been get by the experienced user</p>
        </div>

        <div className="col-auto">
          <MusicController id={16267} />
        </div>
      </div>
    );
  }
}

export default History
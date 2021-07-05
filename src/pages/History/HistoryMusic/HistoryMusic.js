import { Component, createRef } from "react";
import { debounce } from "debounce";

import MusicList from "../../../components/Music/MusicList/MusicList";

/**
 * @param idsList Array[music id]
 * @param scrolledBottom Event
 * @param activeScrollHandler Boolean
 */
class HistoryMusic extends Component {

  listMusicRef = createRef();

  componentDidMount() {
    this.handleScrollMusicListRef = debounce(this.handleScrollMusicList, 250, false);
    window.addEventListener("scroll", this.handleScrollMusicListRef);
  }

  componentWillUnmount() {
    this.handleScrollMusicListRef.clear();
    window.removeEventListener("scroll", this.handleScrollMusicListRef);
  }

  handleScrollMusicList = () => {

    if (!this.props.activeScrollHandler) {
      return
    }

    const musicListElement = this.listMusicRef.current;

    const currentScrollBottom = window.scrollY + window.innerHeight;
    const endMusicListBottom = musicListElement.offsetTop + musicListElement.scrollHeight;

    if (currentScrollBottom > endMusicListBottom) {
      this.props.scrolledBottom();
      console.log("Updating...");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row align-items-end">
          <div className="col-12" ref={ this.listMusicRef }>
            <MusicList idsList={ this.props.idsList } /> 
          </div>
          <div style={{ height: "150px" }}></div>
        </div>
      </div>
    );
  }
}

export default HistoryMusic;
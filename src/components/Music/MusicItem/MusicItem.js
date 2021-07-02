import { Component } from "react";
import Waveform from "../../UI/Waveform/Waveform";

/**
 * @param thumbnail Source[Image],
 * @param name: String,
 * @param playlist: String
 * @param genres: Array[String]
 * @param process: Number
 * @param isPlaying: Boolean
 * 
 * @param downloaded: Download Event
 * @param toggled: Play/Pause Event
 */
class MusicItem extends Component {

  render () {

    const { 
      thumbnail, 
      name, 
      playlist,
      genres,
      process,
      isPlaying,
      peaks,

      toggled
    } = this.props;

    const controlIconNameClassName = isPlaying ? "ri-pause-fill" : "ri-play-fill";

    const className = {
      container: "row justify-content-center align-items-center h-100",
      containerLeft: "row align-items-center h-100",
      playIcon: `${controlIconNameClassName} fs-3 text-dark cursor-pointer color-primary-hover transition-normal`,
      downloadIcon: "ri-download-fill",
      download: "fs-4 text-dark cursor-pointer color-primary-hover transition-normal",
      musicName: "text-dark d-block text-decoration-none mb-2",
      playlistName: "text-gray-light d-block text-decoration-none m-0",
      genres: "d-inline-block link-gray text-decoration-none mb-0 me-2",
      sufferWave: "progress-bar bg-dark transition-normal",
    }

    const genresLink = genres.map(genre => (
      <a className={ className.genres } key={genre} href={ `/genre/${genre}` }>{ genre }</a>
    ));

    return (
      <div className="row py-4">

        <div className="col-md-2 d-md-flex d-none">
          <div className={ className.container }>
            <div className="col-auto">
              <img src={ thumbnail } height="80px" alt="Thumbnail" />
            </div>
          </div>
        </div>

        <div className="col-md-1 col-1">
          <div className={ className.container }>
            <div className="col-auto">
              <i className={ className.playIcon } onClick={ toggled }></i>
            </div>
          </div>
        </div>

        <div className="col-md-2 col-4">
          <div className={ className.containerLeft }>
            <div className="col-auto">
              <a className={ className.musicName } href={ `/music/${this.props.id}` }>{ name }</a>
              <a className={ className.playlistName }>{ playlist }</a>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-2">
          <div className={ className.container }>
            <div className="col-auto">
              { genresLink }
            </div>
          </div>
        </div>

        <div className="col-md-3 col-4">
          <div className={ className.container }>
            <div className="col">
              <Waveform
                peaks={ peaks }
                bgColor="#808080"
                waveColor="#FFD500"
                process={ process }
                clicked={ () => {} } />
            </div>
          </div>
        </div>

        <div className="col-md-1 col-1">
          <div className={ className.container }>
            <div className="col-auto">
              <div className={ className.download } onClick={ this.props.downloaded } >
                <i className={ className.downloadIcon }></i>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default MusicItem;
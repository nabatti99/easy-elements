import { Component } from "react";

/**
 * @param thumbnail Source[Image],
 * @param name: String,
 * @param playlist: String
 * @param genres: Array[String]
 * @param music: Source[Music]
 * @param process: Number
 * @param isPlaying: Boolean
 * 
 * @param toggled: Play/Pause Event
 */
class MusicItem extends Component {

  render () {

    const { 
      thumbnail, 
      name, 
      playlist,
      genres,
      music,
      process,
      isPlaying,

      toggled
    } = this.props;

    const controlIconNameClassName = isPlaying ? "ri-pause-fill" : "ri-play-fill";

    const className = {
      container: "row justify-content-center align-items-center h-100",
      containerLeft: "row align-items-center h-100",
      playIcon: `${controlIconNameClassName} fs-3 text-dark cursor-pointer color-primary-hover transition-normal`,
      downloadIcon: "ri-download-fill",
      download: "text-decoration-none fs-4 text-dark color-primary-hover transition-normal",
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

        <div className="col-2">
          <div className={ className.container }>
            <div className="col-auto">
              <img src={ thumbnail } height="80px" alt="Thumbnail" />
            </div>
          </div>
        </div>

        <div className="col-1">
          <div className={ className.container }>
            <div className="col-auto">
              <i className={ className.playIcon } onClick={ toggled }></i>
            </div>
          </div>
        </div>

        <div className="col-2">
          <div className={ className.containerLeft }>
            <div className="col-auto">
              <a className={ className.musicName } href="#">{ name }</a>
              <a className={ className.playlistName }>{ playlist }</a>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className={ className.container }>
            <div className="col-auto">
              { genresLink }
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className={ className.container }>
            <div className="col">
              <div className="progress">
                  <div className={ className.sufferWave } role="progressbar" style={{ width: `${process}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-1">
          <div className={ className.container }>
            <div className="col-auto">
              <a href={ music } className={ className.download } target="_blank" rel="noopener noreferrer" download>
                <i className={ className.downloadIcon }></i>
              </a>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default MusicItem;
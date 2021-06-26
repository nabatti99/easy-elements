import { Component } from "react";

import classes from "./MusicFloating.module.scss";

class MusicFloating extends Component {

  baseWidthVolumeElement = 0;

  componentDidMount() {
    const baseClientXVolume = document
                              .querySelector(`.${classes.Thumb}`)
                              .getClientRects()[0].x;

    this.props.setBaseVolumeClientX(baseClientXVolume);

    this.baseWidthVolumeElement = document
                              .querySelector(`.${classes.Volume}`)
                              .getClientRects()[0].width;

    document.addEventListener("dragover", (event) => {
      event.preventDefault();
    }, false);
  }

  render () {

    const { 
      thumbnail, 
      name, 
      playlist,
      music,
      process,
      volume,
      isPlaying,
      timer,

      toggled,
      draggedVolume
    } = this.props;

    const controlIconNameClassName = isPlaying ? "ri-pause-fill" : "ri-play-fill";

    const className = {
      container: "row justify-content-center align-items-center h-100",
      containerLeft: "row align-items-center h-100",
      containerRight: "row justify-content-end align-items-center h-100",
      playIcon: `${controlIconNameClassName} fs-3 text-dark cursor-pointer color-primary-hover transition-normal`,
      timer: "",
      downloadIcon: "ri-download-fill",
      download: "text-decoration-none fs-4 text-dark color-primary-hover transition-normal",
      musicName: "text-dark d-block text-decoration-none mb-2",
      playlistName: "text-gray-light d-block text-decoration-none m-0",
      genres: "d-inline-block link-gray text-decoration-none mb-0 me-2",
      sufferWave: "progress-bar bg-dark transition-normal",
    }

    return (
      <div className="container-fluid fixed-bottom bg-glass">
        <div className="row py-4">

          <div className="col-1">
            <div className={ className.containerRight }>
              <div className="col-auto">
                <img src={ thumbnail } height="60px" alt="Thumbnail" />
              </div>
            </div>
          </div>

          <div className="col-2">
            <div className={ className.container }>
              <div className="col-auto">
                <i className={ className.playIcon } onClick={ toggled }></i>
              </div>
              <div className="col-auto">
                <span className={ className.timer }>{ timer }</span>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className={ className.containerLeft }>
              <div className="col-auto">
                <a className={ className.musicName } href="#">{ name }</a>
                <a className={ className.playlistName }>{ playlist }</a>
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

          <div className="col-2">
            <div className={ className.container }>
              <div className="col-auto">
                <div className={ classes.Volume }>
                  <div 
                    className={ classes.Thumb } draggable
                    onDrag={ draggedVolume }
                    style={{ left: this.baseWidthVolumeElement * volume }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

/**
 * @param thumbnail Source[Image],
 * @param name: String,
 * @param playlist: String
 * @param music: Source[Music]
 * @param process: Number
 * @param isPlaying: Boolean
 * @param timer: String
 * 
 * @param toggled: Play/Pause Event
 * @param setBeginVolumeClientX: Get Volume ClientX
 * @param draggedVolume: Drag Volume Event
 */
export default MusicFloating;
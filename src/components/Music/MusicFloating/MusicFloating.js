import { Component } from "react";

import classes from "./MusicFloating.module.scss";
import Waveform from "../../UI/Waveform/Waveform";

class MusicFloating extends Component {

  createWaveSurferRef = waveSurferElement => this.waveSurferRef = waveSurferElement;

  componentDidMount() {
    document.addEventListener("dragover", (event) => {
      event.preventDefault();
    }, false);
  }

  render () {

    const { 
      id,
      thumbnail, 
      name, 
      playlist,
      process,
      volume,
      isPlaying,
      timer,
      peaks,
      volumeElementRef,

      toggled,
      draggedVolume,
      clickedWaveform,
      downloaded
    } = this.props;

    const controlIconNameClassName = isPlaying ? "ri-pause-fill" : "ri-play-fill";

    const className = {
      container: "row justify-content-center align-items-center h-100 transition-normal",
      containerLeft: "row align-items-center h-100",
      containerRight: "row justify-content-end align-items-center h-100",
      playIcon: `${controlIconNameClassName} fs-3 text-dark cursor-pointer color-primary-hover transition-normal`,
      timer: "",
      downloadIcon: "ri-download-fill",
      volumeIcon: "ri-speaker-fill fs-4 text-dark",
      download: "fs-4 text-dark cursor-pointer color-primary-hover transition-normal",
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
                <a className={ className.musicName } href={ `/music/${id}` }>{ name }</a>
                <a className={ className.playlistName }>{ playlist }</a>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className={ className.container }>
              <div className="col">
                <Waveform
                  peaks={ peaks }
                  bgColor="#808080"
                  waveColor="#FFD500"
                  process={ process }
                  clicked={ clickedWaveform } />
              </div>
            </div>
          </div>

          <div className="col-1">
            <div className={ className.container }>
              <div className="col-auto">
                <div className={ className.download } onClick={ downloaded }>
                  <i className={ className.downloadIcon }></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-2">
            <div className={ className.container }>
              <div className="col-auto">
                <i className={ className.volumeIcon }></i>
              </div>
              <div className="col-auto">
                <div className={ classes.Volume } ref={ volumeElementRef }>
                  <div 
                    className={ classes.Thumb } draggable
                    onDrag={ draggedVolume }
                    style={{ left: `${volume * 100}%` }}></div>
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
 * @param peaks: Array[Number]
 * 
 * @param toggled: Play/Pause Event
 * @param volumeElementRef: Create Ref
 * @param waveSurferElementRef: Create Ref
 * @param draggedVolume: Drag Volume Event
 * @param clickedWaveform: Click Waveform Event
 */
export default MusicFloating;
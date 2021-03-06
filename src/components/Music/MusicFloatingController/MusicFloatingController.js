import { Component } from "react";
import { connect } from "react-redux";
import { parseTime, parseProcess, parseVolumeByClientX } from "../../../utilities/music";

import MusicFloating from "../MusicFloating/MusicFloating";

import * as actions from "../../../redux/Music/actions";
import { 
  generateDownloadMusicFromURL,
  generateDownloadSFXFromURL
} from "../../../utilities/url";

class MusicFloatingController extends Component {

  audio = new Audio();

  state = {
    loadingAudio: false,
    duration: "00:00",
    currentTime: "00:00",
    process: 0,
    volume: 1
  }

  createVolumeElementRef = volumeElement => this.volumeElementRef = volumeElement;

  componentDidMount () {
    console.log("attach event");
    this.audio.onloadeddata = this.handleLoadedAudioData;
    this.audio.onloadstart = this.handleLoadStartAudioData;
    this.audio.ondurationchange = this.handleDurationChange;
    this.audio.ontimeupdate = this.handleTimeUpdate;
    this.audio.onvolumechange = this.handleVolumeChange;
    this.audio.onended = this.handleAudioEnded;
  }

  handleDragVolume = (event) => {
    console.log("Dragging");

    const baseClientXVolume = this.volumeElementRef.getClientRects()[0].x;
    this.audio.volume = parseVolumeByClientX(baseClientXVolume, event.clientX, this.volumeElementRef.clientWidth);
  }

  handleLoadStartAudioData = () => {
    console.log("load start");
    this.setState({ loadingAudio: true, process: 0 });
  }

  handleLoadedAudioData = () => {
    console.log("loadded");
    this.setState({ loadingAudio: false, process: 0 })
  }

  handleDurationChange = () => {
    this.setState({ duration: parseTime(this.audio.duration) });
  }

  handleTimeUpdate = () => {

    const process = parseProcess(this.audio.currentTime, this.audio.duration);

    this.setState({
      currentTime: parseTime(this.audio.currentTime),
      process
    });

    this.props.onUpdateProcess(process);
  }

  handleAudioEnded = () => {
    this.props.onPause();
  }

  handleVolumeChange = () => {
    this.setState({ volume: this.audio.volume });
    console.log(this.audio.volume);
  }

  componentDidUpdate () {
    if (this.props.isPlaying === this.audio.paused)
      if (this.props.isPlaying)
        this.audio.play();
      else
        this.audio.pause();

    // load new music
    if (!this.state.loadingAudio && this.audio.src !== this.props.music) {

      console.log("audio update");
      this.audio.src = this.props.music;

      console.log("load and play audio");
      this.audio.play()
      .then(response => {
        console.log("played");
        console.log(response);
      });

    }
  }

  handleToggle = () => {
    if (this.props.isPlaying) {
      this.audio.pause()
      this.props.onPause();
    } else {
      this.audio.play()
      this.props.onPlay();
    }
  }

  handleDownloadMusic = () => {
    if (this.props.isSFX)
      generateDownloadSFXFromURL(this.props.music, `${this.props.name}.aac`);
    else
      generateDownloadMusicFromURL(this.props.music, `${this.props.name}.mp3`);
  }

  handleClickWaveform = (newProcess) => {
    this.audio.currentTime = newProcess * this.audio.duration;
  }

  render () {
    return (
      this.props.id && <MusicFloating
        id={ this.props.id }
        thumbnail={ this.props.thumbnail }
        timer={ `${this.state.currentTime}/${this.state.duration}` }
        name={ this.props.name }
        playlist={ this.props.playlist }
        music={ this.props.music }
        peaks={ this.props.peaks }
        volume={ this.state.volume }
        isPlaying={ this.props.isPlaying }
        process={ this.state.process }
        toggled={ this.handleToggle }
        draggedVolume={ this.handleDragVolume }
        clickedWaveform={ this.handleClickWaveform }
        downloaded={ this.handleDownloadMusic }
        volumeElementRef={ this.createVolumeElementRef } />
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.music.id,
    thumbnail: state.music.thumbnail,
    name: state.music.name,
    playlist: state.music.playlist,
  
    isPlaying: state.music.isPlaying,
    music: state.music.music,
    peaks: state.music.peaks,

    isSFX: state.music.isSFX
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPlay: () => dispatch(actions.playMusic()),
    onPause: () => dispatch(actions.pauseMusic()),
    onUpdateProcess: process => dispatch(actions.updateProcess(process))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicFloatingController);